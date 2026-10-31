import { EntradaEncerradaError } from "../models/erros";
import { descreverErro, exibirAviso, exibirErro } from "../utils/mensagens";
import type { Terminal } from "../utils/Terminal";

export interface OpcaoMenu {
  rotulo: string;
  executar: () => Promise<void>;
}

export class Menu {
  constructor(
    private readonly titulo: string,
    private readonly opcoes: OpcaoMenu[],
    private readonly rotuloSaida: string,
    private readonly terminal: Terminal,
  ) {}

  public async iniciar(): Promise<void> {
    while (true) {
      this.exibir();
      const escolha = (await this.terminal.perguntar("Escolha uma opção: ")).trim();
      if (escolha === "0") {
        return;
      }
      await this.executarOpcao(escolha);
    }
  }

  private exibir(): void {
    console.log(`\n=== ${this.titulo} ===`);
    this.opcoes.forEach((opcao, indice) => console.log(`${indice + 1} - ${opcao.rotulo}`));
    console.log(`0 - ${this.rotuloSaida}`);
  }

  private async executarOpcao(escolha: string): Promise<void> {
    const opcao = /^\d+$/.test(escolha) ? this.opcoes[Number(escolha) - 1] : undefined;
    if (!opcao) {
      exibirAviso("Opção inválida. Escolha um número do menu.");
      return;
    }
    try {
      await opcao.executar();
    } catch (erro) {
      if (erro instanceof EntradaEncerradaError) {
        throw erro;
      }
      exibirErro(descreverErro(erro));
    }
  }
}
