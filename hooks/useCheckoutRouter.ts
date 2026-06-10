"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Wraps router.push preserving _preview param so screens inside the
 * dashboard iframe stay in preview mode after each navigation.
 */
export function useCheckoutRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preview = searchParams.get("_preview");

  const push = useCallback(
    (path: string) => {
      if (!preview) {
        router.push(path);
        return;
      }
      const [pathname, existingSearch] = path.split("?");
      const params = new URLSearchParams(existingSearch ?? "");
      params.set("_preview", preview);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, preview]
  );

  return { push, back: () => router.back() };
}
