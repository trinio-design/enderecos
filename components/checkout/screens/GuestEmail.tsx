"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CtaButton from "../CtaButton";
import Footer from "../Footer";
import Header from "../Header";
import { LockIcon } from "../icons";

export default function GuestEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  const isValid = email.length > 0;

  function handleContinue() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("guestEmail", email);
    router.push(`/checkout/guest-dados?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 px-4 py-6">
      <Header total="R$ 670,10" quantity={3} />

      <h1 className="text-[24px] font-bold leading-[1.25] text-black">
        Olá, informe seu e-mail para finalizar a compra
      </h1>

      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          autoFocus
          className="w-full rounded-lg border border-[#374151] bg-white px-4 py-3 text-[14px] text-black placeholder:text-[#9ca3af] focus:outline-none"
        />
      </div>

      <CtaButton
        disabled={!isValid}
        onClick={handleContinue}
        icon={<LockIcon size={16} className="text-inherit" />}
      >
        Continuar
      </CtaButton>

      <div className="mt-auto pt-2">
        <Footer />
      </div>
    </div>
  );
}
