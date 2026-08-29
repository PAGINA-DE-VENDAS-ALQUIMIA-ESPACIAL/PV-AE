import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, MessageCircle, Globe } from 'lucide-react';
import tipografiaHorizontal from '../../assets/Tipografia Horizontal.png';
import { GradientBars } from './ui/GradientBars';

interface FooterSectionProps {
  className?: string;
}

const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://www.instagram.com/josedealencar.ae', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://whatsapp.com', label: 'WhatsApp' },
  { icon: Youtube, href: 'https://www.youtube.com/@AlquimiaEspacial', label: 'YouTube' },
  { icon: Globe, href: '#', label: 'Website' },
] as const;

export const FooterSection: React.FC<FooterSectionProps> = ({
  className = '',
}) => {
  return (
    <footer 
      id="secao-rodape" 
      className={`w-full bg-white relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 font-['DM_Sans'] transition-colors duration-300 ${className}`}
    >
      {/* Background Red GradientBars in Footer (#E25236) */}
      <GradientBars
        numBars={21}
        gradientFrom="#E25236"
        gradientTo="#ffffff"
        direction="top"
        minHeight={68}
        animationDuration={2}
        className="opacity-95"
      />

      {/* Main Compact White Footer Card with same max-width as Architect section card (max-w-6xl) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 overflow-hidden rounded-3xl bg-white border border-stone-200 text-stone-900 p-3.5 sm:p-6 lg:p-7 shadow-xl max-w-6xl mx-auto flex flex-col justify-between gap-2 sm:gap-3"
      >
        
        {/* Top Section: Tagline on the left & Social Icons on the right */}
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-6 pb-2.5 sm:pb-3.5 border-b border-stone-200">
          
          {/* Tagline / Headline on the left - single line on mobile */}
          <h2 className="text-[14px] sm:text-[24px] lg:text-[28px] font-normal text-stone-900 tracking-tight leading-snug flex-1 lg:flex-none lg:w-[650px] mr-1.5 sm:mr-[15px] lg:ml-[55px] whitespace-nowrap font-cargiona">
            Seu <span className="font-serif italic font-medium">espaço.</span> Sua <span className="font-serif italic font-medium">essência.</span> Seu <span className="font-serif italic font-medium">projeto.</span>
          </h2>

          {/* Right Column: 4 Social Media Icons horizontally aligned */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {SOCIAL_LINKS.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-700 flex items-center justify-center transition-all duration-200 shadow-sm focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:outline-none"
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Horizontal Typography Branding + Centered Copyright */}
        <div className="flex flex-col items-center justify-center relative pt-0.5">
          
          {/* Horizontal Typography image enlarged horizontally by cropping side padding */}
          <div className="w-full overflow-hidden select-none flex justify-center items-center my-0.5">
            <img 
              src={tipografiaHorizontal} 
              alt="Tipografia Horizontal Alquimia Espacial" 
              decoding="async"
              loading="lazy"
              className="w-full object-contain filter drop-shadow-sm transition-all duration-300 scale-[1.22] sm:scale-[1.28] h-[55px] xs:h-[75px] sm:h-[115px] lg:h-[130px]"
            />
          </div>

          {/* Centered Copyright text */}
          <p className="text-[10px] sm:text-xs text-stone-500 font-medium text-center w-full pt-0.5">
            © 2026 ALQUIMIA ESPACIAL. Todos os direitos reservados.
          </p>
        </div>

      </motion.div>
    </footer>
  );
};


