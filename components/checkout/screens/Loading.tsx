"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "../Footer";
import Header from "../Header";
import { getNextStepUrl, isFlowId } from "@/lib/flows";

/**
 * Tela 1 — Loading.
 * Busca (simulada) dos dados salvos do usuário e segue para a revisão do pedido.
 */
export default function Loading() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const flowId = searchParams.get("flowId");
  const stepIdx = Number(searchParams.get("stepIdx") ?? "0");
  const nextUrl =
    isFlowId(flowId)
      ? getNextStepUrl(flowId, stepIdx, searchParams)
      : "/checkout/revisao-retirada";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(nextUrl ?? "/checkout/revisao-retirada");
    }, 1000);
    return () => clearTimeout(timer);
  }, [router, nextUrl]);

  return (
    <div className="flex min-h-screen flex-col px-4 py-6">
      <Header total="R$ 670,10" quantity={1} />

      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="spinner" role="status" aria-label="Carregando" />
        <p className="w-[273px] text-[20px] font-normal leading-7 text-black">
          Carregando seus dados salvos anteriormente...
        </p>
      </div>

      <Footer />
    </div>
  );
}
