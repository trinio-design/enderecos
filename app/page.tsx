import { redirect } from "next/navigation";

export default function Home() {
  // A entrada do fluxo é a tela de carregamento.
  redirect("/checkout/loading");
}
