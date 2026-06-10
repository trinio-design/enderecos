import Link from "next/link";
import StoreLogo from "@/components/checkout/StoreLogo";
import { getFlowId, FLOWS } from "@/lib/flows";

function buildFlowUrl(
  flowType: "guest" | "1click",
  sp: { cep?: string; entrega?: string; pacotes?: string; _preview?: string }
): string {
  const flowId = getFlowId({
    cep: sp.cep ?? null,
    entrega: sp.entrega ?? null,
    pacotes: sp.pacotes ?? null,
    flowType,
  });

  const params = new URLSearchParams();
  if (sp.cep) params.set("cep", sp.cep);
  if (sp.entrega) params.set("entrega", sp.entrega);
  if (sp.pacotes) params.set("pacotes", sp.pacotes);
  if (sp._preview) params.set("_preview", sp._preview);

  if (flowId) {
    params.set("flowId", flowId);
    params.set("stepIdx", "0");
    const firstStep = FLOWS[flowId].steps[0];
    return `/checkout/${firstStep}?${params.toString()}`;
  }

  // fallback sem fluxo mapeado
  return flowType === "1click"
    ? `/checkout/otp?${params.toString()}`
    : `/checkout/identidade?${params.toString()}`;
}

export default function PrimeiraTela({
  searchParams,
}: {
  searchParams: { cep?: string; entrega?: string; pacotes?: string; _preview?: string };
}) {
  const guestUrl = buildFlowUrl("guest", searchParams);
  const clickUrl = buildFlowUrl("1click", searchParams);

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6]">
      <div className="relative flex min-h-screen w-full max-w-[393px] flex-col bg-white shadow-sm">
        <div className="flex flex-col gap-[120px] px-4 pt-8 pb-[120px]">
          <StoreLogo />

          <div className="flex flex-col gap-8 w-full">
            <p className="font-bold text-[16px] leading-[24px] text-black">
              Escolha o fluxo
            </p>

            <div className="flex flex-col gap-3 w-full">
              <Link
                href={guestUrl}
                className="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors"
              >
                <span className="font-semibold text-[14px] leading-[20px] text-black">
                  Guest
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link
                href={clickUrl}
                className="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors"
              >
                <span className="font-semibold text-[14px] leading-[20px] text-black">
                  1-click
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
