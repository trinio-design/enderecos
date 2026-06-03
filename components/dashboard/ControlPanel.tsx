"use client";

import type { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type StepKey =
  | "loading"
  | "revisao-retirada"
  | "revisao-envio"
  | "otp"
  | "carrinho"
  | "trocar-loja"
  | "busca-geolocalizacao"
  | "opcoes-retirada"
  | "trocar-frete"
  | "alterar-frete"
  | "alterar-endereco";

export type Controls = {
  tela: StepKey;
  entrega: "retirada" | "envio";
  logado: boolean;
  pixSelecionado: boolean;
  lojaEncontrada: boolean;
};

// ─── Grupos de telas ──────────────────────────────────────────────────────────

const FLOW_GROUPS: {
  label: string;
  color: string;
  steps: { key: StepKey; label: string }[];
}[] = [
  {
    label: "Principal",
    color: "bg-violet-100 text-violet-700",
    steps: [
      { key: "loading", label: "Loading" },
      { key: "otp", label: "OTP" },
      { key: "carrinho", label: "Carrinho" },
    ],
  },
  {
    label: "Retirada",
    color: "bg-orange-100 text-orange-700",
    steps: [
      { key: "revisao-retirada", label: "Revisão retirada" },
      { key: "opcoes-retirada", label: "Opções de retirada" },
      { key: "trocar-loja", label: "Trocar loja" },
      { key: "busca-geolocalizacao", label: "Busca geoloc." },
    ],
  },
  {
    label: "Envio",
    color: "bg-blue-100 text-blue-700",
    steps: [
      { key: "revisao-envio", label: "Revisão envio" },
      { key: "trocar-frete", label: "Trocar frete" },
      { key: "alterar-frete", label: "Alterar frete" },
      { key: "alterar-endereco", label: "Alterar endereço" },
    ],
  },
];

// ─── Componente de row de switch ──────────────────────────────────────────────

function SwitchRow({
  id,
  label,
  labelOn,
  labelOff,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  labelOn: string;
  labelOff: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
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

      {/* Telas */}
      <div className="flex flex-col gap-1 px-3 py-4">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Tela
        </p>

        {FLOW_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            <div className="mb-1.5 flex items-center gap-2 px-2">
              <Badge
                variant="outline"
                className={cn("h-5 border-0 px-2 text-[10px]", group.color)}
              >
                {group.label}
              </Badge>
            </div>
            {group.steps.map((step) => {
              const active = controls.tela === step.key;
              return (
                <Button
                  key={step.key}
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => set("tela", step.key)}
                  className={cn(
                    "mb-0.5 h-8 w-full justify-start text-[13px]",
                    active
                      ? "font-semibold text-foreground"
                      : "font-normal text-muted-foreground"
                  )}
                >
                  {step.label}
                </Button>
              );
            })}
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
          id="entrega"
          label="Tipo de entrega"
          labelOn="Retirada em loja"
          labelOff="Envio para endereço"
          checked={controls.entrega === "retirada"}
          onCheckedChange={(v) => set("entrega", v ? "retirada" : "envio")}
        />

        <SwitchRow
          id="logado"
          label="Usuário logado"
          labelOn="Sim — dados preenchidos"
          labelOff="Não — precisa fazer login"
          checked={controls.logado}
          onCheckedChange={(v) => set("logado", v)}
        />

        <SwitchRow
          id="pix"
          label="Pagamento selecionado"
          labelOn="Pix selecionado"
          labelOff="Cartão selecionado"
          checked={controls.pixSelecionado}
          onCheckedChange={(v) => set("pixSelecionado", v)}
        />

        <SwitchRow
          id="loja"
          label="Loja encontrada"
          labelOn="Sim — lojas próximas"
          labelOff="Não — nenhuma loja"
          checked={controls.lojaEncontrada}
          onCheckedChange={(v) => set("lojaEncontrada", v)}
        />
      </div>
    </div>
  );
}
