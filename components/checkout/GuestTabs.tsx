"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Tab = "dados" | "entrega" | "pagamento";

const TABS: { key: Tab; label: string; step: string }[] = [
  { key: "dados", label: "DADOS", step: "guest-dados" },
  { key: "entrega", label: "ENTREGA", step: "guest-entrega" },
  { key: "pagamento", label: "PAGAMENTO", step: "guest-pagamento" },
];

export default function GuestTabs({ active }: { active: Tab }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isRetiradaMulti =
    searchParams.get("retirada") === "true" && searchParams.get("pacotes") === "true";

  function navigate(key: Tab) {
    let step: string = TABS.find((t) => t.key === key)!.step;
    if (key === "entrega" && isRetiradaMulti) step = "guest-retirada-entrega";
    router.push(`/checkout/${step}?${searchParams.toString()}`);
  }

  return (
    <div className="flex border-b border-[#e5e7eb]">
      {TABS.map(({ key, label, step }) => (
        <button
          key={key}
          type="button"
          onClick={() => navigate(key)}
          className={`flex flex-1 items-center justify-center py-3 text-[12px] font-semibold tracking-[0.12em] ${
            key === active
              ? "border-b-2 border-black text-black"
              : "text-[#9ca3af] hover:text-[#6b7280]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
