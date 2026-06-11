"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import GuestTabs from "../GuestTabs";
import Header from "../Header";
import { CheckIcon, LockIcon } from "../icons";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  suffix,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  suffix?: React.ReactNode;
}) {
  const filled = value.length > 0;
  const baseClass =
    "w-full rounded-lg px-3 py-3 text-[14px] focus:outline-none border transition-colors";
  const stateClass = disabled
    ? "bg-[#e5e7eb] text-[#6b7280] border-transparent cursor-not-allowed"
    : filled
    ? "bg-[#f3f4f6] text-black border-transparent focus:bg-white focus:border-[#374151]"
    : "bg-[#f3f4f6] text-black border-transparent focus:bg-white focus:border-[#374151]";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-[#6b7280]">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClass} ${stateClass} ${suffix ? "pr-10" : ""}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

const CEP_MOCK = {
  cep: "22260-010",
  logradouro: "Rua João da Silva",
  numero: "72",
  bairro: "Botafogo",
  cidade: "Rio de Janeiro",
  estado: "RJ",
};

export default function GuestDados() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("guestEmail") ?? "victoria.scholte@trinio.co";
  const hasCep = searchParams.get("cep") === "true";

  const [celular, setCelular] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState(hasCep ? CEP_MOCK.cep : "");
  const [numero, setNumero] = useState(hasCep ? CEP_MOCK.numero : "");
  const [complemento, setComplemento] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  const cepFilled = cep.replace(/\D/g, "").length === 8;
  const isValid = celular && nome && cpf && cep && (!cepFilled || numero);

  function handleContinue() {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/checkout/guest-entrega?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-4 pt-6 pb-4">
        <Header total="R$ 670,10" quantity={3} />
      </div>

      <GuestTabs active="dados" />

      <div className="flex flex-col gap-4 px-4 pt-6 pb-4">
        <p className="text-[14px] font-semibold text-black">Dados pessoais</p>

        <Field label="E-mail" value={email} disabled />
        <Field
          label="Celular"
          value={celular}
          onChange={setCelular}
          placeholder="(11) 99999-9999"
          type="tel"
        />
        <Field
          label="Nome completo"
          value={nome}
          onChange={setNome}
          placeholder="Nome completo"
        />
        <Field
          label="CPF"
          value={cpf}
          onChange={setCpf}
          placeholder="000.000.000-00"
        />

        <p className="mt-2 text-[14px] font-semibold text-black">
          Local de entrega
        </p>

        <Field
          label="CEP"
          value={cep}
          onChange={setCep}
          placeholder="00000-000"
        />

        {cepFilled && (
          <>
            <Field
              label="Endereço"
              value={CEP_MOCK.logradouro}
              disabled
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <Field
                  label="Número"
                  value={numero}
                  onChange={setNumero}
                  placeholder="000"
                />
              </div>
              <div className="flex-1">
                <Field
                  label="Complemento"
                  value={complemento}
                  onChange={setComplemento}
                  placeholder="Complemento"
                />
              </div>
            </div>
            <Field label="Bairro" value={CEP_MOCK.bairro} disabled />
            <div className="flex gap-2">
              <div className="flex-[2]">
                <Field label="Cidade" value={CEP_MOCK.cidade} disabled />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-medium text-[#6b7280]">
                    Estado
                  </label>
                  <div className="relative">
                    <select
                      disabled
                      className="w-full appearance-none rounded-lg border border-transparent bg-[#e5e7eb] px-3 py-3 text-[14px] text-[#6b7280] focus:outline-none"
                      value={CEP_MOCK.estado}
                    >
                      <option>{CEP_MOCK.estado}</option>
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
          </>
        )}

        <button
          type="button"
          onClick={() => setNewsletter((v) => !v)}
          className="flex items-center gap-2 py-1"
        >
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded ${
              newsletter ? "bg-[#38b74c]" : "border border-[#d1d5db]"
            }`}
          >
            {newsletter && <CheckIcon size={8} className="text-white" />}
          </span>
          <span className="text-[12px] font-medium text-[#6b7280]">
            Quero receber promoções
          </span>
        </button>
      </div>

      <div className="px-4 pb-4">
        <CtaButton
          disabled={!isValid}
          onClick={handleContinue}
          icon={<LockIcon size={16} className="text-inherit" />}
        >
          Continuar
        </CtaButton>
      </div>

      <div className="mt-auto px-4 pb-6">
        <Footer />
      </div>
    </div>
  );
}
