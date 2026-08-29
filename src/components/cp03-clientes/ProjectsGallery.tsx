import React from 'react';
import { motion } from 'motion/react';
import OrbitCarousel from './ui/animated-carousel';

interface ProjectsGalleryProps {
  isDark?: boolean;
}

export const HeadlineSection: React.FC<ProjectsGalleryProps> = ({ isDark = false }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="w-full flex flex-col items-center justify-center"
      >
        <h1 className={`tracking-tight text-center max-w-[360px] sm:max-w-[700px] mx-auto text-[27px] sm:text-[39px] leading-[1.08] sm:leading-[1.10] ${
          isDark 
            ? 'text-white [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]' 
            : 'text-slate-950 [text-shadow:_0_1px_8px_rgba(255,255,255,0.9)]'
        }`}>
          <div className="leading-[1.08] sm:leading-[1.10]">
            <span className="font-cargiona font-normal">Ideias</span> <span className="font-serif italic font-normal">cocriadas</span>.
          </div>
          <div className="leading-[1.08] sm:leading-[1.10] -mt-1 sm:-mt-2">
            <span className="font-cargiona font-normal">Espaços</span> <span className="font-serif italic font-normal">transformados</span>.
          </div>
        </h1>
        <p className={`mt-1.5 mb-1 text-[14px] sm:text-[15px] font-medium leading-[1.38] sm:leading-snug text-center max-w-[365px] sm:max-w-[640px] mx-auto ${
          isDark 
            ? 'text-neutral-200 [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)]' 
            : 'text-slate-800 [text-shadow:_0_1px_6px_rgba(255,255,255,0.9)]'
        }`}>
          Ao longo das sessões, ideias dispersas ganharam clareza até se<br className="hidden sm:inline" /> transformarem em escolhas que pareciam naturais para cada cliente.
        </p>
      </motion.div>
    </div>
  );
};

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ isDark = false }) => {
  return (
    <div className="w-full font-sans flex flex-col items-center gap-4">
      <div className="w-full overflow-hidden">
        <OrbitCarousel isDark={isDark} />
      </div>
      <HeadlineSection isDark={isDark} />
    </div>
  );
};





