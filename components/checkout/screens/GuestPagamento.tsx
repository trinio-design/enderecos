"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import GuestTabs from "../GuestTabs";
import Header from "../Header";
import { ArrowLeftIcon, CheckIcon, CreditCardIcon, LockIcon } from "../icons";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const filled = value.length > 0;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-[#6b7280]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-3 text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none transition-colors ${
          filled
            ? "border-transparent bg-[#f3f4f6]"
            : "border-transparent bg-[#f3f4f6] focus:border-[#374151] focus:bg-white"
        }`}
      />
    </div>
  );
}

const PARCELAS = [
  "Selecione as parcelas",
  "1 x R$670,10 (sem juros)",
  "2 x R$335,05 (sem juros)",
  "3 x R$223,37 (sem juros)",
  "4 x R$167,53 (sem juros)",
];

export default function GuestPagamento() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [parcelas, setParcelas] = useState(PARCELAS[0]);
  const [saveInfo, setSaveInfo] = useState(true);

  const isValid = cardNumber && expiry && cvv && cardName && parcelas !== PARCELAS[0];

  function handlePagar() {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/checkout/loading?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-4 pt-6 pb-4">
        <Header total="R$ 670,10" quantity={3} />
      </div>

      <GuestTabs active="pagamento" />

      <div className="flex flex-col gap-4 px-4 pt-6 pb-4">
        <p className="text-[14px] font-semibold text-black">
          Forma de pagamento
        </p>

        {/* Cupom */}
        <button
          type="button"
          className="flex items-center gap-2 text-[14px] font-medium text-[#9ca3af]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d1d5db] text-[#9ca3af] text-[14px] font-medium leading-none">
            +
          </span>
          Cupom ou vale-presente
        </button>

        {/* Cartão de crédito */}
        <div className="rounded-lg border border-black p-4">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#38b74c]">
              <CheckIcon size={8} className="text-white" />
            </span>
            <span className="text-[14px] font-semibold text-black">
              Cartão de crédito
            </span>
            <CreditCardIcon size={18} className="ml-auto text-[#9ca3af]" />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#6b7280]">
                Número do cartão
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className={`w-full rounded-lg border pl-3 pr-10 py-3 text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none transition-colors ${
                    cardNumber
                      ? "border-transparent bg-[#f3f4f6]"
                      : "border-[#374151] bg-white"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  <CreditCardIcon size={16} />
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Field
                  label="Data de validade"
                  value={expiry}
                  onChange={setExpiry}
                  placeholder="MM/AA"
                />
              </div>
              <div className="flex-1">
                <Field
                  label="CVV"
                  value={cvv}
                  onChange={setCvv}
                  placeholder="000"
                />
              </div>
            </div>

            <Field
              label="Nome do titular do cartão"
              value={cardName}
              onChange={setCardName}
              placeholder="Nome conforme no cartão"
            />

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#6b7280]">
                Parcelas
              </label>
              <div className="relative">
                <select
                  value={parcelas}
                  onChange={(e) => setParcelas(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-transparent bg-[#f3f4f6] px-3 py-3 text-[14px] text-black focus:outline-none"
                >
                  {PARCELAS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Salvar info */}
        <button
          type="button"
          onClick={() => setSaveInfo((v) => !v)}
          className="flex items-center gap-2 py-1"
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${
              saveInfo ? "bg-[#38b74c]" : "border border-[#d1d5db]"
            }`}
          >
            {saveInfo && <CheckIcon size={8} className="text-white" />}
          </span>
          <span className="text-[12px] font-medium text-[#6b7280]">
            Salvar informações para compras rápidas
          </span>
        </button>

        <p className="text-[12px] font-medium text-[#9ca3af]">
          Ao concluir você concorda com os{" "}
          <span className="underline">Termos</span> e{" "}
          <span className="underline">Privacidade</span>
        </p>
      </div>

      <div className="flex items-center gap-3 px-4 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[14px] font-semibold text-black"
        >
          <ArrowLeftIcon size={16} className="text-black" />
          Voltar
        </button>
        <div className="flex-1">
          <CtaButton
            disabled={!isValid}
            onClick={handlePagar}
            icon={<LockIcon size={16} className="text-inherit" />}
          >
            Pagar R$ 670,10
          </CtaButton>
        </div>
      </div>

      <div className="mt-auto px-4 pb-6">
        <Footer showRecaptcha />
      </div>
    </div>
  );
}
