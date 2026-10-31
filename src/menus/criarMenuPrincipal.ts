import type { AutorController } from "../controllers/AutorController";
import type { ClienteController } from "../controllers/ClienteController";
import type { LivroController } from "../controllers/LivroController";
import type { Terminal } from "../utils/Terminal";
import { criarMenuAutores } from "./criarMenuAutores";
import { criarMenuClientes } from "./criarMenuClientes";
import { criarMenuLivros } from "./criarMenuLivros";
import { Menu } from "./Menu";

export interface ControllersAplicacao {
  autores: AutorController;
  livros: LivroController;
  clientes: ClienteController;
}

export function criarMenuPrincipal(controllers: ControllersAplicacao, terminal: Terminal): Menu {
  return new Menu(
    "BookStore Manager CLI",
    [
      { rotulo: "Autores", executar: () => criarMenuAutores(controllers.autores, terminal).iniciar() },
      { rotulo: "Livros", executar: () => criarMenuLivros(controllers.livros, terminal).iniciar() },
      { rotulo: "Clientes", executar: () => criarMenuClientes(controllers.clientes, terminal).iniciar() },
    ],
    "Encerrar aplicação",
    terminal,
  );
}
