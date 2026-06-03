"use client";

import { useRouter } from "next/navigation";

import AddressBox from "../AddressBox";
import CtaButton from "../CtaButton";
import Divider from "../Divider";
import Footer from "../Footer";
import Header from "../Header";
import FreightCard from "../FreightCard";
import PaymentSection from "../PaymentSection";
import SegmentToggle from "../SegmentToggle";
import { LockIcon } from "../icons";

/**
 * Tela — Trocar frete (seleção de frete único no modo Envio).
 */
export default function TrocarFrete() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 620,10" quantity={3} />

      <h1 className="text-[22px] font-bold text-ink-700">Revisar dados do pedido</h1>
      <div>
        <p className="text-[14px] font-medium text-black">victoria.scholte@gmail.com</p>
        <p className="text-[9px] text-ink-300">
          Não é você? <span className="font-bold underline">Sair</span>
        </p>
      </div>

      <Divider />

      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-black">Entrega ou retirada</h2>
        <SegmentToggle
          options={[
            { key: "envio", label: "Envio" },
            { key: "retirada", label: "Retirada" },
          ]}
          value="envio"
          onChange={(key) =>
            key === "retirada" && router.push("/checkout/opcoes-retirada")
          }
        />
      </div>

      <AddressBox
        title="Endereço do envio"
        lines={["Rua Lauro Muller, 116 – piso 3 – Lj 331 –", "Botafogo, Rio de Janeiro"]}
        editHref="/checkout/alterar-endereco"
      />

      <FreightCard
        name="Frete expresso"
        price="R$14,90"
        eta="Chegará até 18/09/26"
        selected
      />

      <Divider />

      <PaymentSection />

      <CtaButton
        icon={<LockIcon size={24} />}
        onClick={() => router.push("/checkout/otp")}
      >
        Finalizar compra
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
