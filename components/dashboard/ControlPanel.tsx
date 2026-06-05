"use client";

import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type Controls = {
  temCep: boolean;
  escolheuEntrega: boolean;
  tipoEntrega: "retirada" | "envio";
  multiplosPacotes: boolean;
};

// ─── Produtos mock ────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "Tênis Nike Air Max 270",
    price: "R$ 599,90",
    img: "https://picsum.photos/seed/sneaker42/56/56",
  },
  {
    id: 2,
    name: "Moletom Oversized Off-White",
    price: "R$ 349,90",
    img: "https://picsum.photos/seed/hoodie07/56/56",
  },
  {
    id: 3,
    name: "Carteira de Couro Reserva",
    price: "R$ 129,90",
    img: "https://picsum.photos/seed/wallet19/56/56",
  },
];

// ─── Switch row ───────────────────────────────────────────────────────────────

function SwitchRow({
  id,
  label,
  labelOn,
  labelOff,
  checked,
  onCheckedChange,
  indent = false,
}: {
  id: string;
  label: string;
  labelOn: string;
  labelOff: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  indent?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        indent ? "ml-4 border-l-2 border-border pl-4" : ""
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <span className="text-xs text-muted-foreground">
          {checked ? labelOn : labelOff}
        </span>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

// ─── Painel principal ─────────────────────────────────────────────────────────

export default function ControlPanel({
  controls,
  onChange,
}: {
  controls: Controls;
  onChange: Dispatch<SetStateAction<Controls>>;
}) {
  function set<K extends keyof Controls>(key: K, value: Controls[K]) {
    onChange((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-card">

      {/* Header */}
      <div className="px-5 pb-4 pt-5">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#fe4f30" />
            <path d="M12 6.5 16 12a4 4 0 1 1-8 0l4-5.5Z" fill="#fff" />
          </svg>
          <span className="text-[13px] font-semibold text-foreground">
            Trinio Preview
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Checkout · Novo fluxo de retirada
        </p>
      </div>

      <Separator />

      {/* Produtos */}
      <div className="flex flex-col gap-1 px-5 py-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Produtos
        </p>
        {PRODUCTS.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-lg py-1.5">
            <img
              src={p.img}
              alt={p.name}
              width={48}
              height={48}
              className="rounded-md object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[13px] font-medium text-foreground">
                {p.name}
              </span>
              <span className="text-xs text-muted-foreground">{p.price}</span>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Switches */}
      <div className="flex flex-col gap-5 px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Configurações
        </p>

        <SwitchRow
          id="cep"
          label="Colocou CEP no carrinho?"
          labelOn="Sim"
          labelOff="Não"
          checked={controls.temCep}
          onCheckedChange={(v) => set("temCep", v)}
        />

        <SwitchRow
          id="escolheu"
          label="Escolheu entrega ou retirada?"
          labelOn="Sim"
          labelOff="Não"
          checked={controls.escolheuEntrega}
          onCheckedChange={(v) => set("escolheuEntrega", v)}
        />

        {controls.escolheuEntrega && (
          <SwitchRow
            id="tipo"
            label="Tipo escolhido"
            labelOn="Retirada em loja"
            labelOff="Envio para endereço"
            checked={controls.tipoEntrega === "retirada"}
            onCheckedChange={(v) =>
              set("tipoEntrega", v ? "retirada" : "envio")
            }
            indent
          />
        )}

        <SwitchRow
          id="pacotes"
          label="Múltiplos pacotes?"
          labelOn="Sim"
          labelOff="Não"
          checked={controls.multiplosPacotes}
          onCheckedChange={(v) => set("multiplosPacotes", v)}
        />
      </div>
    </div>
  );
}
