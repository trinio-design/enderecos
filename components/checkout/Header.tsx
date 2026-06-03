import MiniCart from "./MiniCart";
import StoreLogo from "./StoreLogo";

/**
 * Header padrão do checkout: logo da loja à esquerda + mini-carrinho à direita.
 */
export default function Header({
  total,
  quantity,
}: {
  total?: string;
  quantity?: number;
}) {
  return (
    <header className="flex items-center justify-between">
      <StoreLogo />
      <MiniCart total={total} quantity={quantity} />
    </header>
  );
}
