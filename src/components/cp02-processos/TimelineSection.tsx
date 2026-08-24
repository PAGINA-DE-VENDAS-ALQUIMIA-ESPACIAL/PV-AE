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

const getBadgeColors = (categoria: string) => {
  const cat = categoria.toUpperCase();
  if (cat.includes("BLOCO 01") || cat.includes("BLOCO 1")) {
    return {
      bg: "#F4F6F9",
      text: "#1F2937",
      icon: LogIn
    };
  }
  if (cat.includes("BLOCO 02") || cat.includes("BLOCO 2")) {
    return {
      bg: "#C99A1C",
      text: "#111827",
      icon: Palette
    };
  }
  if (cat.includes("BLOCO 03") || cat.includes("BLOCO 3")) {
    return {
      bg: "#606C38",
      text: "#F8FAFC",
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
    const t = (scrollPos - prevCenter) / 0.5;
    return 100 - t * (100 - lineY);
  } else {
    const dt = thisCenter - idx;
    const t = (scrollPos - idx) / dt;
    return lineY - t * lineY;
  }
};

export default function TimelineSection() {
  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const [lineYPercent, setLineYPercent] = useState(30);
  const [isMobile, setIsMobile] = useState(false);
  const [isBlockPinned, setIsBlockPinned] = useState(false);
  const [isPhasePinned, setIsPhasePinned] = useState(false);

  const [isNavDragging, setIsNavDragging] = useState(false);
  const [isHoldingBackground, setIsHoldingBackground] = useState(false);
  const [areCardsHidden, setAreCardsHidden] = useState(false);

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
  const explanationTimerRef = useRef<number | null>(null);
  const cardsTimerRef = useRef<number | null>(null);

  const triggerBlockExplanation = useCallback(() => {
    if (explanationTimerRef.current) clearTimeout(explanationTimerRef.current);
    setIsBlockPinned((prev) => {
      const next = !prev;
      if (next) {
        setIsPhasePinned(false);
        explanationTimerRef.current = window.setTimeout(() => {
          setIsBlockPinned(false);
          explanationTimerRef.current = null;
        }, 3000);
      }
      return next;
    });
  }, []);

  const triggerPhaseExplanation = useCallback(() => {
    if (explanationTimerRef.current) clearTimeout(explanationTimerRef.current);
    setIsPhasePinned((prev) => {
      const next = !prev;
      if (next) {
        setIsBlockPinned(false);
        explanationTimerRef.current = window.setTimeout(() => {
          setIsPhasePinned(false);
          explanationTimerRef.current = null;
        }, 3000);
      }
      return next;
    });
  }, []);

  const triggerToggleCards = useCallback(() => {
    if (cardsTimerRef.current) clearTimeout(cardsTimerRef.current);
    setAreCardsHidden((prev) => {
      const next = !prev;
      if (next) {
        cardsTimerRef.current = window.setTimeout(() => {
          setAreCardsHidden(false);
          cardsTimerRef.current = null;
        }, 3000);
      }
      return next;
    });
  }, []);

  const mouseMoveHandlerRef = useRef<((ev: globalThis.MouseEvent) => void) | null>(null);
  const mouseUpHandlerRef = useRef<(() => void) | null>(null);

  const smoothScrollTo = useCallback((targetY: number, duration = 750) => {
    const startY = window.scrollY || document.documentElement.scrollTop;
    const difference = targetY - startY;
    const startTime = performance.now();

    const run = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progressRatio = Math.min(timeElapsed / duration, 1);
      
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
      const rect = dragContainerRectRef.current;
      const relativeY = touchStartYRef.current - rect.top;
      const percent = Math.max(0, Math.min(1, relativeY / rect.height));
      const targetIdx = Math.max(0, Math.min(processos.length - 1, Math.floor(percent * processos.length)));
      
      navigateToStep(targetIdx, false);
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

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        window.clearTimeout(holdTimerRef.current);
      }
      if (explanationTimerRef.current) {
        window.clearTimeout(explanationTimerRef.current);
      }
      if (cardsTimerRef.current) {
        window.clearTimeout(cardsTimerRef.current);
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
        setLineYPercent(30);
      } else {
        setLineYPercent(35);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number | null = null;
    let isLooping = false;

    const applyTransforms = (scrollPos: number) => {
      for (let idx = 0; idx < 6; idx++) {
        const outer = slideOuterRefs.current[idx];
        const inner = slideInnerRefs.current[idx];
        if (outer && inner) {
          const translateY = getSlideTranslateY(idx, scrollPos, lineYPercent);
          outer.style.transform = `translate3d(0, ${translateY}%, 0)`;
          inner.style.transform = `translate3d(0, ${-translateY}%, 0)`;
          if (idx > 0 && translateY >= 99.9) {
            outer.style.visibility = 'hidden';
          } else {
            outer.style.visibility = 'visible';
          }
        }
      }

      if (progressBarFillRef.current) {
        const barPercent = Math.max(0, Math.min(100, (scrollPos / 6.0) * 100));
        progressBarFillRef.current.style.width = `${barPercent}%`;
      }
    };

    const updateInterpolation = () => {
      const diff = targetProgress.current - currentProgress.current;
      
      if (Math.abs(diff) > 0.0001) {
        const factor = isDraggingRef.current ? 1.0 : (isMobile ? 0.48 : 0.30);
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

      if (Math.abs(targetProgress.current - currentProgress.current) > 0.0001) {
        animationFrameId = requestAnimationFrame(updateInterpolation);
      } else {
        isLooping = false;
        animationFrameId = null;
      }
    };

    const handleScroll = () => {
      if (areCardsHidden) {
        setAreCardsHidden(false);
      }
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
  }, [updateWrapperMetrics, isMobile, lineYPercent, areCardsHidden]);

  const activeProcess = processos[currentPageIndex !== null ? currentPageIndex : 0];
  const secaoParts = activeProcess.secao.split(/\s*•\s*/);
  const line1 = secaoParts[0] || "";
  const line2 = secaoParts[1] || "";

  const isHidden = isHoldingBackground;

  const activeExplanationText = isHoldingBackground
    ? null
    : isBlockPinned 
    ? blockExplanations[activeProcess.categoria]
    : isPhasePinned 
    ? phaseExplanations[activeProcess.secao]
    : null;

  return (
    <div id="timeline-scroll-wrapper" className="relative w-full h-[1200vh] sm:h-[1300vh] bg-transparent">
      
      {/* Full-screen backdrop to restore cards when hidden */}
      {areCardsHidden && (
        <div 
          className="fixed inset-0 z-20 cursor-pointer pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            if (cardsTimerRef.current) clearTimeout(cardsTimerRef.current);
            setAreCardsHidden(false);
          }}
          aria-label="Toque para reexibir os cards"
        />
      )}

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
        
        {/* Top headline / Active explanation area */}
        <div 
          className="absolute top-22 xs:top-26 sm:top-16 md:top-20 lg:top-24 left-0 w-full z-30 px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-center text-center pointer-events-auto min-h-[58px]"
          style={{
            opacity: isHidden ? 0 : 1,
            transition: 'opacity 0.25s ease-out',
            pointerEvents: isHidden ? 'none' : 'auto'
          }}
        >
          <AnimatePresence mode="wait">
            {activeExplanationText ? (
              <motion.div
                key={`explanation-${activeProcess.numero}-${isBlockPinned ? 'block' : 'phase'}`}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto flex items-center justify-center cursor-pointer px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (explanationTimerRef.current) clearTimeout(explanationTimerRef.current);
                  setIsBlockPinned(false);
                  setIsPhasePinned(false);
                }}
              >
                <p className="text-white/95 text-center font-cargiona text-[15px] xs:text-[16px] sm:text-[18px] md:text-[19.5px] lg:text-[21px] font-normal leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-full sm:whitespace-nowrap [text-wrap:balance]">
                  {activeExplanationText}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="main-headline"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <a 
                  href="#timeline-scroll-wrapper" 
                  aria-label="Conheça o processo por trás do seu projeto"
                  className="font-cargiona font-normal tracking-normal text-center select-none max-w-full text-[23px] xs:text-[25px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[40px] leading-[1.08] sm:leading-[1.10] drop-shadow-md block cursor-pointer text-white/90"
                >
                  <span className="block whitespace-nowrap">
                    Conheça o{" "}
                    <span className="timeline-font-editorial font-editorial italic font-normal text-white tracking-wide">
                      processo
                    </span>
                  </span>
                  <span className="block whitespace-nowrap -mt-1 sm:-mt-1 md:-mt-1.5 lg:-mt-2">
                    por trás do{" "}
                    <span className="timeline-font-editorial font-editorial italic font-normal text-white tracking-wide">
                      seu projeto
                    </span>
                    .
                  </span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
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
            opacity: isHidden ? 0 : 1,
            transition: 'opacity 0.25s ease-out'
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
                    style={{
                      opacity: isHidden ? 0 : 1,
                      transition: 'opacity 0.25s ease-out',
                      pointerEvents: isHidden ? 'none' : 'auto'
                    }}
                    className="absolute bottom-full left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-[780px] lg:max-w-[900px] xl:max-w-[1080px] 2xl:max-w-[1240px] pb-4 sm:pb-3 flex items-center justify-between pointer-events-auto"
                  >
                    
                    {/* Category Badge (Block) on the Left */}
                    {(() => {
                      const badge = getBadgeColors(activeProcess.categoria);
                      const IconComponent = badge.icon;
                      const blocoParts = activeProcess.categoria.split(/\s*•\s*/);
                      const blocoTop = blocoParts[0] || "";
                      const blocoBottom = blocoParts[1] || "";
                      
                      return (
                        <div 
                          data-timeline-no-press-hold="true"
                          data-no-press-hold="true"
                          role="button"
                          tabIndex={0}
                          aria-label={`Categoria ${activeProcess.categoria}. Clique para ver explicação`}
                          className="relative select-none flex-shrink-0 pointer-events-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerBlockExplanation();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              triggerBlockExplanation();
                            }
                          }}
                        >
                          <div 
                            className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm transition-all duration-300 pointer-events-auto"
                            style={{ 
                              backgroundColor: badge.bg,
                              color: badge.text
                            }}
                          >
                            <div className="flex-shrink-0">
                              <IconComponent className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
                            </div>
                            <div className="flex flex-col items-start leading-none">
                              <span className="text-[10px] sm:text-[10.5px] font-dmsans font-semibold tracking-widest uppercase opacity-80 mb-0.5 sm:mb-1">
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

                    {/* Section Name (Page Title) on the right end of the line */}
                    <div 
                      data-timeline-no-press-hold="true"
                      data-no-press-hold="true"
                      role="button"
                      tabIndex={0}
                      aria-label={`Fase ${activeProcess.secao}. Clique para ver explicação`}
                      className="relative font-display font-semibold text-right flex flex-col justify-center items-end px-3.5 sm:px-5 rounded-lg text-white/95 uppercase select-none transition-all duration-300 pointer-events-auto cursor-pointer h-[44px] sm:h-[50px] md:h-[54px] hover:bg-white/[0.02] focus:outline-none focus:ring-2 focus:ring-white/40"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerPhaseExplanation();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          triggerPhaseExplanation();
                        }
                      }}
                    >
                      {/* Top Mini Tag & Subtitle */}
                      <div 
                        data-timeline-no-press-hold="true"
                        data-no-press-hold="true"
                        className="flex flex-col items-end pointer-events-none"
                      >
                        {line2 ? (
                          <>
                            <span className="text-[10px] sm:text-[11px] text-white/70 font-dmsans font-semibold tracking-wider uppercase leading-none mb-0.5 sm:mb-1">{line1}</span>
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
                      initial: { opacity: 1 },
                      animate: { 
                        opacity: 1, 
                        transition: {
                          duration: isNavDragging ? 0.04 : 0.15,
                          ease: "easeOut"
                        }
                      },
                      exit: { 
                        opacity: 0, 
                        transition: {
                          duration: isNavDragging ? 0.04 : 0.12,
                          ease: "easeInOut"
                        }
                      }
                    }}
                    style={{
                      opacity: isHidden ? 0 : 1,
                      transition: 'opacity 0.25s ease-out',
                      pointerEvents: isHidden ? 'none' : 'auto'
                    }}
                    className="absolute top-full left-4 right-4 sm:left-6 sm:right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-[780px] lg:max-w-[900px] xl:max-w-[1080px] 2xl:max-w-[1240px] pt-5 sm:pt-5 md:pt-5 pb-12 sm:pb-8 md:pb-12 flex justify-center pointer-events-auto"
                  >
                    
                    {/* Main Row Container holding the Content Column and the Side Floating Navigation rail */}
                    <div className="w-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] flex flex-row items-stretch relative">
                      
                      {/* Left: Content Column (Spans 100% width on mobile) */}
                      <div className="flex-1 flex flex-col items-start gap-4 xs:gap-5 sm:gap-8 md:gap-10">
                        {/* Display Title */}
                        <motion.h2 
                          role="button"
                          tabIndex={0}
                          aria-label="Alternar visibilidade dos cards"
                          title="Clique para alternar visibilidade dos cards"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerToggleCards();
                          }}
                          variants={{
                            initial: { opacity: 0, y: isNavDragging ? 0 : 18 },
                            animate: { 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: isNavDragging ? 0 : 0.04,
                                opacity: { duration: isNavDragging ? 0.04 : 0.35, ease: "easeOut" },
                                y: { duration: isNavDragging ? 0.04 : 0.4, ease: "easeOut" }
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
                          className="text-[21px] font-cargiona font-bold text-white leading-[1.3] sm:text-[35px] sm:leading-[1.2] tracking-tight w-full sm:w-[920px] h-[5.2em] min-h-[5.2em] max-h-[5.2em] overflow-hidden line-clamp-4 sm:h-[3.6em] sm:min-h-[3.6em] sm:max-h-[3.6em] sm:line-clamp-3 text-justify cursor-pointer select-none"
                          dangerouslySetInnerHTML={{ __html: activeProcess.titulo }}
                        />

                        {/* Combined Cards + Mobile Bullet points container */}
                        <div 
                          className="w-full flex flex-row items-stretch gap-2.5 sm:gap-0 transition-opacity duration-300"
                          style={{
                            opacity: areCardsHidden || isHoldingBackground ? 0 : 1,
                            pointerEvents: areCardsHidden || isHoldingBackground ? 'none' : 'auto'
                          }}
                        >
                          {/* Three Transparent Topics Cards */}
                          {activeProcess.topicos && (
                            <div 
                              data-timeline-no-press-hold="true"
                              data-no-press-hold="true"
                              className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 pointer-events-auto"
                            >
                              {activeProcess.topicos.map((topico, tIdx) => {
                                const TopicIcon = topico.icon;
                                return (
                                  <motion.div
                                    key={tIdx} 
                                    data-no-press-hold="true"
                                    variants={{
                                      initial: { opacity: 1, y: 0 },
                                      animate: { 
                                        opacity: 1, 
                                        y: 0,
                                        transition: {
                                          duration: isNavDragging ? 0.04 : 0.15,
                                          ease: "easeOut"
                                        }
                                      },
                                      exit: { 
                                        opacity: 0, 
                                        transition: {
                                          opacity: { duration: isNavDragging ? 0.04 : 0.12, ease: "easeIn" }
                                        }
                                      }
                                    }}
                                    className="timeline-card rounded-xl p-3 sm:p-4 text-left transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] flex flex-row sm:flex-col items-center sm:items-start gap-2.5 sm:gap-2 pointer-events-auto"
                                  >
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/90 shrink-0">
                                      <TopicIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <h4 className="text-[13px] sm:text-[14px] font-cargiona font-semibold text-white tracking-wide truncate">
                                        {topico.titulo}
                                      </h4>
                                      <p className="text-[11px] sm:text-[12px] font-dmsans text-white/70 leading-tight mt-0.5 line-clamp-2">
                                        {topico.descricao}
                                      </p>
                                    </div>
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
