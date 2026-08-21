/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import OrbitCarousel from "./ui/animated-carousel";
import { HeadlineSection } from "./ProjectsGallery";
import { TestimonialsSection } from "./TestimonialsSection";
import { VideoBackground } from "./VideoBackground";

interface AppProps {
  initialDark?: boolean;
}

export default function App({ initialDark = false }: AppProps) {
  // Configura o tema (padrão claro/branco por padrão, mas pronto para chavear para escuro)
  const [isDark] = useState<boolean>(initialDark);

  return (
    <div className={`relative w-full h-screen h-[100dvh] max-h-[100dvh] overflow-hidden transition-colors duration-300 font-sans flex flex-col justify-between ${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'}`}>
      
      {/* VÍDEO DE FUNDO ARQUITETÔNICO COM REPRODUÇÃO EM LOOP, MUTED E AUTOPLAY */}
      <VideoBackground isDark={isDark} />

      {/* LAYOUT PRINCIPAL TELA CHEIA: DISTRIBUIÇÃO EQUIDISTANTE COM ESPAÇO RESERVADO PARA O MENU NO TOPO */}
      <main className="relative z-10 w-full h-full flex-1 flex flex-col justify-between items-center pt-16 sm:pt-20 lg:pt-20 xl:pt-20 pb-5 sm:pb-6 lg:pb-7 xl:pb-8 px-0 overflow-hidden">
        
        {/* 1. SEÇÃO SUPERIOR: GALERIA DE IMAGENS 3D */}
        <section className="w-full flex-shrink-0">
          <OrbitCarousel isDark={isDark} />
        </section>

        {/* 2. SEÇÃO CENTRAL: HEADLINE & SUBTÍTULO CENTRALIZADOS NA PÁGINA */}
        <section className="w-full flex-shrink-0">
          <HeadlineSection isDark={isDark} />
        </section>

        {/* 3. SEÇÃO INFERIOR: CARROSSEL DE DEPOIMENTOS */}
        <section className="w-full flex-shrink-0">
          <TestimonialsSection isDark={isDark} />
        </section>

      </main>

    </div>
  );
}






