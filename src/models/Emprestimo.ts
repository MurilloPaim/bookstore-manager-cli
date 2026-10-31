import type { Entidade } from "./Entidade";
import { RegraDeNegocioError } from "./erros";

export type StatusEmprestimo = "ATIVO" | "DEVOLVIDO";

export interface EmprestimoDetalhado {
  emprestimo: Emprestimo;
  tituloLivro: string;
  nomeCliente: string;
}

export class Emprestimo implements Entidade {
  private dataDaDevolucao: Date | null;

  constructor(
    public readonly id: number,
    public readonly livroId: number,
    public readonly clienteId: number,
    public readonly dataEmprestimo: Date,
    dataDevolucao: Date | null = null,
  ) {
    this.dataDaDevolucao = dataDevolucao;
  }

  public get dataDevolucao(): Date | null {
    return this.dataDaDevolucao;
  }

  public get status(): StatusEmprestimo {
    return this.dataDaDevolucao === null ? "ATIVO" : "DEVOLVIDO";
  }

  public estaAtivo(): boolean {
    return this.status === "ATIVO";
  }

  public registrarDevolucao(data: Date): void {
    if (!this.estaAtivo()) {
      throw new RegraDeNegocioError(`O empréstimo com ID ${this.id} já foi devolvido.`);
    }
    this.dataDaDevolucao = data;
  }
}
