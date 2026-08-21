"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon?: React.ReactNode;
  linkHref?: string;
  badge?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5.5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns, gridTemplateRows: "1fr" };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "9fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows, gridTemplateColumns: "1fr" };
    }
  }, [activeIndex, items, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInteraction(index);
    }
  };

  return (
    <ul
      ref={ref}
      className={cn(
        "w-full max-w-6xl gap-2.5 md:gap-3",
        "grid",
        "h-[760px] sm:h-[820px] md:h-[500px] lg:h-[520px]",
        "transition-[grid-template-columns,grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[grid-template-columns,grid-template-rows]",
        "select-none font-['DM_Sans',sans-serif]",
        className
      )}
      style={gridStyle}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <li
            key={item.id}
            data-card-index={index}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border-0 text-white shadow-xl",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D06B]",
              isActive 
                ? "bg-[#181E10] ring-1 ring-[#F2D06B]/50 shadow-2xl" 
                : "bg-transparent hover:bg-black/20",
              "min-h-0 min-w-0"
            )}
            onMouseEnter={() => isDesktop && handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
            role="button"
            aria-label={`${item.badge ? item.badge + ': ' : ''}${item.title}`}
            aria-expanded={isActive}
            data-active={isActive}
          >
            {/* Background Image with smooth zoom and high clarity */}
            {item.imgSrc && (
              <img
                src={item.imgSrc}
                alt={item.title}
                loading="eager"
                decoding="async"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 will-change-transform",
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-90 group-hover:opacity-100 group-hover:scale-110"
                )}
              />
            )}

            {/* Closed Card Transparent Warm Golden Overlay */}
            <div 
              className={cn(
                "absolute inset-0 transition-opacity duration-300 pointer-events-none z-10",
                isActive
                  ? "opacity-0"
                  : "opacity-100 bg-gradient-to-b from-[#2A220B]/60 via-[#3B3011]/45 to-[#1F1908]/75"
              )} 
            />

            {/* Active Card Top Protection Gradient */}
            <div 
              className={cn(
                "absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/70 via-black/20 to-transparent transition-opacity duration-300 pointer-events-none z-10",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />

            {/* Content Article Container */}
            <article className="absolute inset-0 flex flex-col justify-between p-4 md:p-6 z-10 pointer-events-none">
              
              {/* TOP HEADER SECTION: Eyebrow badge, Icon, and Title when open; centered title when closed */}
              <div className={cn("w-full shrink-0 z-20 flex", isActive ? "flex-col" : "items-center justify-between h-full my-auto")}>
                {isActive ? (
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4AF37] text-slate-950 shadow-md">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.icon && (
                        <div className="p-2 sm:p-2.5 rounded-xl bg-[#D4AF37] text-slate-950 shadow-md [&>svg]:w-5 [&>svg]:h-5">
                          {item.icon}
                        </div>
                      )}
                    </div>

                    {/* Title positioned right below the badge with spacing and subtle shadow */}
                    <h3 className="mt-2.5 sm:mt-3 text-lg sm:text-xl md:text-xl lg:text-2xl font-bold uppercase tracking-tight text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] text-left">
                      {item.title}
                    </h3>
                  </div>
                ) : (
                  /* Collapsed Mobile Header (centered vertically inside closed card) */
                  <div className="flex md:hidden items-center justify-between w-full h-full my-auto px-2 py-1">
                    <span className="text-[13.5px] sm:text-sm font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate">
                      {item.title}
                    </span>
                    {item.icon && (
                      <div className="text-white shrink-0 ml-2.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] [&>svg]:w-5 [&>svg]:h-5">
                        {item.icon}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Collapsed Vertical Header for Desktop (only visible when card is closed) */}
              {!isActive && (
                <div className="hidden md:flex absolute inset-0 flex-col items-center justify-between p-6 pointer-events-none z-20">
                  {item.icon && (
                    <div className="text-white shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] transition-colors group-hover:text-[#F2D06B] [&>svg]:w-6 [&>svg]:h-6">
                      {item.icon}
                    </div>
                  )}
                  <span className="[writing-mode:vertical-rl] rotate-180 text-sm md:text-[15px] lg:text-[15.5px] font-bold uppercase tracking-widest text-white group-hover:text-[#F2D06B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] transition-colors whitespace-nowrap my-auto">
                    {item.title}
                  </span>
                </div>
              )}

              {/* Expanded Card Bottom Text Block with Clean Subtle Dark Gradient */}
              {isActive && (
                <div className="relative -mx-4 -mb-4 p-5 px-5 sm:px-6 md:-mx-6 md:-mb-6 md:p-6 md:px-8 rounded-b-2xl transition-all duration-400 delay-100 ease-out z-20 bg-gradient-to-t from-black/90 via-black/55 via-65% to-transparent">
                  <p className="w-full max-w-full md:max-w-3xl text-[13.5px] sm:text-sm md:text-[15.5px] lg:text-[16.5px] text-slate-100/95 leading-relaxed font-normal drop-shadow-sm text-left">
                    {item.description}
                  </p>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
