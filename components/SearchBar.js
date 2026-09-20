"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";

export default function SearchBar({ variant = "dark", autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults((data.results || []).slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 320);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function submit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={submit} role="search">
        <label htmlFor="site-search" className="sr-only">
          Search movies
        </label>
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-bone-faint pointer-events-none" />
          <input
            id="site-search"
            type="search"
            value={query}
            autoFocus={autoFocus}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search films, actors, worlds..."
            className="w-full bg-ink-800/80 border border-ink-600 focus-visible:border-gold/70 rounded-full pl-10 pr-9 py-2 text-sm text-bone placeholder:text-bone-faint outline-none transition-colors"
          />
          {loading && (
            <Loader2 size={14} className="absolute right-3.5 animate-spin text-gold" />
          )}
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute mt-2 w-full rounded-lg border border-ink-600 bg-ink-900/98 backdrop-blur-sm shadow-card overflow-hidden z-50">
          {results.length === 0 && !loading && (
            <p className="px-4 py-3 text-sm text-bone-faint">No films match &ldquo;{query}&rdquo;.</p>
          )}
          <ul>
            {results.map((movie) => (
              <li key={movie.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    router.push(`/movie/${movie.id}`);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-ink-800 text-left transition-colors"
                >
                  <div className="relative w-9 h-13 shrink-0 rounded overflow-hidden bg-ink-700" style={{ width: 36, height: 52 }}>
                    {movie.poster_path ? (
                      <img src={tmdbImage(movie.poster_path, "w92")} alt="" loading="lazy" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <span className="min-w-0">
                    <span className="block text-sm text-bone truncate">{movie.title}</span>
                    <span className="block text-xs text-bone-faint">{formatYear(movie.release_date)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {results.length > 0 && (
            <button
              type="button"
              onClick={submit}
              className="w-full text-center text-xs text-gold hover:text-gold-bright py-2.5 border-t border-ink-700"
            >
              See all results for &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
