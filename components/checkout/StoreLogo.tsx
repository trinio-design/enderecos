/**
 * Logo da loja (wordmark). O fluxo de referência usa "OSKLEN".
 * Recriado como texto estilizado para não depender de assets externos.
 */
export default function StoreLogo({
  name = "OSKLEN",
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  return (
    <span
      className={`select-none font-bold uppercase leading-none text-black ${className}`}
      style={{ letterSpacing: "0.04em", fontSize: 20 }}
    >
      {name}
    </span>
  );
}
