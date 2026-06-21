// Displays a course fee with an optional struck-through original price.
// e.g.  ₹60,000  ₹45,000   (original shown struck, current shown normally)
export default function FeeTag({
  fee,
  originalFee,
  className = "",
  strikeClassName = "",
}: {
  fee: number;
  originalFee?: number;
  className?: string;
  strikeClassName?: string;
}) {
  return (
    <span className={className}>
      {originalFee ? (
        <span
          className={`line-through text-slate-500 font-normal align-middle mr-2 text-[0.6em] ${strikeClassName}`}
        >
          ₹{originalFee.toLocaleString("en-IN")}
        </span>
      ) : null}
      ₹{fee.toLocaleString("en-IN")}
    </span>
  );
}
