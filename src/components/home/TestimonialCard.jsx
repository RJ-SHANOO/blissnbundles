import { Quote } from "lucide-react";
import RatingStars from "../ui/RatingStars";
import Badge from "../ui/Badge";

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-soft">
      <Quote size={26} className="text-gold" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/80 sm:text-base">
        "{testimonial.text}"
      </p>

      <div className="mt-6 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.customerName}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-ink">
            {testimonial.customerName}
          </p>
          <p className="text-xs text-muted">{testimonial.location}</p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1.5">
          <RatingStars rating={testimonial.rating} showValue={false} />
          <Badge tone="gold">{testimonial.occasion}</Badge>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
