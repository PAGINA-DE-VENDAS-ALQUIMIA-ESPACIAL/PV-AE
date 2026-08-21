import { useEffect, useRef, useState, useCallback } from 'react';

// Eagerly load all desktop (16:9) and mobile (9:16) frame paths using Vite's glob import
const desktopFrameModules = import.meta.glob<{ default: string }>(
  '../../assets/Frames Hero/Frames 16-9 para Desktop/*.webp',
  { eager: true }
);

const mobileFrameModules = import.meta.glob<{ default: string }>(
  '../../assets/Frames Hero/Frames 9-16 para Mobile/*.webp',
  { eager: true }
);

// Natural sort to ensure exact frame 001 -> 100 sequence, computed once at module level
const sortPaths = (modules: Record<string, { default: string }>): string[] => {
  return Object.keys(modules)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((path) => modules[path].default);
};

const DESKTOP_FRAMES: string[] = sortPaths(desktopFrameModules);
const MOBILE_FRAMES: string[] = sortPaths(mobileFrameModules);
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';

/**
 * BackgroundFrames
 * High-performance, canvas-rendered frame sequence synchronized with scroll.
 * Delivers 60fps cinematic playback across Hero and Section 2, locking on frame 100 for Section 3+.
 */
export function BackgroundFrames() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
    }
    return false;
  });

  const activeFrameUrls = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;

  const currentFrameFloatRef = useRef<number>(0);
  const targetFrameFloatRef = useRef<number>(0);
  const imagesCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const isLoopRunningRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const lastRenderedIndexRef = useRef<number>(-1);
  const sectionEndOffsetRef = useRef<number>(1200);

  // High-efficiency breakpoint listener (triggers only when crossing the 768px boundary)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else {
      // Compatibility fallback for older WebKit
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  // Aspect-fill image blitting onto the canvas with mobile zoom and upward focal anchoring
  const drawFrameToCanvas = useCallback((canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    if (!iw || !ih || !cw || !ch) return;

    const imgAspect = iw / ih;
    const canvasAspect = cw / ch;

    // Apply mobile-only zoom and lower focal point anchor so elements (like the house) sit higher on mobile
    const zoom = isMobile ? 1.22 : 1.0;
    const verticalAnchor = isMobile ? 0.72 : 0.50; // Anchors focal point towards the lower region, lifting visual elements up

    let drawWidth = cw;
    let drawHeight = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = (cw / imgAspect) * zoom;
      drawWidth = cw * zoom;
      offsetX = (cw - drawWidth) / 2;
      offsetY = (ch - drawHeight) * verticalAnchor;
    } else {
      drawWidth = (ch * imgAspect) * zoom;
      drawHeight = ch * zoom;
      offsetX = (cw - drawWidth) / 2;
      offsetY = (ch - drawHeight) * verticalAnchor;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [isMobile]);

  // Frame preloading pipeline with prioritized concurrency control and idle scheduling
  useEffect(() => {
    if (!activeFrameUrls.length) return;

    let isMounted = true;
    const loadingUrls = new Set<string>();

    const loadAndDecodeFrame = async (url: string): Promise<HTMLImageElement | null> => {
      if (imagesCacheRef.current.has(url)) {
        return imagesCacheRef.current.get(url)!;
      }
      if (loadingUrls.has(url)) return null;
      loadingUrls.add(url);

      const img = new Image();
      img.src = url;

      try {
        if ('decode' in img && typeof img.decode === 'function') {
          await img.decode();
        } else {
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }
      } catch {
        // Fallback gracefully if decode promise rejects (e.g. fast tab navigation)
      } finally {
        loadingUrls.delete(url);
      }

      if (isMounted && img.naturalWidth > 0) {
        imagesCacheRef.current.set(url, img);
      }
      return img;
    };

    // 1. Instantly load & paint initial frame 0 to avoid visual flash
    loadAndDecodeFrame(activeFrameUrls[0]).then((img) => {
      if (!isMounted) return;
      const canvas = canvasRef.current;
      if (canvas && img && img.naturalWidth > 0) {
        drawFrameToCanvas(canvas, img);
      }
    });

    // 2. High-priority immediate streaming: load all 100 frames in continuous batches of 4
    const streamAllFrames = async () => {
      const total = activeFrameUrls.length;
      const concurrency = 4;

      // Stream sequentially in controlled batches of 4
      for (let i = 1; i < total; i += concurrency) {
        if (!isMounted) return;
        const batch = [];
        for (let c = 0; c < concurrency && i + c < total; c++) {
          const url = activeFrameUrls[i + c];
          if (!imagesCacheRef.current.has(url)) {
            batch.push(loadAndDecodeFrame(url));
          }
        }
        if (batch.length > 0) {
          await Promise.all(batch);
          // Tiny 10ms yield to maintain 60fps main-thread responsiveness
          await new Promise((r) => setTimeout(r, 10));
        }
      }
    };

    streamAllFrames();

    return () => {
      isMounted = false;
    };
  }, [activeFrameUrls, drawFrameToCanvas]);

  // Main scroll tracker, dynamic resize listener, and on-demand lerp loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cache section boundaries to prevent layout thrashing during scroll events
    const updateSectionMetrics = () => {
      const videoSection = document.getElementById('video-section-wrapper') || document.getElementById('video-section');
      const whySection = document.getElementById('why-cocreate-section');

      if (videoSection) {
        const rect = videoSection.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const videoTopDoc = rect.top + scrollY;
        const offsetTrigger = isMobile ? window.innerHeight * 0.45 : window.innerHeight * 0.55;
        sectionEndOffsetRef.current = Math.max(100, videoTopDoc - offsetTrigger);
      } else if (whySection) {
        const rect = whySection.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const whyBottomDoc = rect.bottom + scrollY;
        sectionEndOffsetRef.current = Math.max(100, whyBottomDoc - window.innerHeight * 0.5);
      } else {
        sectionEndOffsetRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      }
    };

    // Resize canvas with device-calibrated DPR
    const updateCanvasDimensions = () => {
      if (!canvas) return;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      const targetW = Math.round(width * dpr);
      const targetH = Math.round(height * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;

        const currentIdx = Math.min(
          activeFrameUrls.length - 1,
          Math.max(0, Math.round(currentFrameFloatRef.current))
        );
        const url = activeFrameUrls[currentIdx];
        const cached = imagesCacheRef.current.get(url);
        if (cached && cached.complete) {
          drawFrameToCanvas(canvas, cached);
        }
      }

      updateSectionMetrics();
    };

    updateCanvasDimensions();

    // On-demand rendering loop: runs solely during active transitions, idling when at rest
    const startRenderLoop = () => {
      if (isLoopRunningRef.current) return;
      isLoopRunningRef.current = true;

      const render = () => {
        const diff = targetFrameFloatRef.current - currentFrameFloatRef.current;
        const absDiff = Math.abs(diff);
        const lerpFactor = isMobile ? 0.36 : 0.18;

        if (absDiff > 0.01) {
          currentFrameFloatRef.current += diff * lerpFactor;
        } else {
          currentFrameFloatRef.current = targetFrameFloatRef.current;
        }

        const frameIndex = Math.min(
          activeFrameUrls.length - 1,
          Math.max(0, Math.round(currentFrameFloatRef.current))
        );

        if (frameIndex !== lastRenderedIndexRef.current && canvas) {
          const url = activeFrameUrls[frameIndex];
          const cachedImg = imagesCacheRef.current.get(url);

          if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
            drawFrameToCanvas(canvas, cachedImg);
            lastRenderedIndexRef.current = frameIndex;
          } else {
            // Locate closest decoded frame if current frame is still decoding
            let fallbackImg: HTMLImageElement | undefined;
            const maxRange = Math.max(frameIndex, activeFrameUrls.length - frameIndex);
            for (let offset = 1; offset <= maxRange; offset++) {
              const prevUrl = activeFrameUrls[frameIndex - offset];
              const nextUrl = activeFrameUrls[frameIndex + offset];
              if (prevUrl && imagesCacheRef.current.has(prevUrl)) {
                const img = imagesCacheRef.current.get(prevUrl);
                if (img && img.complete && img.naturalWidth > 0) {
                  fallbackImg = img;
                  break;
                }
              }
              if (nextUrl && imagesCacheRef.current.has(nextUrl)) {
                const img = imagesCacheRef.current.get(nextUrl);
                if (img && img.complete && img.naturalWidth > 0) {
                  fallbackImg = img;
                  break;
                }
              }
            }
            if (fallbackImg && fallbackImg.complete && fallbackImg.naturalWidth > 0) {
              drawFrameToCanvas(canvas, fallbackImg);
            }
          }
        }

        // Suspend RAF when target frame is achieved to preserve battery & CPU/GPU
        if (Math.abs(targetFrameFloatRef.current - currentFrameFloatRef.current) < 0.01) {
          currentFrameFloatRef.current = targetFrameFloatRef.current;
          isLoopRunningRef.current = false;
          rafIdRef.current = null;
        } else {
          rafIdRef.current = requestAnimationFrame(render);
        }
      };

      rafIdRef.current = requestAnimationFrame(render);
    };

    const updateTargetFrameFromScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const totalFrames = activeFrameUrls.length;
      if (totalFrames <= 1) return;

      const targetEnd = sectionEndOffsetRef.current;
      let progress = 0;
      if (targetEnd > 0) {
        progress = Math.min(1, Math.max(0, scrollY / targetEnd));
      }

      targetFrameFloatRef.current = progress * (totalFrames - 1);
      startRenderLoop();
    };

    updateTargetFrameFromScroll();

    // Passive event listeners
    const onScroll = () => {
      updateTargetFrameFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateCanvasDimensions, { passive: true });

    // Page Visibility API handler: pauses background loop on tab switch
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
          isLoopRunningRef.current = false;
        }
      } else {
        updateTargetFrameFromScroll();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Dynamic resize observer to maintain section metrics across dynamic DOM expansions
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSectionMetrics();
      });
      resizeObserver.observe(document.body);
    }

    const settleTimeout = setTimeout(updateSectionMetrics, 500);

    return () => {
      clearTimeout(settleTimeout);
      window.removeEventListener('resize', updateCanvasDimensions);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
        isLoopRunningRef.current = false;
      }
    };
  }, [activeFrameUrls, isMobile, drawFrameToCanvas]);

  return (
    <div 
      className="bg-frames-root fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
      role="presentation"
      tabIndex={-1}
    >
      <canvas
        ref={canvasRef}
        className="bg-frames-canvas w-full h-full object-cover block pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}


