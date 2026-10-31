import { ErroAplicacao } from "../models/erros";

export function exibirSucesso(mensagem: string): void {
  console.log(`[OK] ${mensagem}`);
}

export function exibirAviso(mensagem: string): void {
  console.log(`[AVISO] ${mensagem}`);
}

export function exibirErro(mensagem: string): void {
  console.log(`[ERRO] ${mensagem}`);
}

export function descreverErro(erro: unknown): string {
  return erro instanceof ErroAplicacao ? erro.message : "Ocorreu um erro inesperado. Tente novamente.";
}

export function exibirLista<T>(itens: T[], mensagemVazia: string, formatar: (item: T) => string): void {
  if (itens.length === 0) {
    exibirAviso(mensagemVazia);
    return;
  }
  itens.forEach((item) => console.log(formatar(item)));
}
