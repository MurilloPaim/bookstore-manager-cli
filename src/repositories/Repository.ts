import type { Entidade } from "../models/Entidade";

export interface Repository<T extends Entidade> {
  gerarProximoId(): Promise<number>;
  inserir(entidade: T): Promise<T>;
  listarTodos(): Promise<T[]>;
  buscarPorId(id: number): Promise<T | null>;
  atualizar(entidade: T): Promise<T>;
  remover(id: number): Promise<boolean>;
}
