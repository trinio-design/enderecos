"use client";

import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import ControlPanel, { type Controls } from "./ControlPanel";
import PhoneMockup from "./PhoneMockup";

const DEFAULT_CONTROLS: Controls = {
  temCep: true,
  escolheuEntrega: true,
  tipoEntrega: "retirada",
  multiplosPacotes: false,
};

function buildCheckoutUrl(controls: Controls): string {
  const step =
    controls.escolheuEntrega && controls.tipoEntrega === "envio"
      ? "revisao-envio"
      : "revisao-retirada";

  const params = new URLSearchParams({
    entrega: controls.escolheuEntrega ? controls.tipoEntrega : "nenhuma",
    cep: String(controls.temCep),
    pacotes: String(controls.multiplosPacotes),
    _preview: "1",
  });

  return `/checkout/${step}?${params.toString()}`;
}

export default function Dashboard() {
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = buildCheckoutUrl(controls);
    }
  }, [controls]);

  const previewUrl = buildCheckoutUrl(controls);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">

      {/* ── Sidebar de controles ───────────────────────────── */}
      <aside className="flex h-full w-[272px] shrink-0 flex-col overflow-hidden border-r border-border bg-card shadow-sm">
        <ControlPanel controls={controls} onChange={setControls} />
      </aside>

      {/* ── Área principal ─────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Topbar com URL atual */}
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
          <span className="text-xs text-muted-foreground">Preview</span>
          <Separator orientation="vertical" className="h-4" />
          <code className="select-all text-[11px] text-muted-foreground">
            localhost:3000{previewUrl}
          </code>
        </div>

        {/* Mockup centralizado */}
        <div className="flex flex-1 items-center justify-center overflow-hidden bg-background p-8">
          <PhoneMockup>
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="h-full w-full border-0 bg-white"
              title="Checkout preview"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </PhoneMockup>
        </div>

      </main>
    </div>
  );
}
