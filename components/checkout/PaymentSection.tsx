"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PaymentCard from "./PaymentCard";
import PillButton from "./PillButton";
import {
  BarcodeIcon,
  CreditCardIcon,
  PixIcon,
  PlusIcon,
} from "./icons";

type Payment = "credito" | "pix" | "boleto";

/**
 * Bloco "Forma de pagamento" + "Endereço de cobrança", reutilizado nas
 * telas de revisão (retirada e envio).
 */
export default function PaymentSection() {
  const router = useRouter();
  const [payment, setPayment] = useState<Payment>("pix");

  return (
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
  );
}
