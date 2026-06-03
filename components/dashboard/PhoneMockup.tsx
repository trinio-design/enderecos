"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

// Dimensões reais do iPhone 15 Pro
const PHONE_W = 393;
const PHONE_H = 852;
const ISLAND_TOP = 12;
const ISLAND_W = 126;
const ISLAND_H = 37;
const STATUS_BAR_H = 59; // espaço reservado para status bar + dynamic island

/**
 * Moldura de iPhone (Dynamic Island) que escala automaticamente para caber
 * na altura disponível da janela, sem transbordamento.
 */
export default function PhoneMockup({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function compute() {
      if (!containerRef.current) return;
      const availableH = containerRef.current.clientHeight - 32; // padding vertical
      const availableW = containerRef.current.clientWidth - 32;
      const scaleH = availableH / PHONE_H;
      const scaleW = availableW / PHONE_W;
      setScale(Math.min(scaleH, scaleW, 1)); // nunca escala pra cima de 1:1
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const scaledW = PHONE_W * scale;
  const scaledH = PHONE_H * scale;

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
    >
      {/* Wrapper de escala */}
      <div
        style={{
          width: scaledW,
          height: scaledH,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Caixa original em tamanho 1:1, escalada via transform */}
        <div
          style={{
            width: PHONE_W,
            height: PHONE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {/* Corpo do celular */}
          <div
            style={{
              width: PHONE_W,
              height: PHONE_H,
              borderRadius: 52,
              background: "#1a1a1a",
              overflow: "hidden",
              position: "relative",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.12), 0 0 0 3px #111, 0 30px 80px rgba(0,0,0,0.9)",
            }}
          >
            {/* Botões laterais */}
            <div style={{ position: "absolute", left: -3, top: 120, width: 3, height: 34, background: "#333", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: -3, top: 168, width: 3, height: 64, background: "#333", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: -3, top: 242, width: 3, height: 64, background: "#333", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", right: -3, top: 160, width: 3, height: 80, background: "#333", borderRadius: "0 2px 2px 0" }} />

            {/* Tela */}
            <div
              style={{
                position: "absolute",
                inset: 2,
                borderRadius: 50,
                background: "#fff",
                overflow: "hidden",
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  position: "absolute",
                  top: ISLAND_TOP,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: ISLAND_W,
                  height: ISLAND_H,
                  background: "#000",
                  borderRadius: 20,
                  zIndex: 20,
                }}
              />

              {/* Status bar (espaço reservado) */}
              <div style={{ height: STATUS_BAR_H, flexShrink: 0 }} />

              {/* Área de conteúdo — scrollável */}
              <div
                style={{
                  position: "absolute",
                  top: STATUS_BAR_H,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
