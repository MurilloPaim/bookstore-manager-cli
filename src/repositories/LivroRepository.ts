import type { Livro } from "../models/Livro";
import type { Repository } from "./Repository";
import { RepositoryEmMemoria } from "./RepositoryEmMemoria";

export interface ILivroRepository extends Repository<Livro> {
  buscarPorIsbn(isbn: string): Promise<Livro | null>;
  buscarPorTitulo(trecho: string): Promise<Livro[]>;
  listarPorAutor(autorId: number): Promise<Livro[]>;
}

export class LivroRepository extends RepositoryEmMemoria<Livro> implements ILivroRepository {
  public async buscarPorIsbn(isbn: string): Promise<Livro | null> {
    const livros = await this.listarTodos();
    return livros.find((livro) => livro.isbn === isbn) ?? null;
  }

  public async buscarPorTitulo(trecho: string): Promise<Livro[]> {
    const trechoNormalizado = trecho.trim().toLocaleLowerCase("pt-BR");
    const livros = await this.listarTodos();
    return livros.filter((livro) => livro.titulo.toLocaleLowerCase("pt-BR").includes(trechoNormalizado));
  }

  public async listarPorAutor(autorId: number): Promise<Livro[]> {
    const livros = await this.listarTodos();
    return livros.filter((livro) => livro.autorId === autorId);
  }
}
