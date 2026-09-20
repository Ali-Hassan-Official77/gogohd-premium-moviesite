import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return <footer className="site-footer">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid md:grid-cols-[1.5fr_1fr_1fr] gap-12">
      <div><Logo/><p className="footer-copy">Gogo HD is a cinematic discovery platform for finding movies, saving favorites and exploring what is trending.</p><p className="tmdb-note">This product uses the TMDB API but is not endorsed or certified by TMDB.</p></div>
      <div><p className="footer-label">Explore</p><div className="footer-links"><Link href="/">Discover</Link><Link href="/watchlist">My Watch List</Link><Link href="/genre/28">Action</Link><Link href="/genre/18">Drama</Link></div></div>
      <div><p className="footer-label">Business</p><div className="footer-links"><span>Rawalpindi, Pakistan</span><a href="mailto:administrator297@gogohd.com">administrator297@gogohd.com</a><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">Movie data by TMDB</a></div></div>
    </div>
    <div className="footer-bottom"><div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row justify-between gap-2"><span>© {new Date().getFullYear()} Gogo HD. All rights reserved.</span><span>Built for screens of every size.</span></div></div>
  </footer>;
}
