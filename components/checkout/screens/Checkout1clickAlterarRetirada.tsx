"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeftCircle,
  MapPin,
  Pencil,
  Search,
  Store,
  X,
} from "lucide-react";
import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import ProductThumb from "../ProductThumb";
import SegmentToggle from "../SegmentToggle";

// ── Retirada pill ─────────────────────────────────────────────────────────────

function RetiradaPill({ label }: { label: string }) {
  return (
    <span className="inline-flex h-6 w-fit items-center gap-1 rounded-full bg-[#0a0a0a] px-2">
      <Store size={12} className="text-white" strokeWidth={1.8} />
      <span className="text-[12px] font-semibold text-white">{label}</span>
    </span>
  );
}

// ── Drawer: editar responsável ────────────────────────────────────────────────

function EditarResponsavelDrawer({
  nome,
  onChange,
  onClose,
}: {
  nome: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState(nome);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-tl-[12px] rounded-tr-[12px] bg-white">
        {/* Handle */}
        <div className="flex items-center justify-center pb-2 pt-4">
          <div className="h-1 w-[45px] rounded-full bg-[#e5e7eb]" />
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between">
            <p className="text-[18px] font-bold text-black">Responsável pela retirada</p>
            <button type="button" onClick={onClose} aria-label="Fechar">
              <X size={20} className="text-black" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-black">Nome completo</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-[46px] rounded-[4px] border border-[#d1d5db] bg-[#f3f4f6] px-3 text-[14px] font-medium text-black outline-none focus:border-black"
            />
          </div>

          <CtaButton
            onClick={() => {
              onChange(value);
              onClose();
            }}
          >
            Salvar
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

// ── Múltiplos pacotes read-only card (retirada) ──────────────────────────────

function MultiplosPacotesCard() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#d6d6d6] bg-white">
      <div className="flex flex-col gap-3 border-b border-[#d6d6d6] bg-[#f3f4f6] p-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-black">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="8" r="1" fill="currentColor" />
          </svg>
          <span className="text-[14px] font-semibold text-black">Múltiplos pacotes</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Store size={14} className="text-[#374151]" strokeWidth={1.8} />
            <span className="text-[12px] font-bold text-[#374151]">2 retiradas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-[4px] bg-[#d1d5db] px-1 text-[12px] font-medium leading-5 text-[#374151]">
              Disponível em até 4 horas
            </span>
            <span className="rounded-[4px] bg-[#d1d5db] px-1 text-[12px] font-medium leading-5 text-[#374151]">
              Grátis
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 pb-4">
        <div className="flex flex-col gap-[14px] pt-4">
          <RetiradaPill label="Retirada 1" />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Retirada em Loja</p>
              <p className="font-normal">Disponível em até 4 horas</p>
            </div>
            <p className="font-bold">Grátis</p>
          </div>
          <ProductThumb className="h-9 w-9 rounded-[8px] border border-[#d1d5db] object-cover" />
        </div>

        <div className="h-px w-full rounded-sm bg-[#d1d5db]" />

        <div className="flex flex-col gap-[14px]">
          <RetiradaPill label="Retirada 2" />
          <div className="flex items-start justify-between text-[14px] leading-5 text-black">
            <div className="flex flex-col">
              <p className="font-bold">Retirada em Loja</p>
              <p className="font-normal">Disponível em até 4 horas</p>
            </div>
            <p className="font-bold">Grátis</p>
          </div>
          <ProductThumb className="h-9 w-9 rounded-[8px] border border-[#d1d5db] object-cover" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Checkout1clickAlterarRetirada() {
  const router = useCheckoutRouter();
  const [cep, setCep] = useState("CEP 34859-340");
  const [responsavel, setResponsavel] = useState("Tamy Müzel");
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col gap-8 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <div className="flex flex-col gap-6">
        {/* Voltar */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[14px] font-semibold text-black"
        >
          <ArrowLeftCircle size={24} className="text-black" strokeWidth={1.8} />
          Voltar
        </button>

        {/* Título + toggle */}
        <div className="flex items-center justify-between gap-6">
          <h1 className="shrink-0 text-[16px] font-bold text-black">Opções de retirada</h1>
          <SegmentToggle
            options={[
              { key: "envio", label: "Envio" },
              { key: "retirada", label: "Retirada" },
            ]}
            value="retirada"
            onChange={(key) =>
              key === "envio" && router.push("/checkout/1click-alterar-frete")
            }
          />
        </div>

        {/* Busca por CEP */}
        <div className="flex flex-col gap-2">
          <label className="flex h-[46px] cursor-text items-center justify-between rounded-[4px] bg-[#f3f4f6] px-3">
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="flex-1 bg-transparent text-[14px] font-medium text-black outline-none"
            />
            <Search size={20} className="shrink-0 text-black" strokeWidth={1.8} />
          </label>
          <button type="button" className="flex items-center gap-2 self-start">
            <MapPin size={20} className="text-[#374151]" strokeWidth={1.8} />
            <span className="text-[14px] font-normal text-[#374151] underline underline-offset-2">
              Usar minha localização
            </span>
          </button>
        </div>

        {/* Retirada 1 card */}
        <div className="overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.16)] bg-white">
          {/* Package info */}
          <div className="flex flex-col gap-[14px] p-4">
            <RetiradaPill label="Retirada 1" />
            <div className="flex items-start justify-between text-[14px] leading-5 text-black">
              <div className="flex flex-col">
                <p className="font-bold">Retirada em Loja</p>
                <p className="font-normal">Disponível em até 4 horas</p>
              </div>
              <p className="font-bold">Grátis</p>
            </div>
            <ProductThumb className="h-9 w-9 rounded-[8px] border border-[#d1d5db] object-cover" />
          </div>

          {/* Warning: item unavailable */}
          <div className="flex flex-col gap-3 px-4 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <AlertTriangle size={16} className="text-black" strokeWidth={1.8} />
                <p className="text-[12px] font-medium leading-normal text-black w-[217px]">
                  <span className="font-bold">1 item está indisponível</span>
                  {" para retirada nesta loja e será enviado com custo adicional."}
                </p>
              </div>
              <p className="shrink-0 text-[12px] font-bold text-black">+ R$ 20,00</p>
            </div>

            <div className="h-px w-full rounded-sm bg-[#d1d5db]" />

            {/* Responsável pela retirada */}
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-semibold leading-[18px] text-black">
                Responsável pela retirada
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[14px] leading-[18px] text-black">{responsavel}</span>
                <button
                  type="button"
                  aria-label="Editar responsável"
                  onClick={() => setShowEditDrawer(true)}
                >
                  <Pencil size={16} className="text-black" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Endereço do envio */}
        <div className="flex items-start justify-between rounded-[4px] bg-[#f3f4f6] p-3">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-semibold text-black">Endereço do envio</p>
            <p className="text-[12px] leading-[1.3] text-black">
              Rua Lauro Muller, 116 - piso 3 - Lj 331 - Botafogo, Rio de Janeiro
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/checkout/alterar-endereco")}
            aria-label="Editar endereço"
            className="shrink-0"
          >
            <Pencil size={18} className="text-black" strokeWidth={1.8} />
          </button>
        </div>

        {/* Múltiplos pacotes */}
        <MultiplosPacotesCard />
      </div>

      <CtaButton onClick={() => router.push("/checkout/1click-2retiradas")}>
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>

      {/* Drawer editar responsável */}
      {showEditDrawer && (
        <EditarResponsavelDrawer
          nome={responsavel}
          onChange={setResponsavel}
          onClose={() => setShowEditDrawer(false)}
        />
      )}
    </div>
  );
}
