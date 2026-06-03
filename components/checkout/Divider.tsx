/** Linha divisória fina usada entre seções. */
export default function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full rounded-[1px] bg-ink-200 ${className}`} />;
}
