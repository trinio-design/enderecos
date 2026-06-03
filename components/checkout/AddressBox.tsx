"use client";

import { useRouter } from "next/navigation";

import { EditIcon } from "./icons";

/**
 * Caixa cinza com o endereço (de envio ou retirada) e um ícone de editar.
 */
export default function AddressBox({
  title,
  lines,
  editHref,
}: {
  title: string;
  lines: string[];
  editHref?: string;
}) {
  const router = useRouter();
  return (
    <div className="flex items-start justify-between gap-3 rounded-card bg-ink-100 px-4 py-3">
      <div className="flex flex-col gap-1">
        <p className="text-[14px] font-semibold text-black">{title}</p>
        {lines.map((line) => (
          <p key={line} className="text-[13px] leading-[18px] text-ink-500">
            {line}
          </p>
        ))}
      </div>
      <button
        type="button"
        onClick={() => editHref && router.push(editHref)}
        aria-label="Editar endereço"
        className="shrink-0"
      >
        <EditIcon size={20} className="text-black" />
      </button>
    </div>
  );
}
