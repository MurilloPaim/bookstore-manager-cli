import { Autor } from "../models/Autor";
import { Cliente } from "../models/Cliente";
import { Livro } from "../models/Livro";
import type { IAutorRepository } from "../repositories/AutorRepository";
import type { IClienteRepository } from "../repositories/ClienteRepository";
import type { ILivroRepository } from "../repositories/LivroRepository";

export interface RepositoriosAplicacao {
  autores: IAutorRepository;
  livros: ILivroRepository;
  clientes: IClienteRepository;
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

const clientesIniciais: Cliente[] = [
  new Cliente(1, "Ana Souza", "00000000101", "ana.souza@exemplo.com", "47990000001"),
  new Cliente(2, "Bruno Lima", "00000000202", "bruno.lima@exemplo.com", "47990000002"),
  new Cliente(3, "Carla Mendes", "00000000303", "carla.mendes@exemplo.com", "47990000003"),
  new Cliente(4, "Diego Rocha", "00000000404", "diego.rocha@exemplo.com", "47990000004"),
  new Cliente(5, "Elisa Martins", "00000000505", "elisa.martins@exemplo.com", "47990000005"),
];

export async function carregarDadosIniciais(repositorios: RepositoriosAplicacao): Promise<void> {
  for (const autor of autoresIniciais) {
    await repositorios.autores.inserir(autor);
  }
  for (const livro of livrosIniciais) {
    await repositorios.livros.inserir(livro);
  }
  for (const cliente of clientesIniciais) {
    await repositorios.clientes.inserir(cliente);
  }
}
