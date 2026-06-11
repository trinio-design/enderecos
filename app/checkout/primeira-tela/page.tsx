import Link from "next/link";
import { Albert_Sans } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { getFlowId, FLOWS } from "@/lib/flows";
import styles from "./primeira-tela.module.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

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

  return flowType === "1click"
    ? `/checkout/otp?${params.toString()}`
    : `/checkout/identidade?${params.toString()}`;
}

const OPTIONS = [
  {
    flowType: "guest" as const,
    label: "Opção 01",
    title: "Guest",
    desc: "Continue sem criar conta.",
  },
  {
    flowType: "1click" as const,
    label: "Opção 02",
    title: "1-click",
    desc: "Endereço e pagamento salvos.",
  },
];

export default function PrimeiraTela({
  searchParams,
}: {
  searchParams: { cep?: string; entrega?: string; pacotes?: string; _preview?: string };
}) {
  return (
    <main
      className={albertSans.className}
      style={{
        display: "flex",
        minHeight: "100svh",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          minHeight: "100svh",
          width: "100%",
          maxWidth: 375,
          flexDirection: "column",
          background: "#fff",
        }}
      >
        {/* Top bar — indicador de carrinho à direita */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "28px 24px 0" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 12, fontWeight: 300, color: "#888", lineHeight: 1.4 }}>
              3 itens
            </span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#000", lineHeight: 1.4 }}>
              R$ 1.290
            </span>
          </div>
        </div>

        {/* Header */}
        <div style={{ paddingTop: 44, paddingLeft: 24, paddingRight: 24 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888",
              margin: "0 0 12px",
            }}
          >
            Checkout
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#000",
              margin: 0,
            }}
          >
            Como você quer continuar?
          </h1>
        </div>

        {/* Divider */}
        <div style={{ margin: "32px 24px 0", borderTop: "0.5px solid #e5e5e5" }} />

        {/* Options */}
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          {OPTIONS.map(({ flowType, label, title, desc }) => (
            <Link
              key={flowType}
              href={buildFlowUrl(flowType, searchParams)}
              className={styles.optionRow}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "24px 0",
                borderBottom: "0.5px solid #e5e5e5",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#888",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "#000",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 300,
                    lineHeight: 1.55,
                    color: "#888",
                  }}
                >
                  {desc}
                </span>
              </div>
              <ArrowRight className={styles.arrow} size={16} strokeWidth={1.5} color="#000" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            paddingBottom: 40,
            paddingTop: 32,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 300,
              letterSpacing: "0.1em",
              color: "#999",
              margin: 0,
            }}
          >
            Compra 100% segura e protegida
          </p>
        </div>
      </div>
    </main>
  );
}
