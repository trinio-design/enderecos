"use client";

import { useEffect } from "react";

export function FrameReporter({ step }: { step: string }) {
  useEffect(() => {
    window.parent.postMessage({ type: "checkout-frame", step }, "*");
  }, [step]);

  return null;
}
