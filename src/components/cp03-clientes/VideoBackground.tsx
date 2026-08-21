import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  isDark?: boolean;
  className?: string;
  overlayOpacity?: number;
  playbackSpeed?: number;
}

export function VideoBackground({
  isDark = false,
  className = '',
  overlayOpacity,
  playbackSpeed = 0.55,
}: VideoBackgroundProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = 'https://res.cloudinary.com/j4moon9r/video/upload/v1785269177/Architectural_Model_rtmcjf.mp4';

  // Opacidade calibrada para manter o vídeo visível e transparente no fundo
  const defaultOpacity = overlayOpacity ?? (isDark ? 0.35 : 0.25);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current
        .play()
        .then(() => setIsReady(true))
        .catch(() => {});
    }
  }, [playbackSpeed]);

  const handleCanPlay = () => {
    setIsReady(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().catch(() => {});
    }
  };

  // Efeito de Blur suave ao se aproximar do fim do vídeo para um loop perfeito
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    
    // Garante que a velocidade se mantenha reduzida
    if (videoRef.current.playbackRate !== playbackSpeed) {
      videoRef.current.playbackRate = playbackSpeed;
    }

    if (duration > 0) {
      const timeLeft = duration - currentTime;
      if (timeLeft < 1.2 || currentTime < 0.6) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    }
  };

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Elemento de Vídeo com velocidade desacelerada, loop, muted e efeito de blur no reinício */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        style={{
          filter: isBlurred ? 'blur(6px)' : 'blur(0px)',
          transform: isBlurred ? 'scale(1.02)' : 'scale(1)',
          transition: 'filter 0.6s ease-in-out, transform 0.6s ease-in-out, opacity 1s ease-in-out',
        }}
        className={`absolute inset-0 w-full h-full object-cover ${
          isReady ? 'opacity-85' : 'opacity-0'
        }`}
      />

      {/* Camada Transparente de Sobreposição (Branco / Preto com opacidade para legibilidade) */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}
        style={{ opacity: defaultOpacity }}
      />

      {/* Degradê radial suave no centro para realçar e destacar a leitura dos textos */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0)_80%)]'
            : 'bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.6)_0%,_rgba(255,255,255,0)_80%)]'
        }`}
      />
    </div>
  );
}

export default VideoBackground;
