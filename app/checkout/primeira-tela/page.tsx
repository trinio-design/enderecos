import Link from "next/link";
import StoreLogo from "@/components/checkout/StoreLogo";

/**
 * Flow selector screen — used for preview/testing.
 * Shows two option cards: Guest and 1-click checkout flows.
 */
export default function PrimeiraTela() {
  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6]">
      <div className="relative flex min-h-screen w-full max-w-[393px] flex-col bg-white shadow-sm">
        <div className="flex flex-col gap-[120px] px-4 pt-8 pb-[120px]">
          {/* Logo */}
          <StoreLogo />

          {/* Body */}
          <div className="flex flex-col gap-8 w-full">
            <p className="font-bold text-[16px] leading-[24px] text-black">
              Escolha o fluxo
            </p>

            {/* Option cards */}
            <div className="flex flex-col gap-3 w-full">
              {/* Guest */}
              <Link
                href="/checkout/identidade"
                className="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors"
              >
                <span className="font-semibold text-[14px] leading-[20px] text-black">
                  Guest
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* 1-click */}
              <Link
                href="/checkout/identidade?flow=1click"
                className="flex items-center justify-between w-full rounded-lg border border-gray-300 bg-white p-4 hover:border-gray-400 transition-colors"
              >
                <span className="font-semibold text-[14px] leading-[20px] text-black">
                  1-click
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
