"use client";

import { useState } from "react";
import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

import CtaButton from "../CtaButton";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import PaymentCard from "../PaymentCard";
import PillButton from "../PillButton";
import {
  BarcodeIcon,
  CreditCardIcon,
  EditIcon,
  LockIcon,
  PixIcon,
  PlusIcon,
} from "../icons";

type Payment = "credito" | "pix" | "boleto";

// ── Freight display card (read-only) ─────────────────────────────────────────

function FreightDisplay({
  name,
  eta,
  price,
}: {
  name: string;
  eta: string;
  price: string;
}) {
  return (
    <div className="flex w-full items-start justify-between rounded-card border border-[rgba(0,0,0,0.16)] bg-white p-4 text-[14px] leading-5 text-black">
      <div className="flex flex-col">
        <p className="font-bold">{name}</p>
        <p className="font-normal">{eta}</p>
      </div>
      <p className="shrink-0 font-bold">{price}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

/**
 * Tela — Revisão do pedido (modo Envio). node 4222-8988
 */
export default function RevisaoEnvio() {
  const router = useCheckoutRouter();
  const [payment, setPayment] = useState<Payment>("pix");

  return (
    <div className="flex min-h-screen flex-col gap-10 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <div className="flex flex-col gap-6">
        <h1 className="text-[22px] font-bold leading-7 text-ink-700">
          Revisar dados do pedido
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <p className="text-[14px] font-medium leading-5 text-black">
            victoria.scholte@gmail.com
          </p>
          <p className="text-[9px] font-medium text-ink-300">
            Não é você?{" "}
            <button type="button" className="font-bold underline">
              Sair
            </button>
          </p>
        </div>

        <Divider />

        {/* Entrega ou retirada */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold leading-6 text-black">
              Entrega ou retirada
            </h2>
            <PillButton onClick={() => router.push("/checkout/trocar-frete")}>
              Editar
            </PillButton>
          </div>

          {/* Address box + freight */}
          <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3 rounded-[4px] bg-[#f3f4f6] px-3 py-3">
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-semibold text-black">
                Endereço do envio
              </p>
              <p className="text-[12px] leading-[1.3] text-ink-500">
                Rua João da Silva, 123 - Ap. 32
                <br />
                Botafogo, Rio de Janeiro
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/checkout/alterar-endereco")}
              aria-label="Editar endereço"
              className="shrink-0"
            >
              <EditIcon size={20} className="text-black" />
            </button>
          </div>

          {/* Selected freight */}
          <FreightDisplay
            name="Frete expresso"
            eta="Chegará até 18/09/26"
            price="R$14,90"
          />
          </div>
        </section>

        <Divider />

        {/* Forma de pagamento */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-[14px]">
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold leading-6 text-black">
                Forma de pagamento
              </h2>
              <PillButton>Editar</PillButton>
            </div>
            <button type="button" className="flex items-center gap-2">
              <PlusIcon size={16} className="text-ink-400" />
              <span className="text-[14px] font-semibold text-ink-400">
                Cupom ou vale-presente
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <PaymentCard
              label="Cartão de crédito"
              icon={<CreditCardIcon size={24} />}
              selected={payment === "credito"}
              onSelect={() => setPayment("credito")}
            />
            <PaymentCard
              label="Pix"
              icon={<PixIcon size={22} />}
              selected={payment === "pix"}
              onSelect={() => setPayment("pix")}
            >
              {`Ao clicar em "Pagar", seu código Pix será gerado.`}
            </PaymentCard>
            <PaymentCard
              label="Boleto"
              icon={<BarcodeIcon size={24} />}
              selected={payment === "boleto"}
              onSelect={() => setPayment("boleto")}
            />
          </div>
        </section>

        <CtaButton icon={<LockIcon size={24} />}>
          Finalizar compra
        </CtaButton>
      </div>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
