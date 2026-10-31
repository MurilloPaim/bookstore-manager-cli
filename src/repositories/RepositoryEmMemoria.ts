import type { Entidade } from "../models/Entidade";
import type { Repository } from "./Repository";

export abstract class RepositoryEmMemoria<T extends Entidade> implements Repository<T> {
  private readonly registros = new Map<number, T>();
  private ultimoId = 0;

  public async gerarProximoId(): Promise<number> {
    return this.ultimoId + 1;
  }

  public async inserir(entidade: T): Promise<T> {
    this.registros.set(entidade.id, entidade);
    this.ultimoId = Math.max(this.ultimoId, entidade.id);
    return entidade;
  }

  public async listarTodos(): Promise<T[]> {
    return Array.from(this.registros.values());
  }

  public async buscarPorId(id: number): Promise<T | null> {
    return this.registros.get(id) ?? null;
  }

  public async atualizar(entidade: T): Promise<T> {
    this.registros.set(entidade.id, entidade);
    return entidade;
  }

  public async remover(id: number): Promise<boolean> {
    return this.registros.delete(id);
  }
}
