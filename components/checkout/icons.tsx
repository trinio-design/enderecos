/**
 * Ícones do fluxo de checkout, recriados como SVG inline (currentColor).
 * Evitam dependência dos assets servidos pelo Figma em localhost e
 * funcionam em produção (Vercel) sem pacotes externos.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
  };
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M3 5h2l1.6 9.3a1.5 1.5 0 0 0 1.48 1.2h7.74a1.5 1.5 0 0 0 1.47-1.18L19 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M6 8h12l-1 11a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 9V7a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 2.5 5 5.2v5c0 4 2.9 7.7 7 8.8 4.1-1.1 7-4.8 7-8.8v-5L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 11.8 11.2 13.6 14.8 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoreIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 9.5 5.2 5h13.6L20 9.5a2.4 2.4 0 0 1-4 1.8 2.4 2.4 0 0 1-4 0 2.4 2.4 0 0 1-4 0 2.4 2.4 0 0 1-4-1.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 11.5V19h14v-7.5M10 19v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CreditCardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PixIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3.2 8.5 6.7l3.5 3.5 3.5-3.5L12 3.2ZM6.7 8.5 3.2 12l3.5 3.5L10.2 12 6.7 8.5ZM17.3 8.5 13.8 12l3.5 3.5L20.8 12l-3.5-3.5ZM12 13.8 8.5 17.3 12 20.8l3.5-3.5L12 13.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BarcodeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 6v12M7 6v12M9.5 6v12M12 6v12M14.5 6v12M17 6v12M20 6v12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m16 16 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M19 12H5m0 0 6-6m-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 12h14m0 0-6-6m6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14 8.5 10.5 12 14 15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 20h4l10-10a2 2 0 0 0-2.8-2.8L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.5 6.5 17.5 10.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M5 7h14M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7M7 7l.8 11.2A1.5 1.5 0 0 0 9.3 19.6h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.7 2.7 4.2 3.6 2 .8 2.5.6 2.9.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2-.1-.1-.3-.2-.6-.4-.3-.2-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.3-.6.8-.7.9-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.8-.7-1.3-1.5-1.4-1.7-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4H9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M20 11a8 8 0 0 0-14.5-4M4 5v3h3M4 13a8 8 0 0 0 14.5 4M20 19v-3h-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M6 6 18 18M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 4v16M3 8.5l9 5 9-5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 6.5 16.5 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M2 8h14v10H2V8ZM16 11h3.5L22 14.5V18h-6V11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="18" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3 2.5 20.5h19L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

/** Marca Trinio (gota arredondada) usada na assinatura "Compra segura". */
export function TrinioMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#fe4f30" />
      <path
        d="M12 6.5 16 12a4 4 0 1 1-8 0l4-5.5Z"
        fill="#ffffff"
      />
    </svg>
  );
}
