import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`} aria-label="Gogo HD home">
      <span className="brand-mark" aria-hidden="true"><span>G</span><i /></span>
      <span className="font-brand text-xl font-black tracking-[-0.06em] text-white">Gogo<span className="text-lime"> HD</span></span>
    </Link>
  );
}
