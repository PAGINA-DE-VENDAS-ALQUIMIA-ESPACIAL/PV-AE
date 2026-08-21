import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import testimonialsData from '../../data/testimonials.json';

interface Testimonial {
  id: string;
  name: string;
  stars?: number;
  rating?: number;
  text?: string;
  comment?: string;
}

interface TestimonialsSectionProps {
  isDark?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isDark = false }) => {
  const testimonialsList: Testimonial[] = testimonialsData as Testimonial[];

  // Triplicar a lista para permitir carrossel verdadeiramente infinito sem saltos
  const marqueeTestimonials = [
    ...testimonialsList,
    ...testimonialsList,
    ...testimonialsList,
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<number>(0);
  const BASE_SPEED = 0.68; // Velocidade dinâmica, fluida e ligeiramente mais rápida para depoimentos
  const speedRef = useRef<number>(BASE_SPEED);
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const userPausedRef = useRef<boolean | null>(null);
  const lastXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  // Loop principal de animação 60fps
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Estado de pausa: prioriza clique explícito do usuário, depois hover do mouse
      let isPaused = false;
      if (userPausedRef.current === true) {
        isPaused = true;
      } else if (userPausedRef.current === false) {
        isPaused = false;
      } else {
        isPaused = isHoveredRef.current;
      }

      if (isPaused) {
        // Desaceleração até parar completamente
        speedRef.current = speedRef.current * 0.8;
      } else if (!isDraggingRef.current) {
        // Retoma suavemente para a velocidade base confortável
        speedRef.current = speedRef.current * 0.92 + BASE_SPEED * 0.08;
      }

      // Desloca continuamente para a esquerda
      offsetRef.current -= speedRef.current * (delta * 60);

      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth / 3;
        if (totalWidth > 0) {
          if (offsetRef.current <= -totalWidth) {
            offsetRef.current += totalWidth;
          } else if (offsetRef.current > 0) {
            offsetRef.current -= totalWidth;
          }
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0px, 0px)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Handlers para arrastar e pausar/retomar com clique ou toque
  const handlePointerDown = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    lastXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    dragDistanceRef.current += Math.abs(deltaX);
    lastXRef.current = e.clientX;

    // Ajusta a posição instantaneamente acompanhando o dedo/mouse
    offsetRef.current += deltaX;
    // Ajusta a velocidade de inércia
    speedRef.current = Math.max(-25, Math.min(25, -deltaX * 1.5));
  };

  const handlePointerUp = (e?: React.PointerEvent) => {
    if (e && e.currentTarget) {
      try {
        if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        }
      } catch {}
    }

    // Clique/Toque simples sem arrasto: alterna o estado de pausa e retoma
    if (dragDistanceRef.current < 6) {
      if (userPausedRef.current === true) {
        userPausedRef.current = false;
      } else {
        userPausedRef.current = true;
      }
    }

    isDraggingRef.current = false;
  };

  return (
    <div 
      id="testimonials"
      className="w-full font-sans select-none pb-0"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { 
        isHoveredRef.current = false; 
        userPausedRef.current = null;
      }}
    >
      <div
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing py-1 sm:py-1.5 touch-none lg:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={trackRef} className="flex gap-4 sm:gap-4.5 lg:gap-3.5 xl:gap-3.5 w-max will-change-transform">
          {marqueeTestimonials.map((item, idx) => {
            const contentText = item.text || item.comment || "";
            const textLen = contentText.length;
            
            // Altura levemente maior no mobile para dar respiro e evitar qualquer corte no card do Cleyton, mantendo o desktop intacto
            const heightClass = 'h-[250px] sm:h-[255px] lg:h-[220px] xl:h-[230px]';

            // Largura ajustada para manter os cards curtos quadrados no mobile e acomodar bem os textos mais longos
            let widthClass = '';
            let fontSizeClass = '';

            if (textLen <= 65) {
              // Cards com texto muito curto (Tallita, Iara): formato quadrado, maior tamanho de fonte do intervalo (mas menor que o nome do cliente 14px/16px)
              widthClass = 'w-[250px] sm:w-[255px] lg:w-[235px] xl:w-[245px]';
              fontSizeClass = 'text-[13.5px] sm:text-[15.2px] lg:text-[14.8px] xl:text-[15.2px] leading-[1.58]';
            } else if (textLen <= 110) {
              // Cards com pouco texto (Naia, Geicy): formato quadrado, fonte média-alta
              widthClass = 'w-[250px] sm:w-[255px] lg:w-[235px] xl:w-[245px]';
              fontSizeClass = 'text-[13.2px] sm:text-[14.4px] lg:text-[14px] xl:text-[14.5px] leading-relaxed';
            } else if (textLen <= 200) {
              // Expansão moderada (Tércio)
              widthClass = 'w-[285px] max-w-[82vw] sm:w-[310px] sm:max-w-none lg:w-[300px] xl:w-[320px]';
              fontSizeClass = 'text-[13px] sm:text-[13.8px] lg:text-[13.5px] xl:text-[13.8px] leading-[1.45]';
            } else if (textLen <= 330) {
              // Expansão para textos longos (Diana, Marilene) - menor tamanho de fonte do intervalo
              widthClass = 'w-[325px] max-w-[88vw] sm:w-[360px] sm:max-w-none lg:w-[360px] xl:w-[390px]';
              fontSizeClass = 'text-[12.5px] sm:text-[13px] lg:text-[13px] xl:text-[13.2px] leading-[1.4]';
            } else {
              // Expansão para textos extremamente longos (Cleyton) - menor tamanho de fonte do intervalo
              widthClass = 'w-[355px] max-w-[92vw] sm:w-[400px] sm:max-w-none lg:w-[420px] xl:w-[450px]';
              fontSizeClass = 'text-[12.5px] sm:text-[13px] lg:text-[13px] xl:text-[13.2px] leading-[1.38]';
            }

            return (
              <motion.div
                key={`${item.id}-${idx}`}
                whileHover={{ scale: 1.02 }}
                className={`flex-shrink-0 ${widthClass} ${heightClass} rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-4.5 pb-4 sm:pb-5 lg:pb-5 flex flex-col justify-start gap-2 transition-all select-none ${
                  isDark
                    ? 'bg-[#121214] shadow-xl'
                    : 'bg-white shadow-sm hover:shadow-md'
                }`}
              >
                {/* Estrelas + Nome */}
                <div className="shrink-0">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(item.stars || item.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Nome do Cliente */}
                  <h3 className={`text-sm sm:text-base font-bold tracking-tight leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.name}
                  </h3>
                </div>

                {/* Texto do Depoimento com tamanho de fonte dinâmico (maior para textos curtos) */}
                <div className="flex-1 min-h-0 pt-0.5 flex items-start overflow-hidden">
                  <p className={`${fontSizeClass} font-normal text-justify w-full ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    “{contentText}”
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
