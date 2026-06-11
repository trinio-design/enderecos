import type { StepKey } from "./steps";

// ─── Definição de fluxos ──────────────────────────────────────────────────────

const FLOWS_DEF = {
  "1click-cep-retirada-single": {
    steps: ["otp", "loading", "revisao-retirada"] as StepKey[],
  },
  "guest-envio": {
    steps: ["guest-email", "guest-dados", "guest-entrega", "guest-pagamento"] as StepKey[],
  },
} satisfies Record<string, { steps: StepKey[] }>;

export type FlowId = keyof typeof FLOWS_DEF;

export const FLOWS: Record<FlowId, { steps: StepKey[] }> = FLOWS_DEF;

// ─── Match de fluxo ───────────────────────────────────────────────────────────

export function getFlowId(params: {
  cep: string | null;
  entrega: string | null;
  pacotes: string | null;
  flowType: "guest" | "1click";
}): FlowId | null {
  const { cep, entrega, pacotes, flowType } = params;

  if (flowType === "guest") {
    return "guest-envio";
  }

  if (
    cep === "true" &&
    entrega === "retirada" &&
    pacotes === "false" &&
    flowType === "1click"
  ) {
    return "1click-cep-retirada-single";
  }

  return null;
}

// ─── Navegação entre steps ────────────────────────────────────────────────────

export function getNextStepUrl(
  flowId: FlowId,
  currentStepIdx: number,
  currentParams: URLSearchParams
): string | null {
  const flow = FLOWS[flowId];
  const nextStep = flow?.steps[currentStepIdx + 1];
  if (!nextStep) return null;

  const params = new URLSearchParams(currentParams);
  params.set("stepIdx", String(currentStepIdx + 1));
  return `/checkout/${nextStep}?${params.toString()}`;
}

export function isFlowId(value: string | null): value is FlowId {
  return value !== null && value in FLOWS;
}
