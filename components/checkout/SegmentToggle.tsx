"use client";

/**
 * Toggle segmentado (pílula) usado em "Opções de envio / retirada".
 * O item ativo fica preto com texto branco.
 */
export default function SegmentToggle({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex items-center rounded-pill border border-hairline p-0.5">
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`rounded-pill px-5 py-1.5 text-[14px] font-semibold transition-colors ${
              active ? "bg-black text-white" : "text-black"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
