"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import { RefreshIcon, WhatsappIcon } from "../icons";

/**
 * Tela — OTP (confirmação de telefone via WhatsApp).
 */
export default function Otp() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  const complete = code.every((d) => d !== "");

  return (
    <div className="flex min-h-screen flex-col gap-8 px-4 py-6">
      <Header total="R$ 599,00" quantity={1} />

      <div className="flex flex-1 flex-col gap-6">
        {/* Greeting + instructions */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[20px] font-bold text-black">
            Olá, tamy{" "}
            <span className="text-[12px] font-normal text-ink-300">
              Não é você?{" "}
              <span className="cursor-pointer underline">Sair</span>
            </span>
          </h1>
          <p className="text-[14px] text-black">
            Digite o código enviado por Trinio® Checkout.
          </p>
          <p className="flex items-center gap-1.5 text-[14px] font-medium text-success">
            <WhatsappIcon size={18} />
            Whatsapp: 11 ****4342
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex justify-between gap-2">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              autoFocus={i === 0}
              className="h-12 w-12 rounded-card border border-hairline text-center text-[18px] font-semibold text-black outline-none focus:border-black focus:ring-0"
            />
          ))}
        </div>

        {/* CTA */}
        <CtaButton
          disabled={!complete}
          onClick={() => router.push("/checkout/revisao-retirada")}
        >
          Continuar
        </CtaButton>

        {/* Resend code */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 text-[13px] text-ink-300"
        >
          <RefreshIcon size={16} className="text-ink-300" />
          Receba novo código por WhatsApp, e-mail ou SMS em 5s
        </button>
      </div>

      <Footer backLabel="Voltar ao carrinho" />
    </div>
  );
}
