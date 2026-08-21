import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export interface AnimatedFeatureCardProps {
  index: string;
  tag: string;
  title: string;
  imageSrc: string;
  color?: 'orange' | 'purple' | 'blue' | string;
}

const colorThemeMap: Record<
  string,
  {
    tagClass: string;
    glowClass: string;
    borderHoverClass: string;
    accentText: string;
    buttonBg: string;
  }
> = {
  orange: {
    tagClass: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    glowClass: 'from-orange-500/20 via-orange-500/5 to-transparent',
    borderHoverClass: 'group-hover:border-orange-500/40',
    accentText: 'text-orange-400',
    buttonBg: 'bg-orange-500 text-black',
  },
  purple: {
    tagClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    glowClass: 'from-purple-500/20 via-purple-500/5 to-transparent',
    borderHoverClass: 'group-hover:border-purple-500/40',
    accentText: 'text-purple-400',
    buttonBg: 'bg-purple-500 text-white',
  },
  blue: {
    tagClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    glowClass: 'from-blue-500/20 via-blue-500/5 to-transparent',
    borderHoverClass: 'group-hover:border-blue-500/40',
    accentText: 'text-blue-400',
    buttonBg: 'bg-blue-500 text-white',
  },
};

export function AnimatedFeatureCard({
  index,
  tag,
  title,
  imageSrc,
  color = 'orange',
}: AnimatedFeatureCardProps) {
  const theme = colorThemeMap[color] || colorThemeMap.orange;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-zinc-950/90 border border-zinc-800/80 p-6 sm:p-7 transition-all duration-500 shadow-xl ${theme.borderHoverClass}`}
    >
      {/* Background Radial Glow Effect on Hover */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${theme.glowClass} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      {/* Top Bar: Index & Tag */}
      <div className="flex items-center justify-between z-10">
        <span className="font-mono text-xs font-semibold tracking-widest text-zinc-500">
          {index}
        </span>
        <span
          className={`inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border backdrop-blur-md transition-colors duration-300 ${theme.tagClass}`}
        >
          {tag}
        </span>
      </div>

      {/* Image Container with Smooth Zoom Effect */}
      <div className="relative my-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-900/80 border border-zinc-800/50 z-10">
        <img
          src={imageSrc}
          alt={title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft Inner Shadow Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-60" />
      </div>

      {/* Bottom Title and Arrow CTA */}
      <div className="flex items-end justify-between gap-4 z-10 pt-2">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors duration-300 leading-snug">
          {title}
        </h3>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:scale-110 group-hover:${theme.buttonBg} transition-all duration-300`}
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
