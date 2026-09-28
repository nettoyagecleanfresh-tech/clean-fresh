import { Star } from "lucide-react";
import { GOOGLE_REVIEW_COUNT, GOOGLE_REVIEWS_URL } from "@/data/site";

export function BookingTrustBanner() {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Voir les ${GOOGLE_REVIEW_COUNT} avis Google de Clean&Fresh`}
      className="block rounded-xl border border-[#e6dfc7] bg-[#fffdf7] px-2 py-2 transition-colors hover:border-[#fbbc04]/70 hover:bg-[#fffaf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4"
    >
      <div className="flex flex-nowrap items-center justify-center gap-x-1.5 whitespace-nowrap text-center sm:gap-x-3">
        <span className="text-xs font-bold text-[#4285f4] sm:text-sm">Google</span>
        <span className="flex items-center gap-0.5" aria-label="5 étoiles sur 5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-3 fill-[#fbbc04] text-[#fbbc04] sm:size-3.5" aria-hidden="true" />
          ))}
        </span>
        <span className="text-xs font-bold text-foreground sm:text-sm">4,9/5</span>
        <span className="text-[11px] text-muted-foreground sm:text-xs">
          {GOOGLE_REVIEW_COUNT} avis<span className="hidden sm:inline"> clients</span>
        </span>
      </div>
    </a>
  );
}
