"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import PaymentCard from "../PaymentCard";
import PillButton from "../PillButton";
import {
  BarcodeIcon,
  CreditCardIcon,
  LockIcon,
  PixIcon,
  PlusIcon,
  StoreIcon,
} from "../icons";

type Payment = "credito" | "pix" | "boleto";

/**
 * Tela 2 — Revisão do pedido (modo Retirada em loja). Tela principal do fluxo.
 */
export default function RevisaoRetirada() {
  const router = useRouter();
  const [payment, setPayment] = useState<Payment>("pix");

  return (
    <div className="flex min-h-screen flex-col gap-10 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <div className="flex flex-col gap-6">
        {/* Título + identificação */}
        <h1 className="text-[22px] font-bold leading-7 text-ink-700">
          Revisar dados do pedido
        </h1>

        <div className="flex flex-col">
          <p className="text-[14px] font-medium leading-5 text-black">
            victoria.scholte@gmail.com
          </p>
          <p className="text-[9px] font-medium text-ink-300">
            Não é você?{" "}
            <button
              type="button"
              onClick={() => router.push("/checkout/otp")}
              className="font-bold underline"
            >
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
            <PillButton onClick={() => router.push("/checkout/opcoes-retirada")}>
              Editar
            </PillButton>
          </div>

          {/* Card de retirada */}
          <div className="flex flex-col gap-6 overflow-hidden rounded-card border border-hairline bg-white">
            <div className="flex flex-col gap-[14px] px-4 pt-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <p className="text-[14px] font-bold leading-5 text-black">
                    Retirada em Loja
                  </p>
                  <p className="text-[14px] leading-5 text-black">
                    Disponível em até 4 horas
                  </p>
                </div>
                <p className="text-[14px] font-bold leading-5 text-black">
                  Grátis
                </p>
              </div>

              <Divider />

              <div className="flex flex-col gap-2">
                <p className="text-[14px] font-semibold leading-[18px] text-black">
                  Loja Copacabana
                </p>
                <p className="text-[14px] leading-[18px] text-black">
                  Av. Nossa Sra. de Copacabana, 722, Copacabana - Rio de Janeiro
                </p>
              </div>
            </div>

            <p className="px-4 text-[12px] font-medium leading-normal text-ink-500">
              Para garantir a segurança da sua experiência, o pedido poderá ser
              retirado apenas pelo titular da compra, mediante apresentação de
              documento oficial com foto.
            </p>

            <button
              type="button"
              onClick={() => router.push("/checkout/trocar-loja")}
              className="flex items-center justify-center gap-3 border-t border-hairline bg-ink-100 py-3"
            >
              <StoreIcon size={18} className="text-black" />
              <span className="text-[12px] font-semibold leading-[18px] text-black">
                Escolher outra loja
              </span>
            </button>
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
              Ao clicar em ”Pagar”, seu código Pix será gerado.
            </PaymentCard>
            <PaymentCard
              label="Boleto"
              icon={<BarcodeIcon size={24} />}
              selected={payment === "boleto"}
              onSelect={() => setPayment("boleto")}
            />
          </div>

          {/* Endereço de cobrança */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-bold leading-5 text-black">
                Endereço de cobrança
              </p>
              <PillButton onClick={() => router.push("/checkout/alterar-endereco")}>
                Alterar
              </PillButton>
            </div>
            <div className="text-[14px] font-medium leading-[18px] text-black">
              <p>Rua Maria da Silva, 80</p>
              <p>Freguesia do Ó - São Paulo, SP - CEP: 09439-030</p>
            </div>
          </div>
        </section>

        <CtaButton
          icon={<LockIcon size={24} />}
          onClick={() => router.push("/checkout/otp")}
        >
          Finalizar compra
        </CtaButton>
      </div>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
