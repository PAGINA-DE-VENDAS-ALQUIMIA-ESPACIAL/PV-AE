import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { getProjects, ProjectItem } from '../../../data/projectsIndex';

interface OrbitCarouselProps {
  isDark?: boolean;
}

// Helper para estilizar títulos: apenas 1 palavra-chave em serifa itálico e as demais em fonte sans normal
const renderStyledTitle = (title: string) => {
  if (!title) return null;
  const words = title.trim().split(/\s+/);
  if (words.length === 1) {
    return <span className="font-serif italic">{words[0]}</span>;
  }
  const normalPart = words.slice(0, -1).join(' ');
  const serifWord = words[words.length - 1];

  return (
    <>
      <span className="font-sans not-italic font-semibold">{normalPart} </span>
      <span className="font-serif italic font-normal">{serifWord}</span>
    </>
  );
};

export default function OrbitCarousel({ isDark = false }: OrbitCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('contexto');

  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);

  // Touch Swipe tracking refs para o Modal
  const imageTouchStartXRef = useRef<number | null>(null);
  const imageTouchStartYRef = useRef<number | null>(null);
  const textTouchStartXRef = useRef<number | null>(null);
  const lastWheelTimeRef = useRef<number>(0);
  const lastTextWheelTimeRef = useRef<number>(0);

  // Velocidade base constante da esquerda para a direita (ritmo equilibrado e confortável)
  const BASE_SPEED = 0.24;
  const velocityRef = useRef<number>(BASE_SPEED);
  const lastXRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const hasMovedRef = useRef<boolean>(false);

  // Detecta mobile para dimensões adequadas
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Obtém lista de projetos dinamicamente
  const projects: ProjectItem[] = getProjects();
  const numProjects = projects.length;
  const angleSlice = numProjects > 0 ? 360 / numProjects : 60;

  // REGRAS DE ESPAÇAMENTO MÍNIMO OBRIGATÓRIO ENTRE CARDS (DESKTOP E MOBILE)
  // Define o espaçamento mínimo físico em pixels entre as bordas dos cards adjacentes na órbita.
  const MIN_CARD_GAP_DESKTOP = 32; // Mínimo espaçamento obrigatório no Desktop (px)
  const MIN_CARD_GAP_MOBILE = 20;  // Mínimo espaçamento obrigatório no Mobile (px)

  // Configurações dimensionais dos retângulos e órbita 3D
  const rectWidth = isMobile ? 290 : 320;
  const rectHeight = isMobile ? 180 : 192;
  const baseZDepth = isMobile ? 200 : 250;
  const maxZDepth = isMobile ? 360 : 520;
  const borderRadius = 18;
  const MAX_SPEED = 2.0;

  // CÁLCULO DA ÓRBITA COM GARANTIA MATEMÁTICA DE ESPAÇAMENTO MÍNIMO E TETO MÁXIMO
  // Para poucos cards (ex: 4), o raio é reduzido para evitar vãos vazios gigantescos.
  // Para dezenas/centenas de cards (ex: 50 a 100), o raio é limitado ao teto máximo (maxZDepth),
  // enquanto a opacidade oculta suavemente os cards do fundo da roda 3D.
  const minGap = isMobile ? MIN_CARD_GAP_MOBILE : MIN_CARD_GAP_DESKTOP;
  const effectiveWidthWithScale = rectWidth * 1.06;

  let zDepth = baseZDepth;
  if (numProjects > 1) {
    const minRequiredRadius = (effectiveWidthWithScale + minGap) / (2 * Math.sin(Math.PI / numProjects));
    zDepth = Math.min(maxZDepth, Math.max(baseZDepth, minRequiredRadius));
  }

  const selectedProject =
    selectedProjectIndex !== null && projects[selectedProjectIndex]
      ? projects[selectedProjectIndex]
      : null;

  // Reseta índice da foto ativa, aba ativa e modo tela cheia quando o projeto selecionado muda
  useEffect(() => {
    setActivePhotoIndex(0);
    setActiveTab('contexto');
    if (selectedProjectIndex === null) {
      setIsFullScreenImage(false);
    }
  }, [selectedProjectIndex]);

  // Pré-carregamento imediato em memória de todas as fotos da galeria para transições 100% fluidas
  useEffect(() => {
    if (selectedProject?.gallery && selectedProject.gallery.length > 0) {
      selectedProject.gallery.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [selectedProject]);

  // Navegação do modal
  const handlePrevProject = useCallback(() => {
    if (selectedProjectIndex === null || numProjects === 0) return;
    const newIdx = (selectedProjectIndex - 1 + numProjects) % numProjects;
    setSelectedProjectIndex(newIdx);
  }, [selectedProjectIndex, numProjects]);

  const handleNextProject = useCallback(() => {
    if (selectedProjectIndex === null || numProjects === 0) return;
    const newIdx = (selectedProjectIndex + 1) % numProjects;
    setSelectedProjectIndex(newIdx);
  }, [selectedProjectIndex, numProjects]);

  const handlePrevPhoto = useCallback(() => {
    if (!selectedProject || !selectedProject.gallery) return;
    const totalPhotos = selectedProject.gallery.length;
    setActivePhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  }, [selectedProject]);

  const handleNextPhoto = useCallback(() => {
    if (!selectedProject || !selectedProject.gallery) return;
    const totalPhotos = selectedProject.gallery.length;
    setActivePhotoIndex((prev) => (prev + 1) % totalPhotos);
  }, [selectedProject]);

  // Mouse wheel handler nas fotos (scroll do mouse troca as FOTOS)
  const handleImageWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 180) return;
    lastWheelTimeRef.current = now;

    if (e.deltaY > 0 || e.deltaX > 0) {
      handleNextPhoto();
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      handlePrevPhoto();
    }
  };

  // Mouse wheel handler na parte do CARD DE TEXTO (scroll do mouse troca os PROJETOS)
  const handleTextWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastTextWheelTimeRef.current < 220) return;
    lastTextWheelTimeRef.current = now;

    if (e.deltaY > 0 || e.deltaX > 0) {
      handleNextProject();
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      handlePrevProject();
    }
  };

  // Gestos de Swipe e Toque para a Imagem (troca fotos ultra-fluida e sensível)
  const handleImageTouchStart = (e: React.TouchEvent) => {
    imageTouchStartXRef.current = e.touches[0].clientX;
    imageTouchStartYRef.current = e.touches[0].clientY;
  };

  const handleImageTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (imageTouchStartXRef.current === null || imageTouchStartYRef.current === null) return;

    // Se o toque foi em um botão interno (ex: fechar, pausar, seta), ignora o toque na imagem
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      imageTouchStartXRef.current = null;
      imageTouchStartYRef.current = null;
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - imageTouchStartXRef.current;
    const deltaY = touchEndY - imageTouchStartYRef.current;
    const startX = imageTouchStartXRef.current;
    const startY = imageTouchStartYRef.current;

    imageTouchStartXRef.current = null;
    imageTouchStartYRef.current = null;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const maxAbsDelta = Math.max(absX, absY);

    // 1. Deslize suave / devagar (bastam 12px de movimento para trocar a foto sem esforço)
    if (maxAbsDelta > 12) {
      const isRotated = isFullScreenImage && isMobile;
      if (isRotated) {
        // No mobile rotacionado 90deg, a direção física do dedo no Y ou X avança/recua
        const effectiveDelta = absY > absX ? deltaY : deltaX;
        if (effectiveDelta < 0) {
          handleNextPhoto();
        } else {
          handlePrevPhoto();
        }
      } else {
        const effectiveDelta = absX > absY ? deltaX : deltaY;
        if (effectiveDelta < 0) {
          handleNextPhoto();
        } else {
          handlePrevPhoto();
        }
      }
      return;
    }

    // 2. Toque simples / Tap leve na tela (sem precisar arrastar)
    // Tocar na metade esquerda/superior recua; tocar na metade direita/inferior avança
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = touchEndX - rect.left;
    const clickY = touchEndY - rect.top;

    if (isFullScreenImage && isMobile) {
      if (clickY < rect.height / 2) {
        handlePrevPhoto();
      } else {
        handleNextPhoto();
      }
    } else {
      if (clickX < rect.width / 2) {
        handlePrevPhoto();
      } else {
        handleNextPhoto();
      }
    }
  };

  // Gestos de Swipe para o Texto/Card (troca projetos)
  const handleTextTouchStart = (e: React.TouchEvent) => {
    textTouchStartXRef.current = e.touches[0].clientX;
  };

  const handleTextTouchEnd = (e: React.TouchEvent) => {
    if (textTouchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - textTouchStartXRef.current;
    textTouchStartXRef.current = null;

    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNextProject();
      } else {
        handlePrevProject();
      }
    }
  };

  // Teclas de atalho para o modal (ESC para fechar, setas para fotos)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedProjectIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectIndex, handlePrevPhoto, handleNextPhoto]);

  // Loop principal de animação 60fps (Garante rotação contínua e sem travamentos)
  useEffect(() => {
    if (selectedProjectIndex !== null) {
      isDraggingRef.current = false;
      setIsDragging(false);
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    if (Math.abs(velocityRef.current) < 0.05) {
      velocityRef.current = BASE_SPEED;
    }

    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isDraggingRef.current) {
        velocityRef.current = velocityRef.current * 0.94 + BASE_SPEED * 0.06;
        if (Math.abs(velocityRef.current) < 0.02) {
          velocityRef.current = BASE_SPEED;
        }
        rotationRef.current += velocityRef.current * (delta * 60);
      }
      setRotation(rotationRef.current);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [selectedProjectIndex]);

  // Handlers para arrastar com Mouse ou Dedo nos cards
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    dragVelocityRef.current = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dist = Math.hypot(e.clientX - startXRef.current, e.clientY - startYRef.current);
    if (dist > 12) {
      hasMovedRef.current = true;
    }
    const deltaX = e.clientX - lastXRef.current;
    const rotationDelta = deltaX * 0.42;
    rotationRef.current += rotationDelta;
    dragVelocityRef.current = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, rotationDelta * 0.95));
    lastXRef.current = e.clientX;
    setRotation(rotationRef.current);
  };

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (Math.abs(dragVelocityRef.current) > 0.05) {
      velocityRef.current = dragVelocityRef.current;
    } else {
      velocityRef.current = BASE_SPEED;
    }
  }, []);

  const openProject = (idx: number) => {
    if (!hasMovedRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      setSelectedProjectIndex(idx);
    }
  };

  return (
    <div className="w-full relative py-0 font-sans select-none flex justify-center overflow-hidden">
      <div className="relative w-full h-[260px] sm:h-[280px] md:h-[290px] lg:h-[260px] xl:h-[275px] flex items-center justify-center">
        {/* Container do Carrossel Orbital */}
        <div
          ref={containerRef}
          className={`relative w-full h-full flex items-center justify-center touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ perspective: '1000px' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Grupo Orbital (Cards em perspectiva 3D fluida) */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((project, index) => {
              const itemAngle = ((index * angleSlice + rotation) % 360 + 360) % 360;
              const rad = (itemAngle * Math.PI) / 180;

              const x = Math.sin(rad) * zDepth;
              const cosVal = Math.cos(rad);
              const z = cosVal * (zDepth * 0.35);
              const normFactor = (cosVal + 1) / 2; // 0 atrás, 1 no centro frontal

              // Escala e opacidade com transição perfeitamente contínua
              const scale = 0.70 + 0.36 * Math.pow(normFactor, 1.8);
              let opacity = 0.42 + 0.58 * normFactor;

              // Para grande volume de cards (ex: 10 a 100+), atenua os cards na parte traseira da roda 3D
              if (numProjects > 8 && normFactor < 0.35) {
                opacity = opacity * Math.pow(normFactor / 0.35, 1.5);
              }

              const zIndex = Math.round(normFactor * 100);

              return (
                <div
                  key={project.id || index}
                  className="absolute cursor-pointer group select-none will-change-transform"
                  style={{
                    width: rectWidth,
                    height: rectHeight,
                    left: '50%',
                    top: '50%',
                    marginLeft: -rectWidth / 2,
                    marginTop: -rectHeight / 2,
                    transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openProject(index);
                  }}
                >
                  <div
                    className={`w-full h-full shadow-2xl overflow-hidden relative rounded-2xl ${
                      isDark
                        ? 'bg-neutral-900 shadow-black/80'
                        : 'bg-white shadow-xl'
                    }`}
                    style={{
                      borderRadius: `${borderRadius}px`,
                      isolation: 'isolate',
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                    }}
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3.5 sm:p-4.5 pointer-events-none rounded-2xl">
                      <div className="transform transition-transform duration-300 group-hover:scale-[1.02] origin-bottom-left">
                        {/* Categoria no topo do card com fonte sutilmente menor para perfeita harmonia */}
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 mb-0.5 block drop-shadow">
                          {project.category || 'Arquitetura'}
                        </span>
                        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-normal leading-snug drop-shadow-md">
                          {renderStyledTitle(project.title)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL / DRAWER DE DETALHES DO PROJETO */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProjectIndex(null)}
                className={`fixed inset-0 z-[999999] flex items-center justify-center ${
                  isFullScreenImage ? 'p-0 sm:p-4 md:p-6' : 'p-2 sm:p-5 md:p-8 lg:p-10'
                } bg-black/90 cursor-pointer overflow-hidden`}
              >
                {/* CONTAINER DO MODAL */}
                <motion.div
                  initial={{ scale: 0.96, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.96, opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className={`relative flex transition-all duration-300 cursor-default ${
                    isFullScreenImage
                      ? 'w-full h-full sm:w-[98vw] max-w-[1800px] sm:h-[92vh] flex-row rounded-none sm:rounded-3xl'
                      : 'w-[96vw] sm:w-[92vw] md:w-[88vw] lg:w-[85vw] max-w-[1500px] flex-col md:flex-row h-[96vh] sm:h-[88vh] md:h-[86vh] rounded-2xl sm:rounded-3xl'
                  } overflow-hidden shadow-2xl ${
                    isDark
                      ? 'bg-[#121214] text-white'
                      : 'bg-white text-slate-900'
                  }`}
                >
                  {/* BOTÃO FECHAR (X) COMPACTO COM ESPAÇAMENTO CONFORTÁVEL */}
                  {!isFullScreenImage && (
                    <button
                      onClick={() => {
                        setIsFullScreenImage(false);
                        setSelectedProjectIndex(null);
                      }}
                      className={`absolute top-2.5 right-3 sm:top-3.5 sm:right-4 md:top-4 md:right-5 z-[100] p-1.5 transition-all duration-300 cursor-pointer hover:scale-110 ${
                        isDark
                          ? 'text-white hover:text-[#e0526e] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:drop-shadow-none'
                          : 'text-white md:text-slate-900 hover:text-[#800020] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] md:drop-shadow-none'
                      }`}
                      aria-label="Fechar"
                    >
                      <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                    </button>
                  )}

                  {/* 1. LADO DA GALERIA DE FOTOS (PREENCHIMENTO COMPLETO SEM BORDAS PRETAS NO CARD) */}
                  <div
                    onWheel={handleImageWheel}
                    onTouchStart={handleImageTouchStart}
                    onTouchEnd={handleImageTouchEnd}
                    className={`relative ${
                      isFullScreenImage
                        ? 'w-full h-full bg-neutral-950'
                        : 'w-full md:w-[58%] lg:w-[60%] xl:w-[62%] h-[35%] sm:h-[45%] md:h-full bg-neutral-900'
                    } flex items-center justify-center overflow-hidden group flex-shrink-0 touch-pan-y transition-all duration-300`}
                  >
                    {/* CONTAINER DA GALERIA */}
                    <div className="relative w-full h-full flex items-center justify-center transition-all duration-300 overflow-hidden">
                      {/* CONTAINER QUE ROTACIONA A IMAGEM E TODOS OS BOTÕES NO MOBILE EM TELA CHEIA */}
                      <div
                        className={`relative flex items-center justify-center transition-all duration-300 overflow-hidden ${
                          isFullScreenImage && isMobile
                            ? 'w-[100vh] h-[100vw] rotate-90 flex-shrink-0'
                            : 'w-full h-full rotate-0'
                        }`}
                      >
                        {/* Título do Projeto no Topo Centro (Modo Tela Cheia) em Fonte Eyebrow Branca */}
                        {isFullScreenImage && (
                          <div className="absolute top-4 sm:top-4 left-1/2 -translate-x-1/2 z-40 max-w-[50%] text-center pointer-events-none">
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] truncate block">
                              {selectedProject.title}
                            </span>
                          </div>
                        )}

                        {/* Botão X Fechar (no canto superior direito do container em tela cheia) */}
                        {isFullScreenImage && (
                          <button
                            onClick={() => {
                              setIsFullScreenImage(false);
                              setSelectedProjectIndex(null);
                            }}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 p-1.5 text-white hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
                            aria-label="Fechar"
                          >
                            <X className="w-7 h-7 sm:w-8 sm:h-8" />
                          </button>
                        )}

                        {/* Botão Setinha para Expandir / Restaurar Tela Cheia (Sem fundo preto, apenas a setinha branca com sombra) */}
                        <button
                          onClick={() => setIsFullScreenImage(!isFullScreenImage)}
                          className="absolute top-3 left-3 sm:top-4 sm:left-4 z-40 p-2 text-white hover:scale-110 transition-all duration-300 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] flex items-center justify-center"
                          title={isFullScreenImage ? 'Restaurar visualização' : 'Expandir imagem em tela cheia'}
                          aria-label={isFullScreenImage ? 'Restaurar visualização' : 'Expandir imagem em tela cheia'}
                        >
                          {isFullScreenImage ? (
                            <Minimize2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                          ) : (
                            <Maximize2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
                          )}
                        </button>

                        {/* IMAGEM DA GALERIA - TRANSIÇÃO LEVE, FLUIDA E RÁPIDA (SEM TRAVAMENTOS) */}
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.img
                            key={`${selectedProjectIndex}-${activePhotoIndex}`}
                            src={selectedProject.gallery[activePhotoIndex]}
                            alt={`${selectedProject.title} foto ${activePhotoIndex + 1}`}
                            initial={{ opacity: 0.1, scale: 0.995 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.1, scale: 1.005 }}
                            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            style={{ willChange: 'opacity, transform' }}
                            className={`w-full h-full select-none pointer-events-none ${
                              isFullScreenImage
                                ? 'max-w-full max-h-full object-contain drop-shadow-lg'
                                : 'object-cover object-center drop-shadow-md'
                            }`}
                            loading="eager"
                          />
                        </AnimatePresence>

                        {/* Setas de Navegação das Fotos */}
                        {selectedProject.gallery.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevPhoto}
                              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-2 text-white/90 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] cursor-pointer"
                              aria-label="Foto anterior"
                            >
                              <ChevronLeft size={32} className="sm:w-9 sm:h-9 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]" />
                            </button>
                            <button
                              onClick={handleNextPhoto}
                              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-2 text-white/90 hover:text-white hover:scale-110 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] cursor-pointer"
                              aria-label="Próxima foto"
                            >
                              <ChevronRight size={32} className="sm:w-9 sm:h-9 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]" />
                            </button>
                          </>
                        )}

                        {/* Indicadores Minimalistas (Bolinhas) */}
                        {selectedProject.gallery.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex gap-1.5 items-center transition-all duration-300">
                            {selectedProject.gallery.map((_, pIdx) => (
                              <button
                                key={pIdx}
                                onClick={() => setActivePhotoIndex(pIdx)}
                                className={`rounded-full transition-all drop-shadow ${
                                  pIdx === activePhotoIndex
                                    ? 'w-2.5 h-2.5 bg-[#800020] dark:bg-[#e0526e] scale-110'
                                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                                }`}
                                aria-label={`Ver foto ${pIdx + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2. LADO DOS TEXTOS DO PROJETO (PAINEL LATERAL OTIMIZADO) */}
                  {!isFullScreenImage && (
                    <div
                      onWheel={handleTextWheel}
                      onTouchStart={handleTextTouchStart}
                      onTouchEnd={handleTextTouchEnd}
                      className={`p-3 sm:p-5 md:p-6 lg:p-8 pt-3 sm:pt-6 md:pt-8 lg:pt-10 flex flex-col justify-between touch-pan-y w-full md:w-[42%] lg:w-[40%] xl:w-[38%] h-[65%] sm:h-[55%] md:h-full min-h-0 overflow-hidden ${
                        isDark ? 'bg-[#121214] text-white' : 'bg-white text-slate-900'
                      }`}
                    >
                      {/* Conteúdo de Texto com Animação de Fade In / Fade Out */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedProjectIndex}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.22 }}
                          className="flex-1 min-h-0 flex flex-col justify-between space-y-1.5 sm:space-y-2.5 md:space-y-3.5 overflow-hidden"
                        >
                          {/* CABEÇALHO DO PROJETO */}
                          <div className="space-y-1 sm:space-y-1.5 flex-shrink-0">
                            {/* LINHA 1: TÍTULO À ESQUERDA (NUNCA QUEBRA LINHA), CATEGORIA À DIREITA */}
                            <div className="flex items-center justify-between gap-2 pr-6 sm:pr-8 min-w-0 w-full">
                              <h2 className={`text-xl sm:text-2xl md:text-xl lg:text-2xl tracking-tight font-bold truncate whitespace-nowrap min-w-0 flex-1 ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                {renderStyledTitle(selectedProject.title)}
                              </h2>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-1 text-right">
                                <span className={`text-[11px] sm:text-xs md:text-xs lg:text-sm font-extrabold tracking-[0.14em] uppercase whitespace-nowrap sm:whitespace-normal sm:max-w-[160px] leading-tight text-right block ${
                                  isDark ? 'text-[#e0526e]' : 'text-[#800020]'
                                }`}>
                                  {selectedProject.category || 'Arquitetura'}
                                </span>
                              </div>
                            </div>

                            {/* LINHA DIVISÓRIA 1 ABAIXO DO TÍTULO E LABEL */}
                            <div className={`border-b ${isDark ? 'border-neutral-800' : 'border-slate-200'}`} />

                            {/* FRASE / DESCRIÇÃO DO PROJETO DESTAQUE (SEM NEGRITO, CENTRALIZADA, 2 LINHAS EQUIVALENTES) */}
                            {selectedProject.description && (
                              <div className="py-0.5 w-full">
                                <p 
                                  style={{ textWrap: 'balance' }}
                                  className={`font-serif italic font-normal leading-tight sm:leading-snug tracking-tight text-center text-balance w-full max-w-full mx-auto text-base sm:text-base md:text-base lg:text-lg ${
                                    isDark ? 'text-neutral-100' : 'text-[#800020]'
                                  }`}
                                >
                                  "{selectedProject.description}"
                                </p>
                              </div>
                            )}

                            {/* LINHA DIVISÓRIA 2 ABAIXO DA FRASE */}
                            <div className={`border-b ${isDark ? 'border-neutral-800' : 'border-slate-200'}`} />

                            {/* SELETOR DE ABAS (Contexto / Processo / Resultado) CENTRALIZADO */}
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-0.5 pb-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                              {[
                                { id: 'contexto', label: 'Contexto' },
                                { id: 'processo', label: 'Processo' },
                                { id: 'resultado', label: 'Resultado' },
                              ].map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                  <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`text-xs sm:text-xs md:text-sm font-bold px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                                      isActive
                                        ? 'bg-[#800020] text-white font-extrabold shadow-md scale-102'
                                        : isDark
                                        ? 'bg-neutral-800/90 text-neutral-300 hover:text-white hover:bg-neutral-800'
                                        : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                                    }`}
                                  >
                                    {tab.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* ÁREA PRINCIPAL DE TEXTO DA ABA SELECIONADA */}
                          <div className="flex-1 min-h-0 overflow-y-auto pr-1 mt-1 md:mt-2 lg:mt-2.5 space-y-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.18 }}
                              >
                                {(() => {
                                  let rawText = '';
                                  if (activeTab === 'contexto') {
                                    rawText = selectedProject.context || selectedProject.antes || `O projeto foi desenvolvido para uma residência térrea em um terreno de 250 m², priorizando integração, iluminação e ventilação naturais.`;
                                  } else if (activeTab === 'processo') {
                                    rawText = selectedProject.process || selectedProject.transformacao || `O partido arquitetônico organiza os ambientes ao redor de um pátio central, estabelecendo integração visual entre interior e exterior.`;
                                  } else {
                                    rawText = selectedProject.result || selectedProject.resultado || `O resultado é uma residência contemporânea com espaços amplos, contínuos e fortemente conectados ao pátio interno.`;
                                  }

                                  const len = rawText.length;
                                  // Mobile: fonte ampliada (text-base / text-sm). Desktop: tamanho otimizado (md:text-base / md:text-sm) para todo o texto caber confortavelmente sem cortes.
                                  const fontClass = len < 140
                                    ? 'text-base sm:text-lg md:text-base lg:text-lg'
                                    : len < 250
                                    ? 'text-sm sm:text-base md:text-sm lg:text-base'
                                    : 'text-sm sm:text-base md:text-xs lg:text-sm';

                                  return (
                                    <p className={`${fontClass} leading-relaxed text-justify [text-align-last:left] ${
                                      isDark ? 'text-neutral-300' : 'text-slate-700'
                                    }`}>
                                      {rawText}
                                    </p>
                                  );
                                })()}
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {/* LOCALIZAÇÃO E METADADOS (FIXOS) */}
                          <div className={`pt-2.5 flex-shrink-0 flex items-center justify-between gap-4 text-xs sm:text-sm md:text-base font-bold border-t ${
                            isDark ? 'border-neutral-800 text-neutral-200' : 'border-slate-200 text-slate-800'
                          }`}>
                            <div className="flex items-center gap-1.5">
                              <MapPin size={18} className={`flex-shrink-0 ${isDark ? 'text-[#e0526e]' : 'text-[#800020]'}`} />
                              <span className="text-xs sm:text-sm md:text-base font-semibold">{selectedProject.location || 'Parnamirim - PE'}</span>
                            </div>
                            {selectedProject.year && (
                              <div className="flex items-center gap-1 opacity-90 ml-auto text-right text-xs sm:text-sm md:text-base">
                                <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>Ano:</span>
                                <span className="font-semibold">{selectedProject.year}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* NAVEGAÇÃO ENTRE PROJETOS (FIXA NA BASE) */}
                      <div className={`pt-3 mt-auto flex-shrink-0 border-t flex items-center justify-between gap-3 ${
                        isDark ? 'border-neutral-800' : 'border-slate-200'
                      }`}>
                        {/* Indicadores de Bolinhas */}
                        <div className="flex items-center gap-2">
                          {projects.map((p, pIdx) => (
                            <button
                              key={p.id || pIdx}
                              onClick={() => setSelectedProjectIndex(pIdx)}
                              title={p.title}
                              className={`rounded-full transition-all cursor-pointer ${
                                pIdx === selectedProjectIndex
                                  ? 'w-2.5 h-2.5 bg-[#800020] dark:bg-[#e0526e] ring-2 ' + (isDark ? 'ring-[#e0526e]/50' : 'ring-[#800020]/40') + ' scale-110'
                                  : 'w-1.5 h-1.5 ' + (isDark ? 'bg-neutral-600 hover:bg-neutral-400' : 'bg-slate-300 hover:bg-slate-500')
                              }`}
                              aria-label={`Ir para o projeto ${p.title}`}
                            />
                          ))}
                        </div>

                        {/* Botão Próximo Projeto */}
                        <button
                          onClick={handleNextProject}
                          className={`flex items-center gap-1.5 text-xs font-extrabold tracking-widest uppercase hover:opacity-75 transition-all cursor-pointer ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          <span>PRÓXIMO</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
