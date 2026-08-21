import { useEffect, useRef, useState, useCallback, TouchEvent, MouseEvent, ComponentType } from 'react';
import { 
  Compass, 
  Sparkles, 
  LogIn, 
  Palette, 
  Gift,
  Layers,
  ClipboardList,
  Play,
  Key,
  Home,
  Ear,
  Target,
  Lightbulb,
  AlertTriangle,
  Maximize2,
  BookOpen,
  Route
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
// @ts-ignore
import p0CompraBg from '../../assets/images/P0-COMPRA.webp';
// @ts-ignore
import p0CompraMBg from '../../assets/images/P0-COMPRA M.webp';
// @ts-ignore
import p1LevantamentoBg from '../../assets/images/P1-LEVANTAMENTO 2.webp';
// @ts-ignore
import p1LevantamentoMBg from '../../assets/images/P1-LEVANTAMENTO M.webp';
// @ts-ignore
import p2SementeBg from '../../assets/images/P2-SEMENTE.webp';
// @ts-ignore
import p2SementeMBg from '../../assets/images/P2-SEMENTE M.webp';
// @ts-ignore
import p3ExperimentoBg from '../../assets/images/P3-EXPERIMENTO.webp';
// @ts-ignore
import p3ExperimentoMBg from '../../assets/images/P3-EXPERIMENTO M2.webp';
// @ts-ignore
import p4RefinamentoBg from '../../assets/images/P4-REFINAMENTO.webp';
// @ts-ignore
import p4RefinamentoMBg from '../../assets/images/P4-REFINAMENTO M.webp';
// @ts-ignore
import p5ConstrucaoBg from '../../assets/images/P5-CONSTRUÇÃO.webp';
// @ts-ignore
import p5ConstrucaoMBg from '../../assets/images/P5-CONSTRUÇÃO M.webp';

interface Processo {
  numero: string;
  secao: string;
  categoria: string;
  corBadge: string;
  subtitulo: string;
  titulo: string;
  imagem: string;
  imagemMobile?: string;
  topicos?: {
    titulo: string;
    descricao: string;
    icon: ComponentType<{ className?: string }>;
  }[];
}

const processos: Processo[] = [
  {
    numero: "01",
    secao: "COMPRA • BOAS VINDAS",
    categoria: "BLOCO 01 • IMERSÃO",
    corBadge: "#E8622C",
    subtitulo: "Feito para durar",
    titulo: "Sua jornada começa aqui! Descubra como funciona o programa Alquimia Espacial e entenda como cada etapa aproxima você do espaço que quer construir.",
    imagem: p0CompraBg,
    imagemMobile: p0CompraMBg,
    topicos: [
      {
        titulo: "Primeiro Contato",
        descricao: "Responda a um breve formulário para entendermos sua rotina e objetivos.",
        icon: ClipboardList
      },
      {
        titulo: "Proposta de Valor",
        descricao: "Receba uma oferta em vídeo com as condições e acesso direto ao pagamento.",
        icon: Play
      },
      {
        titulo: "Rito de Entrada",
        descricao: "Após o pagamento, acesse o espaço de cocriação para iniciar seu projeto.",
        icon: Key
      }
    ]
  },
  {
    numero: "02",
    secao: "PRÉ-SESSÃO • LEVANTAMENTO",
    categoria: "BLOCO 01 • IMERSÃO",
    corBadge: "#E8622C",
    subtitulo: "Feito para durar",
    titulo: "Presencial ou à distância, mapeamos seu espaço e suas necessidades para gerar um briefing estratégico e um modelo tridimensional preciso.",
    imagem: p1LevantamentoBg,
    imagemMobile: p1LevantamentoMBg,
    topicos: [
      {
        titulo: "Habitat do Projeto",
        descricao: "Criamos uma base organizada para que cada etapa avance com clareza e segurança.",
        icon: Home
      },
      {
        titulo: "Escuta Atenta",
        descricao: "Analisamos sua rotina para propor soluções sob medida alinhadas à sua realidade.",
        icon: Ear
      },
      {
        titulo: "Essência do Espaço",
        descricao: "Traduzimos as observações em um briefing preciso e em um modelo tridimensional fiel.",
        icon: Sparkles
      }
    ]
  },
  {
    numero: "03",
    secao: "SESSÃO 01 • SEMENTE",
    categoria: "BLOCO 02 • DIVERGÊNCIA",
    corBadge: "#3B7A57",
    subtitulo: "Feito para durar",
    titulo: "Suas ideias ganham direção clara. Analisamos seu espaço e referências para revelar oportunidades, desafios e o verdadeiro potencial do seu projeto.",
    imagem: p2SementeBg,
    imagemMobile: p2SementeMBg,
    topicos: [
      {
        titulo: "Análise Contextual",
        descricao: "Transformamos informações dispersas em uma visão clara para guiar suas próximas decisões.",
        icon: Compass
      },
      {
        titulo: "Visão Tridimensional",
        descricao: "Avaliamos técnica, estética e rotina para propor soluções que realmente fazem sentido.",
        icon: Layers
      },
      {
        titulo: "Mapa Estratégico",
        descricao: "Analisamos oportunidades e riscos para que você decida cada detalhe com total segurança.",
        icon: Target
      }
    ]
  },
  {
    numero: "04",
    secao: "SESSÃO 02 • EXPERIMENTO",
    categoria: "BLOCO 02 • DIVERGÊNCIA",
    corBadge: "#3B7A57",
    subtitulo: "Feito para durar",
    titulo: "Transforme possibilidades em direção clara. Testamos conceitos e modelos 3D para que escolha, com confiança, o caminho ideal do seu projeto.",
    imagem: p3ExperimentoBg,
    imagemMobile: p3ExperimentoMBg,
    topicos: [
      {
        titulo: "Identidade do Projeto",
        descricao: "Defina a ideia central que guiará todas as escolhas do projeto, do início à execução.",
        icon: Lightbulb
      },
      {
        titulo: "Exploração Criativa",
        descricao: "Compare soluções em croquis e modelos 3D até encontrar a que melhor traduz sua visão.",
        icon: Palette
      },
      {
        titulo: "Ponto de Clareza",
        descricao: "Escolha o rumo ideal com segurança e avance com um projeto feito sob medida para você.",
        icon: Target
      }
    ]
  },
  {
    numero: "05",
    secao: "SESSÃO 03 • REFINAMENTO",
    categoria: "BLOCO 03 • CONVERGÊNCIA",
    corBadge: "#4A6B82",
    subtitulo: "Feito para durar",
    titulo: "As escolhas se consolidam e o projeto ganha maturidade. Resolvemos cada detalhe para transformar boas ideias em decisões seguras e coerentes.",
    imagem: p4RefinamentoBg,
    imagemMobile: p4RefinamentoMBg,
    topicos: [
      {
        titulo: "Diagnóstico de Tensões",
        descricao: "Identificamos ajustes necessários para fortalecer a proposta antes de seguir adiante.",
        icon: AlertTriangle
      },
      {
        titulo: "Soluções Essenciais",
        descricao: "Refinamos cada solução essencial para torná-la mais funcional, clara e consistente.",
        icon: Sparkles
      },
      {
        titulo: "Visão Ampliada",
        descricao: "Mapeamos necessidades além da arquitetura em croquis que guiam todo o processo de obra.",
        icon: Maximize2
      }
    ]
  },
  {
    numero: "06",
    secao: "SESSÃO 04 • CONSTRUÇÃO",
    categoria: "BLOCO 03 • CONVERGÊNCIA",
    corBadge: "#4A6B82",
    subtitulo: "Feito para durar",
    titulo: "Seu projeto ganha forma para sair do papel. Receba toda a documentação e orientações necessárias para executar cada etapa com total confiança.",
    imagem: p5ConstrucaoBg,
    imagemMobile: p5ConstrucaoMBg,
    topicos: [
      {
        titulo: "Projeto Consolidado",
        descricao: "Visualize o resultado completo e veja como cada escolha valoriza o seu novo espaço.",
        icon: Layers
      },
      {
        titulo: "Guia de Continuidade",
        descricao: "Saiba exatamente por onde começar, quais prioridades seguir e como gerenciar a obra.",
        icon: Route
      },
      {
        titulo: "Consciência Autônoma",
        descricao: "Registramos toda a jornada em um guia que preserva a visão e as decisões tomadas.",
        icon: BookOpen
      }
    ]
  }
];

// Helper to get custom colors for the category block badges as requested by the user
const getBadgeColors = (categoria: string) => {
  const cat = categoria.toUpperCase();
  if (cat.includes("BLOCO 01") || cat.includes("BLOCO 1")) {
    return {
      bg: "#F4F6F9", // branco gelo
      text: "#1F2937", // dark slate text
      icon: LogIn
    };
  }
  if (cat.includes("BLOCO 02") || cat.includes("BLOCO 2")) {
    return {
      bg: "#C99A1C", // amarelo queimado elegante (sem tom de laranja)
      text: "#111827", // dark grey text
      icon: Palette
    };
  }
  if (cat.includes("BLOCO 03") || cat.includes("BLOCO 3")) {
    return {
      bg: "#606C38", // verde oliva
      text: "#F8FAFC", // light off-white text
      icon: Gift
    };
  }
  return {
    bg: "rgba(255, 255, 255, 0.15)",
    text: "#FFFFFF",
    icon: Compass
  };
};

const blockExplanations: Record<string, string> = {
  "BLOCO 01 • IMERSÃO": "Onde o espaço se revela: entendemos quem você é e o que realmente precisa.",
  "BLOCO 02 • DIVERGÊNCIA": "Onde o possível encontra o necessário: exploramos caminhos até achar sua direção.",
  "BLOCO 03 • CONVERGÊNCIA": "O projeto se consolida: definimos, documentamos e entregamos para você construir."
};

const phaseExplanations: Record<string, string> = {
  "COMPRA • BOAS VINDAS": "O espaço reflete sua alma. Iniciamos a transmutação para apoiar quem você se torna.",
  "PRÉ-SESSÃO • LEVANTAMENTO": "Solve et Coagula: Mapeamos o antigo para desenhar a ponte entre as ideias e o plano físico.",
  "SESSÃO 01 • SEMENTE": "Nigredo: Encaramos o que pesa e não funciona, dando início ao processo de purificação.",
  "SESSÃO 02 • EXPERIMENTO": "Albedo: Separamos o essencial do acumulado para que seu ambiente respire com clareza.",
  "SESSÃO 03 • REFINAMENTO": "Citrinitas: A maturação silenciosa. O design se consolida em sintonia com a sua essência.",
  "SESSÃO 04 • CONSTRUÇÃO": "Rubedo: A Grande Obra. O espaço físico se materializa como extensão fiel de quem você é."
};

const getSlideTranslateY = (idx: number, scrollPos: number, lineY: number): number => {
  if (idx === 0) return 0;
  
  const prevCenter = idx - 1 + 0.5;
  const thisCenter = idx === 5 ? 5.8 : idx + 0.5;
  
  if (scrollPos <= prevCenter) {
    return 100;
  }
  if (scrollPos >= thisCenter) {
    return 0;
  }
  
  if (scrollPos <= idx) {
    // Part 1: from prevCenter (100%) to idx (lineY)
    const t = (scrollPos - prevCenter) / 0.5;
    return 100 - t * (100 - lineY);
  } else {
    // Part 2: from idx (lineY) to thisCenter (0%)
    const dt = thisCenter - idx;
    const t = (scrollPos - idx) / dt;
    return lineY - t * lineY;
  }
};

export default function TimelineSection() {
  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const [lineYPercent, setLineYPercent] = useState(35);
  const [isMobile, setIsMobile] = useState(false);
  const [isBlockPinned, setIsBlockPinned] = useState(false);
  const [isPhasePinned, setIsPhasePinned] = useState(false);

  const [isNavDragging, setIsNavDragging] = useState(false);
  const [isHoldingBackground, setIsHoldingBackground] = useState(false);

  const slideOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slideInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarFillRef = useRef<HTMLDivElement | null>(null);

  const wrapperOffsetTopRef = useRef<number | null>(null);
  const wrapperHeightRef = useRef<number>(12000);

  const updateWrapperMetrics = useCallback(() => {
    const wrapper = document.getElementById('timeline-scroll-wrapper');
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      wrapperOffsetTopRef.current = rect.top + scrollY;
      wrapperHeightRef.current = rect.height;
    }
  }, []);

  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const holdTimerRef = useRef<number | null>(null);

  const mouseMoveHandlerRef = useRef<((ev: globalThis.MouseEvent) => void) | null>(null);
  const mouseUpHandlerRef = useRef<(() => void) | null>(null);

  // Smooth scroll helper for step navigation
  const smoothScrollTo = useCallback((targetY: number, duration = 750) => {
    const startY = window.scrollY || document.documentElement.scrollTop;
    const difference = targetY - startY;
    const startTime = performance.now();

    const run = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progressRatio = Math.min(timeElapsed / duration, 1);
      
      // Easing function: easeInOutCubic
      const ease = progressRatio < 0.5 
        ? 4 * progressRatio * progressRatio * progressRatio 
        : 1 - Math.pow(-2 * progressRatio + 2, 3) / 2;

      window.scrollTo(0, startY + difference * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
  }, []);

  const navigateToStep = useCallback((index: number, instant = false) => {
    if (wrapperOffsetTopRef.current === null) {
      updateWrapperMetrics();
    }
    const wrapperTop = wrapperOffsetTopRef.current || 0;
    const wrapperHeight = wrapperHeightRef.current || 12000;
    const maxScroll = wrapperHeight - window.innerHeight;
    
    let centerScrollPos = index + 0.5;
    if (index === 5) centerScrollPos = 5.8;
    
    const targetPercent = centerScrollPos / 6;
    const targetY = wrapperTop + targetPercent * maxScroll;
    
    if (instant) {
      window.scrollTo(0, targetY);
    } else {
      smoothScrollTo(targetY, isMobile ? 500 : 650);
    }
  }, [smoothScrollTo, isMobile, updateWrapperMetrics]);

  const startHoldTimer = useCallback(() => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
    }
    holdTimerRef.current = window.setTimeout(() => {
      setIsHoldingBackground(true);
      holdTimerRef.current = null;
    }, 220);
  }, []);

  const cancelHoldTimer = useCallback(() => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHoldingBackground(false);
  }, []);

  const handleBackgroundTouchStart = useCallback((e: TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-timeline-no-press-hold="true"]') || target.closest('[data-no-press-hold="true"]')) {
      return;
    }
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    startHoldTimer();
  }, [startHoldTimer]);

  const handleBackgroundTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    // If they moved their finger by more than 10 pixels, they are scrolling, not holding
    if (Math.sqrt(dx * dx + dy * dy) > 10) {
      cancelHoldTimer();
      touchStartPos.current = null;
    }
  }, [cancelHoldTimer]);

  const handleBackgroundTouchEnd = useCallback(() => {
    cancelHoldTimer();
    touchStartPos.current = null;
  }, [cancelHoldTimer]);

  const handleBackgroundMouseDown = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('[data-timeline-no-press-hold="true"]') || target.closest('[data-no-press-hold="true"]')) {
      return;
    }
    startHoldTimer();
  }, [startHoldTimer]);

  const handleBackgroundMouseUp = useCallback(() => {
    cancelHoldTimer();
  }, [cancelHoldTimer]);

  const handleBackgroundMouseLeave = useCallback(() => {
    cancelHoldTimer();
  }, [cancelHoldTimer]);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const pageIndexRef = useRef<number | null>(null);

  const isDraggingRef = useRef(false);
  const dragContainerRectRef = useRef<DOMRect | null>(null);
  
  const touchStartYRef = useRef(0);
  const touchHasMovedRef = useRef(false);

  // Reset tooltips immediately when section changes
  useEffect(() => {
    setIsBlockPinned(false);
    setIsPhasePinned(false);
  }, [currentPageIndex]);

  const handlePointerNav = useCallback((clientY: number) => {
    if (!dragContainerRectRef.current) return;
    const rect = dragContainerRectRef.current;
    
    const relativeY = clientY - rect.top;
    const percent = Math.max(0, Math.min(1, relativeY / rect.height));
    
    const targetIdx = Math.max(0, Math.min(processos.length - 1, Math.floor(percent * processos.length)));
    navigateToStep(targetIdx, true);
  }, [navigateToStep]);

  const handleNavTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const clientY = e.touches[0].clientY;
    touchStartYRef.current = clientY;
    touchHasMovedRef.current = false;
    
    const rect = e.currentTarget.getBoundingClientRect();
    dragContainerRectRef.current = rect;
  }, []);

  const handleNavTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const clientY = e.touches[0].clientY;
    const deltaY = Math.abs(clientY - touchStartYRef.current);
    
    if (deltaY > 8) {
      touchHasMovedRef.current = true;
      isDraggingRef.current = true;
      setIsNavDragging(true);
      
      if (e.cancelable) {
        e.preventDefault();
      }
      handlePointerNav(clientY);
    }
  }, [handlePointerNav]);

  const handleNavTouchEnd = useCallback(() => {
    if (!touchHasMovedRef.current && dragContainerRectRef.current) {
      // It was a tap! Let's find which step was tapped based on relative Y position
      const rect = dragContainerRectRef.current;
      const relativeY = touchStartYRef.current - rect.top;
      const percent = Math.max(0, Math.min(1, relativeY / rect.height));
      const targetIdx = Math.max(0, Math.min(processos.length - 1, Math.floor(percent * processos.length)));
      
      navigateToStep(targetIdx, false); // Beautiful smooth scroll!
    }
    
    isDraggingRef.current = false;
    setIsNavDragging(false);
  }, [navigateToStep]);

  const handleNavMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsNavDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    dragContainerRectRef.current = rect;
    
    const handleMouseMoveGlobal = (ev: globalThis.MouseEvent) => {
      if (!isDraggingRef.current) return;
      handlePointerNav(ev.clientY);
    };
    
    const handleMouseUpGlobal = () => {
      isDraggingRef.current = false;
      setIsNavDragging(false);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
      mouseMoveHandlerRef.current = null;
      mouseUpHandlerRef.current = null;
    };
    
    mouseMoveHandlerRef.current = handleMouseMoveGlobal;
    mouseUpHandlerRef.current = handleMouseUpGlobal;
    
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    window.addEventListener('mouseup', handleMouseUpGlobal);
  }, [handlePointerNav]);

  // Robust resource cleanup on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }
      if (mouseMoveHandlerRef.current) {
        window.removeEventListener('mousemove', mouseMoveHandlerRef.current);
      }
      if (mouseUpHandlerRef.current) {
        window.removeEventListener('mouseup', mouseUpHandlerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setLineYPercent(32);
      } else {
        setLineYPercent(35);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const dismissTooltips = () => {
      setIsBlockPinned(false);
      setIsPhasePinned(false);
    };
    window.addEventListener('click', dismissTooltips);
    return () => window.removeEventListener('click', dismissTooltips);
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let isLooping = false;

    const applyTransforms = (scrollPos: number) => {
      // 1. Direct GPU transform updates on the 6 curtain slides
      for (let idx = 0; idx < 6; idx++) {
        const outer = slideOuterRefs.current[idx];
        const inner = slideInnerRefs.current[idx];
        if (outer && inner) {
          const translateY = getSlideTranslateY(idx, scrollPos, lineYPercent);
          outer.style.transform = `translate3d(0, ${translateY}%, 0)`;
          inner.style.transform = `translate3d(0, ${-translateY}%, 0)`;
        }
      }

      // 2. Direct width update on persistent horizontal line fill
      if (progressBarFillRef.current) {
        const barPercent = Math.max(0, Math.min(100, (scrollPos / 6.0) * 100));
        progressBarFillRef.current.style.width = `${barPercent}%`;
      }
    };

    const updateInterpolation = () => {
      const diff = targetProgress.current - currentProgress.current;
      
      if (Math.abs(diff) > 0.0001) {
        const factor = isDraggingRef.current ? 1.0 : (isMobile ? 0.22 : 0.14);
        currentProgress.current += diff * factor;
      } else {
        currentProgress.current = targetProgress.current;
      }

      const scrollPos = currentProgress.current * 6;
      applyTransforms(scrollPos);

      let calculatedIndex = 0;
      if (scrollPos < 1.0) {
        calculatedIndex = 0;
      } else if (scrollPos < 2.0) {
        calculatedIndex = 1;
      } else if (scrollPos < 3.0) {
        calculatedIndex = 2;
      } else if (scrollPos < 4.0) {
        calculatedIndex = 3;
      } else if (scrollPos < 5.0) {
        calculatedIndex = 4;
      } else {
        calculatedIndex = 5;
      }

      if (calculatedIndex !== pageIndexRef.current) {
        pageIndexRef.current = calculatedIndex;
        setCurrentPageIndex(calculatedIndex);
        setIsBlockPinned(false);
        setIsPhasePinned(false);
      }

      // Continue loop only if the difference has not yet settled
      if (Math.abs(targetProgress.current - currentProgress.current) > 0.0001) {
        animationFrameId = requestAnimationFrame(updateInterpolation);
      } else {
        isLooping = false;
        animationFrameId = null;
      }
    };

    const handleScroll = () => {
      if (wrapperOffsetTopRef.current === null) {
        updateWrapperMetrics();
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const wrapperTop = wrapperOffsetTopRef.current || 0;
      const wrapperHeight = wrapperHeightRef.current || 12000;
      const maxScroll = wrapperHeight - window.innerHeight;

      const scrolled = scrollTop - wrapperTop;
      const rawProgress = maxScroll > 0 ? scrolled / maxScroll : 0;
      targetProgress.current = Math.max(0, Math.min(1, rawProgress));

      if (!isLooping) {
        isLooping = true;
        animationFrameId = requestAnimationFrame(updateInterpolation);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateWrapperMetrics, { passive: true });
    updateWrapperMetrics();

    const metricTimer1 = setTimeout(updateWrapperMetrics, 100);
    const metricTimer2 = setTimeout(updateWrapperMetrics, 500);
    const metricTimer3 = setTimeout(updateWrapperMetrics, 1500);

    handleScroll();
    
    currentProgress.current = targetProgress.current;
    const initialScrollPos = targetProgress.current * 6;
    applyTransforms(initialScrollPos);
    
    let initialIndex = 0;
    if (initialScrollPos < 1.0) {
      initialIndex = 0;
    } else if (initialScrollPos < 2.0) {
      initialIndex = 1;
    } else if (initialScrollPos < 3.0) {
      initialIndex = 2;
    } else if (initialScrollPos < 4.0) {
      initialIndex = 3;
    } else if (initialScrollPos < 5.0) {
      initialIndex = 4;
    } else {
      initialIndex = 5;
    }
    pageIndexRef.current = initialIndex;
    setCurrentPageIndex(initialIndex);

    // Initial run to settle layout smoothly
    isLooping = true;
    animationFrameId = requestAnimationFrame(updateInterpolation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWrapperMetrics);
      clearTimeout(metricTimer1);
      clearTimeout(metricTimer2);
      clearTimeout(metricTimer3);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [updateWrapperMetrics, isMobile, lineYPercent]);

  const activeProcess = processos[currentPageIndex !== null ? currentPageIndex : 0];
  const secaoParts = activeProcess.secao.split(/\s*•\s*/);
  const line1 = secaoParts[0] || "";
  const line2 = secaoParts[1] || "";

  return (
    <div id="timeline-scroll-wrapper" className="relative w-full h-[1200vh] sm:h-[1300vh] bg-transparent">
      
      {/* Fixed Sticky Screen Container */}
      <div 
        id="timeline-sticky-screen-container" 
        className="sticky top-0 w-full h-screen overflow-hidden z-10 flex flex-col justify-between select-none pointer-events-auto"
        onMouseDown={handleBackgroundMouseDown}
        onMouseUp={handleBackgroundMouseUp}
        onMouseLeave={handleBackgroundMouseLeave}
        onTouchStart={handleBackgroundTouchStart}
        onTouchMove={handleBackgroundTouchMove}
        onTouchEnd={handleBackgroundTouchEnd}
        onTouchCancel={handleBackgroundTouchEnd}
      >
        
        {/* Centered headline */}
        <div 
          className="mt-[20px] absolute top-10 sm:top-12 md:top-14 lg:top-16 left-0 w-full z-30 px-3 sm:px-6 md:px-16 lg:px-24 flex items-center justify-center text-center pointer-events-auto"
          style={{
            opacity: isHoldingBackground ? 0 : 1,
            transition: 'opacity 0.25s ease-out',
            pointerEvents: isHoldingBackground ? 'none' : 'auto'
          }}
        >
          <a 
            href="#timeline-scroll-wrapper" 
            aria-label="Conheça o processo por trás do seu projeto"
            className="mt-[20px] text-white/90 font-sans font-normal tracking-normal text-center select-none max-w-full text-[21px] xs:text-[23px] sm:text-[30px] leading-[1.2] sm:leading-snug drop-shadow-md block"
          >
            <span className="block sm:inline whitespace-nowrap">Conheça o <span className="timeline-font-editorial font-editorial italic font-normal text-white tracking-wide">processo</span></span>{" "}
            <span className="block sm:inline whitespace-nowrap">por trás do <span className="timeline-font-editorial font-editorial italic font-normal text-white tracking-wide">seu projeto</span>.</span>
          </a>
        </div>

        {/* 
          1. Continuous Background Image (Curtain Sliding Mask)
          Each background image occupies 100% of the screen.
          As you scroll, the containers slide up like curtains, revealing the static
          images inside them, perfectly matching the style of floema.com.
        */}
        <div id="timeline-fullscreen-bg-container" className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          {processos.map((proc, idx) => {
            const zIndex = 10 + idx;
            const bgImage = isMobile && proc.imagemMobile ? proc.imagemMobile : proc.imagem;
            
            return (
              <div
                key={proc.numero}
                ref={(el) => { slideOuterRefs.current[idx] = el; }}
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{
                  transform: `translate3d(0, ${idx === 0 ? 0 : 100}%, 0)`,
                  willChange: 'transform',
                  zIndex: zIndex
                }}
              >
                <div
                  ref={(el) => { slideInnerRefs.current[idx] = el; }}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: `translate3d(0, ${idx === 0 ? 0 : -100}%, 0)`,
                    willChange: 'transform'
                  }}
                >
                  <img
                    src={bgImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    loading="eager"
                    decoding="async"
                    style={{ transform: 'translateZ(0)' }}
                  />
                  {/* Dark Ambient Overlay to maintain professional high contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          2. Persistent Divider Line
          Remains 100% fixed on the viewport at 55% from the top (38% on mobile).
          Fills horizontally to reflect total progress.
        */}
        <div 
          id="timeline-persistent-horizontal-line" 
          className="absolute left-0 right-0 z-20 h-[1px] bg-white/25"
          style={{ 
            top: `${lineYPercent}%`,
            opacity: 1
          }}
        >
          <div 
            id="timeline-persistent-horizontal-line-fill" 
            ref={progressBarFillRef}
            className="absolute top-0 left-0 h-[1.5px] bg-white will-change-[width]"
            style={{ width: '0%' }}
          />
        </div>

        {/* 
          3. Content & Dynamic Data Area
          Remains fixed in position. The text updates instantly in place when current index changes.
        */}
        <div id="timeline-interactive-content-layer" className="relative z-20 w-full h-full flex flex-col justify-between pointer-events-none">
          
          {/* Top layout padding */}
          <div className="h-20"></div>

          {/* Locked-in-place Content Grid aligned with the divider line */}
          <div 
            className="absolute inset-x-0 pointer-events-none"
            style={{ top: `${lineYPercent}%` }}
          >
            <AnimatePresence>
              {currentPageIndex !== null ? (
                <motion.div
                  key={currentPageIndex}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative w-full h-0 pointer-events-none"
                >
                  {/* Above the Line Section (Category Badge on Left + Section Name in Right) */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: isNavDragging ? 0 : 16 },
                      animate: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          opacity: { duration: isNavDragging ? 0.04 : 0.95, ease: [0.16, 1, 0.3, 1] },
                          y: { duration: isNavDragging ? 0.04 : 1.05, ease: [0.16, 1, 0.3, 1] }
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        y: isNavDragging ? 0 : -8,
                        transition: {
                          opacity: { duration: isNavDragging ? 0.04 : 0.16, ease: "easeIn" },
                          y: { duration: isNavDragging ? 0.04 : 0.16, ease: "easeIn" }
                        }
                      }
                    }}
                    className="absolute bottom-full left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-[780px] lg:max-w-[900px] xl:max-w-[1080px] 2xl:max-w-[1240px] pb-3 flex items-center justify-between pointer-events-auto"
                  >
                    
                    {/* Category Badge (Block) on the Left */}
                    {(() => {
                      const colors = getBadgeColors(activeProcess.categoria);
                      const IconComponent = colors.icon;
                      const parts = activeProcess.categoria.split(/\s*•\s*/);
                      const blocoTop = parts[0] || "BLOCO";
                      const blocoBottom = parts[1] || "";
                      return (
                        <div 
                          data-timeline-no-press-hold="true"
                          data-no-press-hold="true"
                          role="button"
                          tabIndex={0}
                          aria-label={`Ver informações do ${activeProcess.categoria}`}
                          aria-expanded={isBlockPinned}
                          className="relative select-none flex-shrink-0 pointer-events-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsBlockPinned(!isBlockPinned);
                            setIsPhasePinned(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsBlockPinned(!isBlockPinned);
                              setIsPhasePinned(false);
                            }
                          }}
                        >
                          {/* Slow pulsing wave ring */}
                          <motion.div
                            className="absolute -inset-1 rounded-lg pointer-events-none"
                            style={{ 
                              border: `1.5px solid ${colors.bg}`,
                              transform: 'translateZ(0)'
                            }}
                            animate={{
                              scale: [1, 1.12, 1],
                              opacity: [0.15, 0.4, 0.15],
                            }}
                            transition={{
                              duration: 4.0,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <div 
                            className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 rounded-lg text-left shadow-lg select-none border border-white/10 hover:brightness-110 h-[44px] sm:h-[50px] md:h-[54px]"
                            style={{ 
                              backgroundColor: colors.bg,
                              color: colors.text,
                              transform: 'translateZ(0)'
                            }}
                          >
                            <div className="flex-shrink-0">
                              <IconComponent className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                            </div>
                            <div className="flex flex-col items-start leading-none">
                              <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-75 mb-0.5 sm:mb-1">
                                {blocoTop}
                              </span>
                              <span className="text-[15px] font-display font-bold tracking-wider uppercase">
                                {blocoBottom}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Central Rectangle (Desktop / Tablet / Mobile) */}
                    <AnimatePresence>
                      {(() => {
                        const activeExplanationText = isHoldingBackground
                          ? null
                          : isBlockPinned 
                          ? blockExplanations[activeProcess.categoria]
                          : isPhasePinned 
                          ? phaseExplanations[activeProcess.secao]
                          : null;

                        if (!activeExplanationText) return null;

                        const isBlock = activeExplanationText.length < 110;

                        return (
                          <>
                            {!isMobile && (
                              <motion.div 
                                data-timeline-no-press-hold="true"
                                data-no-press-hold="true"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="absolute left-1/2 -translate-x-1/2 top-0 h-[44px] sm:h-[50px] md:h-[54px] flex items-center justify-center md:w-[360px] lg:w-[480px] xl:w-[620px] 2xl:w-[740px] px-4 pointer-events-auto"
                              >
                                {isBlock ? (
                                  <p className="text-white text-center font-display text-[11px] md:text-[12px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px] font-medium tracking-wide w-full leading-none whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                                    {activeExplanationText}
                                  </p>
                                ) : (
                                  <p className="text-white text-center font-display text-[9.5px] md:text-[10.5px] lg:text-[11.5px] xl:text-[13px] 2xl:text-[14px] font-medium tracking-wide w-full leading-none whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                                    {activeExplanationText}
                                  </p>
                                )}
                              </motion.div>
                            )}

                            {isMobile && (
                              <motion.div 
                                data-timeline-no-press-hold="true"
                                data-no-press-hold="true"
                                initial={{ opacity: 0, scale: 0.96, y: 3 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 3 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute bottom-[72px] left-0 right-0 px-4 pointer-events-auto flex items-center justify-center text-center z-30"
                              >
                                <p className="text-white text-center font-display text-[12px] xs:text-[13px] font-medium leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-[90%] mx-auto [text-wrap:balance]">
                                  {activeExplanationText}
                                </p>
                              </motion.div>
                            )}
                          </>
                        );
                      })()}
                    </AnimatePresence>

                    {/* Section Name (Page Title) on the right end of the line */}
                    <div 
                      data-timeline-no-press-hold="true"
                      data-no-press-hold="true"
                      role="button"
                      tabIndex={0}
                      aria-label={`Ver informações da seção ${activeProcess.secao}`}
                      aria-expanded={isPhasePinned}
                      className="relative font-display font-semibold text-right flex flex-col justify-center items-end px-3.5 sm:px-5 rounded-lg text-white/95 uppercase select-none transition-all duration-300 pointer-events-auto cursor-pointer h-[44px] sm:h-[50px] md:h-[54px] hover:bg-white/[0.02] focus:outline-none focus:ring-2 focus:ring-white/40"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPhasePinned(!isPhasePinned);
                        setIsBlockPinned(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsPhasePinned(!isPhasePinned);
                          setIsBlockPinned(false);
                        }
                      }}
                    >
                      {/* Slow pulsing outer wave ring - perfect rectangle of the same size as the badge */}
                      <motion.div
                        className="absolute -inset-1 rounded-lg pointer-events-none"
                        style={{
                          border: "1.5px solid rgba(255, 255, 255, 0.22)",
                          transform: 'translateZ(0)'
                        }}
                        animate={{
                          scale: [1, 1.12, 1],
                          opacity: [0.12, 0.4, 0.12],
                        }}
                        transition={{
                          duration: 4.0,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Inner subtle boundary ring */}
                      <div 
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{ 
                          border: `1px solid rgba(255, 255, 255, 0.08)`,
                          transform: 'translateZ(0)'
                        }}
                      />
                      <div 
                        className="relative flex flex-col items-end justify-center"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        {line2 ? (
                          <>
                            <span className="text-[10px] sm:text-[11px] text-white/55 font-medium tracking-wider leading-none mb-0.5 sm:mb-1">{line1}</span>
                            <span className="text-[14px] sm:text-[16px] leading-none tracking-widest font-bold">{line2}</span>
                          </>
                        ) : (
                          <span className="text-[14px] sm:text-[16px] leading-none tracking-widest font-bold">{line1}</span>
                        )}
                      </div>
                    </div>

                  </motion.div>

                  {/* Below the Line Section (Title + Description) */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      animate: { 
                        opacity: 1,
                        transition: {
                          duration: isNavDragging ? 0.04 : 0.7,
                          ease: [0.16, 1, 0.3, 1]
                        }
                      },
                      exit: { 
                        opacity: 0,
                        transition: {
                          duration: isNavDragging ? 0.04 : 0.22,
                          ease: "easeInOut"
                        }
                      }
                    }}
                    style={{
                      opacity: isHoldingBackground ? 0 : 1,
                      transition: 'opacity 0.25s ease-out',
                      pointerEvents: isHoldingBackground ? 'none' : 'auto'
                    }}
                    className="absolute top-full left-4 right-4 sm:left-6 sm:right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-[780px] lg:max-w-[900px] xl:max-w-[1080px] 2xl:max-w-[1240px] pt-7 sm:pt-5 md:pt-5 pb-8 sm:pb-8 md:pb-12 flex justify-center pointer-events-auto"
                  >
                    
                    {/* Main Row Container holding the Content Column and the Side Floating Navigation rail */}
                    <div className="w-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-row items-stretch relative">
                      
                      {/* Left: Content Column (Spans 100% width on mobile) */}
                      <div className="flex-1 flex flex-col items-start gap-7 sm:gap-8 md:gap-10">
                        {/* Display Title */}
                        <motion.h2 
                          variants={{
                            initial: { opacity: 0, y: isNavDragging ? 0 : 18 },
                            animate: { 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: isNavDragging ? 0 : 0.08,
                                opacity: { duration: isNavDragging ? 0.04 : 1.0, ease: [0.16, 1, 0.3, 1] },
                                y: { duration: isNavDragging ? 0.04 : 1.1, ease: [0.16, 1, 0.3, 1] }
                              }
                            },
                            exit: { 
                              opacity: 0, 
                              y: isNavDragging ? 0 : -8,
                              transition: {
                                opacity: { duration: isNavDragging ? 0.04 : 0.16, ease: "easeIn" },
                                y: { duration: isNavDragging ? 0.04 : 0.16, ease: "easeIn" }
                              }
                            }
                          }}
                          className="text-[21px] font-display font-bold text-white leading-[1.3] sm:text-[35px] sm:leading-[1.2] tracking-tight w-full sm:w-[920px] h-[5.2em] min-h-[5.2em] max-h-[5.2em] overflow-hidden line-clamp-4 sm:h-[3.6em] sm:min-h-[3.6em] sm:max-h-[3.6em] sm:line-clamp-3 text-justify"
                          dangerouslySetInnerHTML={{ __html: activeProcess.titulo }}
                        />

                        {/* Combined Cards + Mobile Bullet points container */}
                        <div className="w-full flex flex-row items-stretch gap-2.5 sm:gap-0">
                          {/* Three Transparent Topics Cards */}
                          {activeProcess.topicos && (
                            <div 
                              className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8 w-full pt-1 sm:pt-2.5"
                            >
                              {activeProcess.topicos.map((topico, tIdx) => {
                                 const TopicIcon = topico.icon;
                                 return (
                                  <motion.div 
                                    key={tIdx} 
                                    data-no-press-hold="true"
                                    variants={{
                                      initial: { opacity: 0, y: isNavDragging ? 0 : 16 },
                                      animate: {
                                        opacity: isHoldingBackground ? 0 : 1,
                                        y: 0,
                                        transition: {
                                          delay: isNavDragging ? 0 : 0.16 + tIdx * 0.1,
                                          opacity: { duration: isNavDragging ? 0.04 : 1.15, ease: [0.16, 1, 0.3, 1] },
                                          y: { duration: isNavDragging ? 0.04 : 1.25, ease: [0.16, 1, 0.3, 1] }
                                        }
                                      },
                                      exit: { 
                                        opacity: 0, 
                                        y: isNavDragging ? 0 : -8,
                                        transition: {
                                          opacity: { duration: isNavDragging ? 0.04 : 0.16, ease: "easeIn" },
                                          y: { duration: isNavDragging ? 0.04 : 0.16, ease: "easeIn" }
                                        }
                                      }
                                    }}
                                    className="w-full timeline-card bg-white/[0.04] border border-white/[0.08] p-2.5 xs:p-3 sm:p-4 rounded-xl text-left select-none flex flex-col gap-1 sm:gap-3"
                                  >
                                    {/* Header: Icon and Title on the side */}
                                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                                      {TopicIcon && (
                                        <div className="flex-shrink-0 text-white/95 bg-white/12 w-[30px] h-[30px] xs:w-[36px] xs:h-[36px] sm:w-[42px] sm:h-[42px] rounded-lg flex items-center justify-center">
                                          <TopicIcon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                                        </div>
                                      )}
                                      <h4 className="text-white font-semibold text-[15px] xs:text-[15.5px] sm:text-[17px] leading-snug flex-1">
                                        {topico.titulo}
                                      </h4>
                                    </div>
                                    
                                    {/* Description below */}
                                    <p className="text-white/75 text-[13.5px] xs:text-[13.5px] sm:text-[14px] font-bold leading-[1.4] w-full line-clamp-2 sm:line-clamp-3 h-[2.8em] sm:h-[4.2em] overflow-hidden">
                                      {topico.descricao}
                                    </p>
                                  </motion.div>
                                );
                              })}
                            </div>
                          )}

                          {/* MOBILE-ONLY Navigation Rail: Next to the cards, small, free-standing, no volume behind, no numbers! */}
                          <div 
                            data-no-press-hold="true"
                            onTouchStart={handleNavTouchStart}
                            onTouchMove={handleNavTouchMove}
                            onTouchEnd={handleNavTouchEnd}
                            onMouseDown={handleNavMouseDown}
                            className="flex sm:hidden flex-col justify-between items-center py-2 px-1.5 w-6 select-none pointer-events-auto touch-none cursor-pointer self-stretch min-h-[140px]"
                            style={{ 
                              height: 'auto',
                              opacity: isHoldingBackground ? 0 : 1,
                              transition: 'opacity 0.25s ease-out',
                              pointerEvents: isHoldingBackground ? 'none' : 'auto'
                            }}
                          >
                            {processos.map((proc, idx) => {
                              const isActive = idx === currentPageIndex;
                              return (
                                <div
                                  key={proc.numero}
                                  role="button"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToStep(idx);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      navigateToStep(idx);
                                    }
                                  }}
                                  className="group flex flex-col items-center justify-center w-full py-1 cursor-pointer relative focus:outline-none focus:ring-1 focus:ring-white/40 rounded-full"
                                  aria-label={`Ir para etapa ${proc.numero}`}
                                >
                                  <div className={`rounded-full transition-all duration-300 ${
                                    isActive 
                                      ? 'bg-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.9)] w-2 h-2' 
                                      : 'bg-white/30 hover:bg-white/75 hover:scale-110 w-1.5 h-1.5'
                                  }`} />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* DESKTOP-ONLY Side Navigation Dots: aligned absolute right, matching the right-end of the Section Name */}
                    <div 
                      data-no-press-hold="true"
                      onTouchStart={handleNavTouchStart}
                      onTouchMove={handleNavTouchMove}
                      onTouchEnd={handleNavTouchEnd}
                      onMouseDown={handleNavMouseDown}
                      className="hidden sm:flex absolute right-0 top-5 bottom-12 flex-col justify-between items-center py-2 w-10 select-none pointer-events-auto touch-none cursor-pointer z-50"
                      style={{ 
                        height: 'auto',
                        opacity: isHoldingBackground ? 0 : 1,
                        transition: 'opacity 0.25s ease-out',
                        pointerEvents: isHoldingBackground ? 'none' : 'auto'
                      }}
                    >
                      {processos.map((proc, idx) => {
                        const isActive = idx === currentPageIndex;
                        return (
                          <div
                            key={proc.numero}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToStep(idx);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.stopPropagation();
                                navigateToStep(idx);
                              }
                            }}
                            className="group flex items-center justify-center w-8 h-8 cursor-pointer relative transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/40 rounded-full"
                            aria-label={`Ir para etapa ${proc.numero}`}
                          >
                            <div className={`rounded-full transition-all duration-300 ${
                              isActive 
                                ? 'bg-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.9)] w-2 h-2' 
                                : 'bg-white/30 hover:bg-white/75 hover:scale-110 w-1.5 h-1.5'
                            }`} />
                          </div>
                        );
                      })}
                    </div>

                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
