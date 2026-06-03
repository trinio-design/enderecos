import { notFound } from "next/navigation";

import { STEP_KEYS, STEPS, isStepKey } from "@/lib/steps";

export function generateStaticParams() {
  return STEP_KEYS.map((step) => ({ step }));
}

export default function CheckoutStepPage({
  params,
  searchParams,
}: {
  params: { step: string };
  searchParams: { _preview?: string };
}) {
  if (!isStepKey(params.step)) {
    notFound();
  }

  const Screen = STEPS[params.step];
  const isPreview = searchParams._preview === "1";

  // Modo preview (dentro do iframe do dashboard): sem wrapper cinza externo,
  // renderiza direto a tela no fundo branco.
  if (isPreview) {
    return (
      <div className="w-full bg-white">
        <Screen />
      </div>
    );
  }

  // Modo standalone: moldura mobile-first com fundo cinza de "device".
  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6]">
      <div className="relative flex min-h-screen w-full max-w-mobile flex-col bg-white shadow-sm">
        <Screen />
      </div>
    </main>
  );
}
