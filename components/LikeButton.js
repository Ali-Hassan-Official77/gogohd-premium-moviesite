"use client";

import { useEffect, useState } from "react";

const KEY = "gogo-hd-watchlist";

export function getWatchlist() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isInWatchlist(id) {
  return getWatchlist().some(
    (movie) => String(movie.id) === String(id)
  );
}

export function toggleWatchlist(movie) {
  const list = getWatchlist();

  const exists = list.some(
    (item) => String(item.id) === String(movie.id)
  );

  const next = exists
    ? list.filter(
        (item) => String(item.id) !== String(movie.id)
      )
    : [
        ...list,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          overview: movie.overview,
        },
      ];

  localStorage.setItem(KEY, JSON.stringify(next));

  window.dispatchEvent(
    new Event("gogo-watchlist-change")
  );

  return !exists;
}

export default function LikeButton({
  movie,
  className = "",
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isInWatchlist(movie.id));

    const syncWatchlist = () => {
      setLiked(isInWatchlist(movie.id));
    };

    window.addEventListener(
      "gogo-watchlist-change",
      syncWatchlist
    );

    return () => {
      window.removeEventListener(
        "gogo-watchlist-change",
        syncWatchlist
      );
    };
  }, [movie.id]);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const result = toggleWatchlist(movie);
    setLiked(result);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        liked
          ? `Remove ${movie.title} from watch list`
          : `Add ${movie.title} to watch list`
      }
      title={liked ? "Remove from watch list" : "Add to watch list"}
      className={`watch-heart ${liked ? "is-liked" : ""} ${className}`}
      style={{
        width: "52px",
        height: "52px",
        minWidth: "52px",
        minHeight: "52px",
        padding: "0",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          width: "22px",
          height: "22px",
          minWidth: "22px",
          minHeight: "22px",
          display: "block",
          flexShrink: 0,
          color: liked ? "#B8FF19" : "#FFFFFF",
          stroke: liked ? "#B8FF19" : "#FFFFFF",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      >
        <path d="M6 3.5C6 2.672 6.672 2 7.5 2h9c.828 0 1.5.672 1.5 1.5V21l-6-3.5L6 21V3.5Z" />
      </svg>
    </button>
  );
}