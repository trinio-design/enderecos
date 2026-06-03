import { notFound } from "next/navigation";

import { STEP_KEYS, STEPS, isStepKey } from "@/lib/steps";

export function generateStaticParams() {
  return STEP_KEYS.map((step) => ({ step }));
}

export default function CheckoutStepPage({
  params,
}: {
  params: { step: string };
}) {
  if (!isStepKey(params.step)) {
    notFound();
  }

  const Screen = STEPS[params.step];

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6]">
      {/* Moldura mobile-first (375px) */}
      <div className="relative flex min-h-screen w-full max-w-mobile flex-col bg-white shadow-sm">
        <Screen />
      </div>
    </main>
  );
}
