"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ControlPanel, { type Controls } from "./ControlPanel";
import PhoneMockup from "./PhoneMockup";

const DEFAULT_CONTROLS: Controls = {
  temCep: true,
  escolheuEntrega: true,
  tipoEntrega: "retirada",
  multiplosPacotes: false,
};

function buildControlParams(controls: Controls): URLSearchParams {
  return new URLSearchParams({
    entrega: controls.escolheuEntrega ? controls.tipoEntrega : "nenhuma",
    cep: String(controls.temCep),
    pacotes: String(controls.multiplosPacotes),
    _preview: "1",
  });
}

function buildCheckoutUrl(controls: Controls): string {
  const step =
    controls.escolheuEntrega && controls.tipoEntrega === "envio"
      ? "revisao-envio"
      : "revisao-retirada";
  return `/checkout/${step}?${buildControlParams(controls).toString()}`;
}

function buildFirstScreenUrl(controls: Controls): string {
  return `/checkout/primeira-tela?${buildControlParams(controls).toString()}`;
}

export default function Dashboard() {
  const [controls, setControls] = useState<Controls>(DEFAULT_CONTROLS);
  const [currentFrame, setCurrentFrame] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const flowStarted = useRef(false);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === "checkout-frame") {
        setCurrentFrame(e.data.step);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleIframeLoad = useCallback(() => {
    try {
      const pathname = iframeRef.current?.contentWindow?.location.pathname ?? "";
      const step = pathname.split("/").filter(Boolean).pop() ?? null;
      setCurrentFrame(step);
      if (pathname && pathname !== "/checkout/primeira-tela") {
        flowStarted.current = true;
      }
    } catch {
      // cross-origin, ignore
    }
  }, []);

  const handleControlsChange = useCallback((updater: React.SetStateAction<Controls>) => {
    setControls((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (iframeRef.current) {
        iframeRef.current.src = flowStarted.current
          ? buildCheckoutUrl(next)
          : buildFirstScreenUrl(next);
      }
      return next;
    });
  }, []);

  const handleReiniciar = useCallback(() => {
    flowStarted.current = false;
    setCurrentFrame(null);
    if (iframeRef.current) {
      iframeRef.current.src = buildFirstScreenUrl(controls);
    }
  }, [controls]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">

      {/* ── Sidebar de controles ───────────────────────────── */}
      <aside className="flex h-full w-[272px] shrink-0 flex-col overflow-hidden border-r border-border bg-card shadow-sm">
        <ControlPanel controls={controls} onChange={handleControlsChange} />
      </aside>

      {/* ── Área principal ─────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Frame label */}
        <div className="flex h-8 shrink-0 items-center justify-end px-5">
          {currentFrame && (
            <span className="font-mono text-[10px] text-muted-foreground">
              {currentFrame}
            </span>
          )}
        </div>

        {/* Mockup centralizado */}
        <div className="flex flex-1 items-center justify-center overflow-hidden bg-background px-8 pb-8">
          <PhoneMockup>
            <iframe
              ref={iframeRef}
              src={buildFirstScreenUrl(DEFAULT_CONTROLS)}
              className="h-full w-full border-0 bg-white"
              title="Checkout preview"
              onLoad={handleIframeLoad}
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </PhoneMockup>
        </div>

        {/* Rodapé com botão Reiniciar */}
        <div className="flex h-12 shrink-0 items-center justify-center border-t border-border bg-card">
          <button
            onClick={handleReiniciar}
            className="flex items-center gap-1.5 rounded-md px-4 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M13.65 2.35A8 8 0 1 0 15 8h-2a6 6 0 1 1-1.06-3.39L9 7h6V1l-1.35 1.35Z" fill="currentColor"/>
            </svg>
            Reiniciar
          </button>
        </div>

      </main>
    </div>
  );
}
