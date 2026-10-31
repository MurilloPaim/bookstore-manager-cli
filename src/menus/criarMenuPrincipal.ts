import type { AutorController } from "../controllers/AutorController";
import type { LivroController } from "../controllers/LivroController";
import type { Terminal } from "../utils/Terminal";
import { criarMenuAutores } from "./criarMenuAutores";
import { criarMenuLivros } from "./criarMenuLivros";
import { Menu } from "./Menu";

export interface ControllersAplicacao {
  autores: AutorController;
  livros: LivroController;
}

export function criarMenuPrincipal(controllers: ControllersAplicacao, terminal: Terminal): Menu {
  return new Menu(
    "BookStore Manager CLI",
    [
      { rotulo: "Autores", executar: () => criarMenuAutores(controllers.autores, terminal).iniciar() },
      { rotulo: "Livros", executar: () => criarMenuLivros(controllers.livros, terminal).iniciar() },
    ],
    "Encerrar aplicação",
    terminal,
  );
}
