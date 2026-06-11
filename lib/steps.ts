import type { ComponentType } from "react";

import Loading from "@/components/checkout/screens/Loading";
import RevisaoRetirada from "@/components/checkout/screens/RevisaoRetirada";
import RevisaoEnvio from "@/components/checkout/screens/RevisaoEnvio";
import Otp from "@/components/checkout/screens/Otp";
import Carrinho from "@/components/checkout/screens/Carrinho";
import TrocarLoja from "@/components/checkout/screens/TrocarLoja";
import BuscaGeolocalizacao from "@/components/checkout/screens/BuscaGeolocalizacao";
import OpcoesRetirada from "@/components/checkout/screens/OpcoesRetirada";
import TrocarFrete from "@/components/checkout/screens/TrocarFrete";
import AlterarFrete from "@/components/checkout/screens/AlterarFrete";
import AlterarEndereco from "@/components/checkout/screens/AlterarEndereco";
import AlterarEnderecoCobranca from "@/components/checkout/screens/AlterarEnderecoCobranca";
import GuestEmail from "@/components/checkout/screens/GuestEmail";
import GuestDados from "@/components/checkout/screens/GuestDados";
import GuestEntrega from "@/components/checkout/screens/GuestEntrega";
import GuestPagamento from "@/components/checkout/screens/GuestPagamento";
import GuestRetiradaEntrega from "@/components/checkout/screens/GuestRetiradaEntrega";

export type StepKey =
  | "loading"
  | "revisao-retirada"
  | "revisao-envio"
  | "otp"
  | "carrinho"
  | "trocar-loja"
  | "busca-geolocalizacao"
  | "opcoes-retirada"
  | "trocar-frete"
  | "alterar-frete"
  | "alterar-endereco"
  | "alterar-endereco-cobranca"
  | "guest-email"
  | "guest-dados"
  | "guest-entrega"
  | "guest-pagamento"
  | "guest-trocar-loja"
  | "guest-retirada-entrega";

export const STEPS: Record<StepKey, ComponentType> = {
  loading: Loading,
  "revisao-retirada": RevisaoRetirada,
  "revisao-envio": RevisaoEnvio,
  otp: Otp,
  carrinho: Carrinho,
  "trocar-loja": TrocarLoja,
  "busca-geolocalizacao": BuscaGeolocalizacao,
  "opcoes-retirada": OpcoesRetirada,
  "trocar-frete": TrocarFrete,
  "alterar-frete": AlterarFrete,
  "alterar-endereco": AlterarEndereco,
  "alterar-endereco-cobranca": AlterarEnderecoCobranca,
  "guest-email": GuestEmail,
  "guest-dados": GuestDados,
  "guest-entrega": GuestEntrega,
  "guest-pagamento": GuestPagamento,
  "guest-trocar-loja": TrocarLoja,
  "guest-retirada-entrega": GuestRetiradaEntrega,
};

export const STEP_KEYS = Object.keys(STEPS) as StepKey[];

export function isStepKey(value: string): value is StepKey {
  return value in STEPS;
}
