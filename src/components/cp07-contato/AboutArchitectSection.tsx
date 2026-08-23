import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import emblemaImg from '../../assets/Emblema.png';
import brendonCL from '../../assets/Brendon CL.png';
import brendonPB from '../../assets/Brendon PB.png';
import { GradientBars } from './ui/GradientBars';

interface AboutArchitectSectionProps {
  className?: string;
}

const TOPICS = [
  {
    title: 'PERCEPÇÃO APURADA',
  },
  {
    title: 'COCRIAÇÃO EMPÁTICA',
  },
  {
    title: 'PROJETO AUTORAL',
  },
] as const;

export const AboutArchitectSection: React.FC<AboutArchitectSectionProps> = ({
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isColorClicked, setIsColorClicked] = useState<boolean>(false);
  const [spinAngle, setSpinAngle] = useState<number>(0);
  const [isMobileExpanded, setIsMobileExpanded] = useState<boolean>(false);

  // Active state: photo is color if hovered OR if user clicked to toggle color
  const isColor = isHovered || isColorClicked;

  const handleToggleColor = useCallback(() => {
    setIsColorClicked(prev => !prev);
    // Spin emblem 3 full rotations (1080 deg) smoothly around vertical Y-axis
    setSpinAngle(prev => prev + 1080);
  }, []);

  return (
    <section 
      id="secao-sobre-o-arquiteto" 
      className={`relative w-full pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-3.5 sm:px-6 overflow-hidden bg-white flex justify-center items-center font-['DM_Sans'] transition-colors duration-300 ${className}`}
    >
      {/* Background Olive Green GradientBars - Light Olive (#C8AF52) */}
      <GradientBars
        numBars={19}
        gradientFrom="#C8AF52"
        gradientTo="#ffffff"
        animationDuration={2.2}
        className="opacity-95"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto pb-0">
        {/* Main Hero Container Card - Always White Light Mode Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-white border border-stone-200 shadow-xl backdrop-blur-xl transition-colors duration-300 min-h-0 lg:min-h-[500px]"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-12 items-stretch min-h-0 lg:min-h-[460px]">
            
            {/* Photo & Emblem Side - Left in Desktop (Cols 1-5), Top in Mobile (Order 1) */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full lg:col-start-1 lg:col-span-5 relative flex items-end justify-end sm:justify-center lg:justify-center aspect-[3/4] sm:aspect-auto h-[440px] xs:h-[480px] sm:h-[500px] lg:h-auto min-h-0 sm:min-h-[500px] lg:min-h-full overflow-visible p-0 order-1 lg:order-1 bg-transparent [perspective:1000px]"
            >
              
              {/* EMBLEM ATRÁS DA FOTO (Z-0) - Light Olive Green (#C8AF52) */}
              {/* MOBILE EMBLEM */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute inset-0 flex items-start justify-center pointer-events-none select-none z-0 p-0 lg:hidden"
              >
                <div
                  style={{
                    transformOrigin: 'top center',
                    transform: `rotateY(${spinAngle}deg) scale(1.3) translate3d(0,0,0)`,
                    transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    WebkitMaskImage: `url(${emblemaImg})`,
                    maskImage: `url(${emblemaImg})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'top center',
                    maskPosition: 'top center',
                  }}
                  className="w-[330px] xs:w-[370px] h-[390px] xs:h-[430px] bg-[#C8AF52] opacity-95 -translate-y-2 sm:-translate-y-4"
                />
              </motion.div>

              {/* DESKTOP EMBLEM */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="hidden lg:flex absolute inset-0 items-start justify-center pointer-events-none select-none z-0 pt-1"
              >
                <div
                  style={{
                    transformOrigin: 'top center',
                    transform: `rotateY(${spinAngle}deg) scale(1.45) translate3d(0,0,0)`,
                    transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    WebkitMaskImage: `url(${emblemaImg})`,
                    maskImage: `url(${emblemaImg})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'top center',
                    maskPosition: 'top center',
                  }}
                  className="w-[380px] h-[460px] max-w-none max-h-none bg-[#C8AF52] opacity-95"
                />
              </motion.div>

              {/* FOTO DO ARQUITETO NA FRENTE (Z-10) COM ONDAS DE LUZ SUAVES */}
              <div 
                className="relative z-10 w-full h-full flex items-end justify-end sm:justify-center lg:justify-center cursor-pointer group/photo select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleToggleColor}
                title="Passe o mouse para ver colorido, clique para alternar Preto e Branco"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggleColor();
                  }
                }}
                aria-label="Alternar exibição de cor da foto e girar emblema"
              >
                {/* Ondas de Luz Branca Suave - Estáticas no Mobile para Performance */}
                <div className="absolute right-2 bottom-4 w-[85%] h-[80%] sm:w-[80%] sm:h-[80%] sm:left-1/2 sm:-translate-x-1/2 rounded-full bg-white/70 blur-2xl sm:blur-3xl pointer-events-none -z-10" />
                <div className="absolute right-0 bottom-2 w-[95%] h-[85%] sm:w-[90%] sm:h-[85%] sm:left-1/2 sm:-translate-x-1/2 rounded-full bg-white/50 blur-3xl pointer-events-none -z-10" />
                
                <div className="relative w-full h-full sm:h-[460px] lg:h-[510px] max-w-full sm:max-w-[500px] lg:max-w-[520px] flex items-end justify-end sm:justify-center lg:justify-center overflow-hidden">
                  {/* Imagem P&B Base */}
                  <img
                    src={brendonPB}
                    alt="Foto de José de Alencar (Preto e Branco)"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain sm:object-cover object-right-bottom sm:object-top scale-[0.90] sm:scale-100 origin-bottom-right transition-transform duration-300"
                  />

                  {/* Imagem Colorida por Cima */}
                  <img
                    src={brendonCL}
                    alt="Foto de José de Alencar (Colorido)"
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-contain sm:object-cover object-right-bottom sm:object-top scale-[0.90] sm:scale-100 origin-bottom-right transition-opacity duration-300 ${
                      isColor ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

              </div>

            </motion.div>

            {/* Text Side - Right in Desktop (Cols 6-12), Bottom in Mobile (Order 2) */}
            <motion.div 
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full lg:col-start-6 lg:col-span-7 p-3 sm:p-7 lg:p-8 flex flex-col justify-between z-10 space-y-1.5 sm:space-y-5 order-2 lg:order-2"
            >
              
              {/* Header, Bio & Mission/Vision Content */}
              <div className="space-y-1.5 sm:space-y-5">
                
                {/* Eyebrow & Headline */}
                <div className="flex flex-row items-center justify-between w-full gap-2">
                  <span className="text-xs xs:text-sm sm:text-base font-['DM_Sans'] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#C8AF52] font-bold text-left shrink-0">
                    ARQUITETO
                  </span>
                  <h2 className="text-3xl xs:text-4xl sm:text-4xl lg:text-5xl font-['Playfair_Display'] italic font-medium tracking-tight text-stone-900 leading-[1.1] text-right">
                    José de Alencar
                  </h2>
                </div>

                {/* Desktop Version: Always Visible */}
                <div className="hidden sm:block space-y-5">
                  <p className="text-stone-800 text-sm xs:text-base sm:text-base lg:text-lg font-normal leading-relaxed text-justify font-['DM_Sans']">
                    Formado pela FADIC (Recife/PE), desenvolveu o Alquimia Espacial para transformar o projeto arquitetônico em um processo de descoberta compartilhada. Mais do que apresentar soluções, conduz cada cliente por uma jornada de percepção, escolhas conscientes e decisões que fazem sentido para a realidade de quem vai viver o espaço.
                  </p>

                  <div className="flex flex-col space-y-3 sm:space-y-4 pt-3.5 sm:pt-4 border-t border-stone-200">
                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm uppercase tracking-widest font-['DM_Sans'] text-[#C8AF52] font-bold block">
                        MISSÃO
                      </span>
                      <p className="text-sm xs:text-base sm:text-base lg:text-lg text-stone-800 font-normal leading-relaxed text-justify font-['DM_Sans']">
                        Transformar dúvidas em clareza, para que cada decisão arquitetônica nasça da compreensão do espaço e das pessoas que o habitam.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm uppercase tracking-widest font-['DM_Sans'] text-[#C8AF52] font-bold block">
                        VISÃO
                      </span>
                      <p className="text-sm xs:text-base sm:text-base lg:text-lg text-stone-800 font-normal leading-relaxed text-justify font-['DM_Sans']">
                        Tornar a arquitetura mais acessível, participativa e consciente, para que mais pessoas possam construir com segurança e propósito.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Version: Hardware Accelerated CSS Grid Accordion */}
                <div className="sm:hidden">
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isMobileExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden space-y-3.5 pb-1">
                      <p className="text-stone-800 text-sm font-normal leading-relaxed text-justify font-['DM_Sans'] pt-1">
                        Formado pela FADIC (Recife/PE), desenvolveu o Alquimia Espacial para transformar o projeto arquitetônico em um processo de descoberta compartilhada. Mais do que apresentar soluções, conduz cada cliente por uma jornada de percepção, escolhas conscientes e decisões que fazem sentido para a realidade de quem vai viver o espaço.
                      </p>

                      <div className="flex flex-col space-y-3 pt-3.5 border-t border-stone-200">
                        <div className="space-y-1">
                          <span className="text-xs uppercase tracking-widest font-['DM_Sans'] text-[#C8AF52] font-bold block">
                            MISSÃO
                          </span>
                          <p className="text-sm xs:text-base text-stone-800 font-normal leading-relaxed text-justify font-['DM_Sans']">
                            Transformar dúvidas em clareza, para que cada decisão arquitetônica nasça da compreensão do espaço e das pessoas que o habitam.
                          </p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-xs uppercase tracking-widest font-['DM_Sans'] text-[#C8AF52] font-bold block">
                            VISÃO
                          </span>
                          <p className="text-sm xs:text-base text-stone-800 font-normal leading-relaxed text-justify font-['DM_Sans']">
                            Tornar a arquitetura mais acessível, participativa e consciente, para que mais pessoas possam construir com segurança e propósito.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Divider line with centered mobile expand arrow on top */}
              <div className="relative mt-2 sm:mt-0 pt-3 sm:pt-4 border-t border-stone-200">
                {/* Mobile Button directly centered on top of the line */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 sm:hidden z-10">
                  <button
                    type="button"
                    onClick={() => setIsMobileExpanded(prev => !prev)}
                    className="w-7 h-7 rounded-full bg-white border border-stone-300 shadow-sm active:scale-90 transition-transform duration-150 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8AF52] touch-manipulation"
                    aria-label={isMobileExpanded ? "Ocultar detalhes sobre o arquiteto" : "Ver detalhes sobre o arquiteto"}
                    aria-expanded={isMobileExpanded}
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-stone-700 stroke-[2.5] transition-transform duration-300 ease-out ${
                        isMobileExpanded ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Three Interactive Cards / Pill Badges */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3.5 pt-3 sm:pt-0">
                  {TOPICS.map((topic) => (
                    <motion.div 
                      key={topic.title}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center justify-center px-1 xs:px-2 py-2 sm:px-3 sm:py-1.5 lg:py-2 rounded-full bg-[#C8AF52]/85 hover:bg-[#C8AF52] border border-[#C8AF52] shadow-sm transition-all duration-200 cursor-pointer select-none text-center"
                    >
                      <span className="text-white font-['DM_Sans'] font-extrabold uppercase tracking-tight xs:tracking-wider text-[10px] xs:text-[11px] sm:text-xs lg:text-sm leading-tight text-center whitespace-nowrap">
                        {topic.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};




