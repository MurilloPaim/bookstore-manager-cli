import { Autor } from "../models/Autor";
import { Livro } from "../models/Livro";
import type { IAutorRepository } from "../repositories/AutorRepository";
import type { ILivroRepository } from "../repositories/LivroRepository";

export interface RepositoriosAplicacao {
  autores: IAutorRepository;
  livros: ILivroRepository;
}

const autoresIniciais: Autor[] = [
  new Autor(1, "Machado de Assis", "Brasileira"),
  new Autor(2, "Clarice Lispector", "Brasileira"),
  new Autor(3, "Jorge Amado", "Brasileira"),
  new Autor(4, "George Orwell", "Britânica"),
  new Autor(5, "Agatha Christie", "Britânica"),
  new Autor(6, "Cecília Meireles", "Brasileira"),
];

const livrosIniciais: Livro[] = [
  new Livro(1, "Dom Casmurro", "9780000000001", 1899, 1, 3, 2),
  new Livro(2, "Memórias Póstumas de Brás Cubas", "9780000000002", 1881, 1, 2, 2),
  new Livro(3, "A Hora da Estrela", "9780000000003", 1977, 2, 1, 0),
  new Livro(4, "Capitães da Areia", "9780000000004", 1937, 3, 2, 1),
  new Livro(5, "Gabriela, Cravo e Canela", "9780000000005", 1958, 3, 2, 2),
  new Livro(6, "1984", "9780000000006", 1949, 4, 4, 3),
  new Livro(7, "A Revolução dos Bichos", "9780000000007", 1945, 4, 3, 3),
  new Livro(8, "Assassinato no Expresso do Oriente", "9780000000008", 1934, 5, 2, 2),
];

export async function carregarDadosIniciais(repositorios: RepositoriosAplicacao): Promise<void> {
  for (const autor of autoresIniciais) {
    await repositorios.autores.inserir(autor);
  }
  for (const livro of livrosIniciais) {
    await repositorios.livros.inserir(livro);
  }
}
