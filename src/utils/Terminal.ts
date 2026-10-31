import { createInterface } from "node:readline";
import type { Interface } from "node:readline";
import { EntradaEncerradaError } from "../models/erros";

interface LeituraPendente {
  resolver: (linha: string) => void;
  rejeitar: (erro: Error) => void;
}

export class Terminal {
  private readonly leitor: Interface;
  private readonly linhasRecebidas: string[] = [];
  private leituraPendente: LeituraPendente | null = null;
  private encerrado = false;

  constructor() {
    this.leitor = createInterface({ input: process.stdin, output: process.stdout });
    this.leitor.on("line", (linha) => this.receberLinha(linha));
    this.leitor.on("close", () => this.encerrarEntrada());
  }

  public perguntar(texto: string): Promise<string> {
    this.leitor.setPrompt(texto);
    this.leitor.prompt();
    return this.lerProximaLinha();
  }

  public async perguntarComPadrao(rotulo: string, valorAtual: string): Promise<string> {
    const resposta = await this.perguntar(`${rotulo} [${valorAtual}]: `);
    return resposta.trim() === "" ? valorAtual : resposta;
  }

  public fechar(): void {
    this.leitor.close();
  }

  private lerProximaLinha(): Promise<string> {
    const linha = this.linhasRecebidas.shift();
    if (linha !== undefined) {
      return Promise.resolve(linha);
    }
    if (this.encerrado) {
      return Promise.reject(new EntradaEncerradaError());
    }
    return new Promise((resolver, rejeitar) => {
      this.leituraPendente = { resolver, rejeitar };
    });
  }

  private receberLinha(linha: string): void {
    if (this.leituraPendente) {
      const { resolver } = this.leituraPendente;
      this.leituraPendente = null;
      resolver(linha);
      return;
    }
    this.linhasRecebidas.push(linha);
  }

  private encerrarEntrada(): void {
    this.encerrado = true;
    if (this.leituraPendente) {
      const { rejeitar } = this.leituraPendente;
      this.leituraPendente = null;
      rejeitar(new EntradaEncerradaError());
    }
  }
}
