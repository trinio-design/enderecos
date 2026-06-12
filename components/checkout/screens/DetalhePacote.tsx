"use client";

import { Package } from "lucide-react";
import { useCheckoutRouter } from "@/hooks/useCheckoutRouter";

export default function DetalhePacote() {
  const router = useCheckoutRouter();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Overlay — toca para fechar */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={() => router.back()}
        className="flex-1 bg-black/70"
      />

      {/* Drawer */}
      <div className="rounded-tl-[12px] rounded-tr-[12px] bg-white">
        {/* Drag handle */}
        <div className="flex items-center justify-center pb-2 pt-4">
          <div className="h-1 w-[45px] rounded-full bg-[#e5e7eb]" />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col gap-6 p-6">
          {/* Ícone */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(111,173,246,0.16)]">
            <Package size={38} strokeWidth={1.5} className="text-[#378add]" />
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-[24px] font-bold leading-tight text-black">
              Detalhes do pacote
            </p>

            <div className="flex flex-col gap-[18px]">
              {/* Pill */}
              <span className="inline-flex h-6 w-fit items-center gap-1.5 rounded-full bg-[#0a0a0a] px-2.5">
                <Package size={12} strokeWidth={1.8} className="text-white" />
                <span className="text-[10px] font-semibold text-white">Pacote 1</span>
              </span>

              {/* Tipo + preço */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-bold leading-5 text-black">Retirada em loja</p>
                  <p className="text-[12px] font-medium leading-5 text-black">Grátis</p>
                </div>
                <p className="text-[12px] font-medium leading-5 text-black">Em até 4 horas</p>
              </div>

              <div className="h-px w-full rounded bg-[#d1d5db]" />

              {/* Produtos */}
              <div className="flex flex-col gap-6">
                <p className="text-[14px] font-bold leading-5 text-black">Produtos</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src="/tenis.jpg"
                        alt="Produto"
                        width={62}
                        height={62}
                        className="h-[62px] w-[62px] rounded-[8px] border border-[#d1d5db] object-cover"
                      />
                      <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black">
                        <p className="text-[14px] font-black leading-none text-white">1</p>
                      </div>
                    </div>
                    <p className="w-[150px] text-[12px] font-bold leading-[1.3] text-black">
                      Anel New Diamond com nome muito longo
                    </p>
                  </div>
                  <p className="text-[14px] font-bold leading-5 text-black">R$1200,00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Voltar */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-12 w-full items-center justify-center rounded-[4px] bg-[#f3f4f6]"
          >
            <span className="text-[16px] font-bold leading-6 text-black">Voltar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
