"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "../Footer";
import Header from "../Header";

/**
 * Tela 1 — Loading.
 * Busca (simulada) dos dados salvos do usuário e segue para a revisão do pedido.
 */
export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/checkout/revisao-retirada");
    }, 2200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col px-4 py-6">
      <Header total="R$ 670,10" quantity={1} />

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 text-center">
        <div className="spinner" role="status" aria-label="Carregando" />
        <p className="text-[20px] font-medium leading-7 text-black">
          Carregando seus dados salvos anteriormente...
        </p>
      </div>

      <Footer />
    </div>
  );
}
