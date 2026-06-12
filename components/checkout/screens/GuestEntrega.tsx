"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Info,
  Package,
  ShieldCheck,
  SquarePen,
  Store,
  Truck,
} from "lucide-react";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import GuestTabs from "../GuestTabs";
import Header from "../Header";

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function Radio({ active }: { active: boolean }) {
  return active ? (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black">
      <Check size={8} className="text-white" strokeWidth={3} />
    </span>
  ) : (
    <span className="h-4 w-4 shrink-0 rounded-full border border-black/20" />
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded px-1 py-0.5 bg-[#e5e7eb] text-[12px] font-medium text-[#374151]">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px w-full rounded bg-[#d1d5db]" />;
}

function ProductThumb({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="shrink-0">
      <img
        src="/tenis.jpg"
        alt="Tênis"
        className="h-9 w-9 rounded-[8px] border border-[#d1d5db] object-cover"
      />
    </button>
  );
}

function DetalhesPacoteDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative rounded-tl-[12px] rounded-tr-[12px] bg-white">
        <div className="flex items-center justify-center pb-2 pt-4">
          <div className="h-1 w-[45px] rounded-full bg-[#e5e7eb]" />
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(111,173,246,0.16)]">
            <Package size={38} className="text-black" />
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-[24px] font-bold text-black">Detalhes do pacote</p>
            <div className="flex flex-col gap-[18px]">
              <DeliveryPill>
                <Package size={12} />
                Pacote 1
              </DeliveryPill>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-bold text-black">Retirada em loja</p>
                  <p className="text-[12px] font-medium text-black">Em até 4 horas</p>
                </div>
                <p className="text-[12px] font-medium text-black">Grátis</p>
              </div>
              <div className="h-px w-full rounded bg-[#d1d5db]" />
              <div className="flex flex-col gap-6">
                <p className="text-[14px] font-bold text-black">Produtos</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src="/tenis.jpg"
                        alt="Produto"
                        className="h-[62px] w-[62px] rounded-[8px] border border-[#d1d5db] object-cover"
                      />
                      <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black">
                        <p className="text-[14px] font-black leading-none text-white">1</p>
                      </div>
                    </div>
                    <p className="w-[150px] text-[12px] font-bold leading-[1.3] text-black">
                      Anel New Diamond com nome muito longo
                    </p>
                  </div>
                  <p className="text-[14px] font-bold text-black">R$1200,00</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center rounded-[4px] bg-[#f3f4f6] text-[16px] font-bold text-black"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

function DeliveryPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[12px] font-semibold text-white">
      {children}
    </span>
  );
}

function ResponsavelRow({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[14px] font-semibold text-black">Responsável pela retirada</p>
      <div className="flex items-center gap-2">
        <p className="text-[14px] font-medium text-black">Tamy Müzel</p>
        <button type="button" onClick={onEdit}>
          <SquarePen size={18} className="text-black" />
        </button>
      </div>
    </div>
  );
}

// ─── Simple mode (pacotes=false) ──────────────────────────────────────────────

const OPCOES_SIMPLES = [
  { id: "economica", nome: "Econômica", prazo: "até 7 dias úteis", preco: "R$11,05" },
  { id: "rapida", nome: "Rápida", prazo: "até 3 dias úteis", preco: "R$16,82" },
  { id: "retirada", nome: "Retirada em Loja", prazo: "4 horas", preco: "Grátis" },
];

function EntregaSimples({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 pt-6 pb-4">
      <p className="text-[14px] font-semibold text-black">Tipo de entrega</p>

      {OPCOES_SIMPLES.map((opcao) => (
        <button
          key={opcao.id}
          type="button"
          onClick={() => setSelected(opcao.id)}
          className={`flex items-center justify-between rounded-[8px] border p-4 text-left ${
            selected === opcao.id ? "border-black" : "border-[#e5e7eb]"
          }`}
        >
          <div className="flex items-center gap-3">
            <Radio active={selected === opcao.id} />
            <div>
              <p className="text-[14px] font-semibold leading-[18px] text-black">{opcao.nome}</p>
              <p className="text-[12px] font-medium leading-[16px] text-[#6b7280]">{opcao.prazo}</p>
            </div>
          </div>
          <span className="text-[14px] font-medium text-black">{opcao.preco}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Multi mode — "Múltiplos pacotes" breakdown box ──────────────────────────

function MultiPacotesBox({ selected, onProductClick }: { selected: string; onProductClick: () => void }) {
  const isRetirada = selected === "retirada";

  return (
    <div className="rounded-[8px] border border-[#d6d6d6]">
      {/* Header */}
      <div className="flex flex-col gap-3 rounded-t-[8px] border-b border-[#d6d6d6] bg-[#f3f4f6] p-4">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-black" />
          <p className="text-[14px] font-semibold text-black">Múltiplos pacotes</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {isRetirada ? (
              <Store size={14} className="text-[#374151]" />
            ) : (
              <Truck size={14} className="text-[#374151]" />
            )}
            <p className="text-[12px] font-bold text-[#374151]">
              {isRetirada ? "Retirada" : "2 entregas"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{isRetirada ? "4 horas a 2 dias" : "1 a 2 dias úteis"}</Badge>
            <Badge>{isRetirada ? "Grátis" : "R$20,00"}</Badge>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 p-4">
        {isRetirada ? (
          <>
            <div className="flex flex-col gap-3">
              <DeliveryPill>
                <Store size={12} />
                Retirada 1
              </DeliveryPill>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-bold text-black">Retirada em Loja</p>
                  <p className="text-[14px] font-medium text-black">Disponível em até 4 horas</p>
                </div>
                <p className="text-[14px] font-bold text-black">Grátis</p>
              </div>
              <ProductThumb onClick={onProductClick} />
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <DeliveryPill>
                <Package size={12} />
                Entrega 1
              </DeliveryPill>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-bold text-black">Frete econômico</p>
                  <p className="text-[14px] font-medium text-black">Chegará até 18/09/26</p>
                </div>
                <p className="text-[14px] font-bold text-black">R$12,90</p>
              </div>
              <p className="text-[12px] font-medium text-black">
                Rua Lauro Muller, 116 - piso 3 - Lj 331 - Botafogo, Rio de Janeiro
              </p>
              <ProductThumb onClick={onProductClick} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <DeliveryPill>
                <Package size={12} />
                Entrega 1
              </DeliveryPill>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-bold text-black">Frete econômico</p>
                  <p className="text-[14px] font-medium text-black">Chegará até 18/09/26</p>
                </div>
                <p className="text-[14px] font-bold text-black">R$12,90</p>
              </div>
              <ProductThumb onClick={onProductClick} />
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <DeliveryPill>
                <Package size={12} />
                Entrega 2
              </DeliveryPill>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-bold text-black">Frete expresso</p>
                  <p className="text-[14px] font-medium text-black">Chegará até 18/09/26</p>
                </div>
                <p className="text-[14px] font-bold text-black">R$12,90</p>
              </div>
              <ProductThumb onClick={onProductClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Multi mode — option cards ────────────────────────────────────────────────

const OPCOES_MULTI = [
  {
    id: "economica",
    nome: "Frete econômico",
    sub: "2 pacotes de 1 a 2 dias úteis",
    preco: "R$12,90",
  },
  {
    id: "expresso",
    nome: "Frete expresso",
    sub: "2 pacotes de 1 a 6 dias úteis",
    preco: "R$22,90",
  },
  {
    id: "retirada",
    nome: "Retirada em Loja",
    sub: "Disponível em até 4 horas",
    preco: "Grátis",
  },
];

function EntregaMulti({
  selected,
  setSelected,
  onEditResponsavel,
  onProductClick,
}: {
  selected: string;
  setSelected: (v: string) => void;
  onEditResponsavel: () => void;
  onProductClick: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col gap-3 px-4 pt-6 pb-4">
      <p className="text-[16px] font-bold text-black">Selecione a entrega / retirada</p>

      {OPCOES_MULTI.map((opcao) => {
        const active = selected === opcao.id;
        const isRetiradaExpanded = active && opcao.id === "retirada";

        return (
          <div key={opcao.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => setSelected(opcao.id)}
              className={`flex flex-col gap-3 border p-4 text-left ${
                isRetiradaExpanded
                  ? "rounded-t-[8px] border-b-0 border-black"
                  : "rounded-[8px] " + (active ? "border-black" : "border-[#e5e7eb]")
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Radio active={active} />
                  <p className="text-[14px] font-bold text-black">{opcao.nome}</p>
                </div>
                <p className="text-[14px] font-bold text-black">{opcao.preco}</p>
              </div>

              <p className="text-[14px] font-medium text-black">{opcao.sub}</p>

              {active && opcao.id === "economica" && (
                <div className="flex flex-col text-[12px] text-black">
                  <p className="font-semibold">Local de entrega:</p>
                  <p className="font-medium">
                    Rua João da Silva, 123 - Ap. 32 - Botafogo, Rio de Janeiro
                  </p>
                </div>
              )}

              {isRetiradaExpanded && (
                <>
                  <div className="flex flex-col text-[12px] text-black">
                    <p className="font-semibold">Reserva SP Higienópolis</p>
                    <p className="font-medium">
                      Avenida Higienópolis, 618 - Loja 2005 Piso Pacaembu - 01238-000 São Paulo, SP
                    </p>
                  </div>

                  <Divider />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-1 items-start gap-2">
                      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-black" />
                      <p className="text-[12px] text-black">
                        <span className="font-bold">1 item está indisponível</span>
                        {" "}para retirada nesta loja e será enviado com custo adicional.
                      </p>
                    </div>
                    <p className="shrink-0 text-[12px] font-bold text-black">+ R$ 20,00</p>
                  </div>

                  <Divider />

                  <ResponsavelRow onEdit={onEditResponsavel} />
                </>
              )}
            </button>

            {isRetiradaExpanded && (
              <button
                type="button"
                onClick={() =>
                  router.push(`/checkout/guest-trocar-loja?${searchParams.toString()}`)
                }
                className="flex items-center justify-center gap-2 rounded-b-[8px] border border-black border-t-0 bg-[#e5e7eb] py-3"
              >
                <Store size={18} className="text-black" />
                <p className="text-[12px] font-semibold text-black">Escolher outra loja</p>
              </button>
            )}
          </div>
        );
      })}

      <MultiPacotesBox selected={selected} onProductClick={onProductClick} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GuestEntrega() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMulti = searchParams.get("pacotes") === "true";
  const isRetiradaConfig = searchParams.get("retirada") === "true";

  const defaultTipo = searchParams.get("tipo") ?? (isRetiradaConfig ? "retirada" : "economica");
  const [selected, setSelected] = useState(defaultTipo);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  function handleSelect(v: string) {
    setSelected(v);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tipo", v);
    router.replace(`/checkout/guest-entrega?${params.toString()}`);
  }

  function handleContinue() {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/checkout/guest-pagamento?${params.toString()}`);
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="px-4 pt-6 pb-4">
        <Header total="R$ 670,10" quantity={3} />
      </div>

      <GuestTabs active="entrega" />

      {isMulti ? (
        <EntregaMulti
          selected={selected}
          setSelected={handleSelect}
          onEditResponsavel={() => setShowEditDrawer(true)}
          onProductClick={() => router.push("/checkout/detalhe-pacote")}
        />
      ) : (
        <EntregaSimples selected={selected} setSelected={handleSelect} />
      )}

      {/* Drawer overlay — edição do responsável pela retirada */}
      {showEditDrawer && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowEditDrawer(false)}
          />
          {/* Drawer */}
          <div className="relative rounded-t-2xl bg-white px-4 pb-8 pt-4">
            {/* Handle */}
            <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-[#d1d5db]" />
            <p className="mb-4 text-[16px] font-bold text-black">
              Responsável pela retirada
            </p>
            <p className="mb-2 text-[12px] font-medium text-[#6b7280]">Nome completo</p>
            <input
              type="text"
              defaultValue="Tamy Müzel"
              className="mb-6 w-full rounded-lg border border-[#374151] bg-white px-4 py-3 text-[14px] font-medium text-black focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowEditDrawer(false)}
              className="flex h-12 w-full items-center justify-center rounded-[4px] bg-black text-[16px] font-bold text-white"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 px-4 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[14px] font-semibold text-black"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
        <div className="flex-1">
          <CtaButton
            onClick={handleContinue}
            icon={<ShieldCheck size={16} className="text-inherit" />}
          >
            Continuar
          </CtaButton>
        </div>
      </div>

      <div className="mt-auto px-4 pb-6">
        <Footer />
      </div>
    </div>
  );
}
