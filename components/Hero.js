"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, Play, Star, Volume2 } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatRating, formatYear } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function Hero({ movies = [] }) {
  const slides = useMemo(() => movies.filter((m) => m?.backdrop_path).slice(0, 8), [movies]);
  const [active, setActive] = useState(0);
  const movie = slides[active];
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => setActive((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(timer);
  }, [slides.length]);
  if (!movie) return <section className="hero-shell hero-empty" />;
  const backdrop = tmdbImage(movie.backdrop_path, "original");
  return (
    <section className="hero-shell">
      <AnimatePresence mode="wait">
        <motion.div key={movie.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }} className="absolute inset-0">
          <img src={backdrop} alt="" className="hero-bg" />
          <div className="hero-gradient" />
          <div className="hero-noise" />
        </motion.div>
      </AnimatePresence>
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-32 pb-16 lg:pt-40 lg:pb-24 min-h-[760px] lg:min-h-[820px] flex items-end">
        <div className="grid lg:grid-cols-[1fr_330px] gap-12 items-end w-full">
          <AnimatePresence mode="wait">
            <motion.div key={movie.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .55 }} className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="eyebrow"><span className="pulse-dot" /> Trending now</span>
                <span className="hero-meta">{formatYear(movie.release_date)}</span>
                <span className="hero-meta flex items-center gap-1"><Star size={13} fill="currentColor" /> {formatRating(movie.vote_average)}</span>
              </div>
              <h1 className="hero-title">{movie.title}</h1>
              <p className="hero-copy">{movie.overview || "Discover what the world is watching right now."}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href={`/movie/${movie.id}`} className="btn-primary"><Play size={17} fill="currentColor" /> Explore movie <ArrowRight size={16} /></Link>
                <LikeButton movie={movie} className="btn-ghost"><Heart size={17} /> <span>Add to watch list</span></LikeButton>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="hero-console hidden lg:block">
            <div className="console-top"><span>GOGO / TRENDING</span><Volume2 size={15} /></div>
            <div className="console-poster">
              <img src={tmdbImage(movie.poster_path, "w500") || backdrop} alt="" />
              <div><span>NOW STREAMING</span><strong>{movie.title}</strong></div>
            </div>
            <div className="console-bars"><i /><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="hero-controls">
        <span className="hero-counter">0{active + 1} / 0{Math.max(slides.length, 1)}</span>
        <div className="hero-dots">{slides.map((item, i) => <button key={item.id} aria-label={`Show ${item.title}`} onClick={() => setActive(i)} className={i === active ? "active" : ""}><span /></button>)}</div>
        <span className="hero-swipe">AUTO PLAY <span className="line" /></span>
      </div>
    </section>
  );
}
