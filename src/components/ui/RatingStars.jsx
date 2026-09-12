import { Star } from "lucide-react";

function RatingStars({ rating = 0, showValue = true, className = "" }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= rounded;
          const half = !filled && i + 0.5 === rounded;
          return (
            <Star
              key={i}
              size={15}
              className={
                filled || half
                  ? "fill-gold text-gold"
                  : "fill-transparent text-ink/20"
              }
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-muted">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

export default RatingStars;
