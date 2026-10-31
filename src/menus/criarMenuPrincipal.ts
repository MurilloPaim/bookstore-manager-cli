import type { AutorController } from "../controllers/AutorController";
import type { Terminal } from "../utils/Terminal";
import { criarMenuAutores } from "./criarMenuAutores";
import { Menu } from "./Menu";

export interface ControllersAplicacao {
  autores: AutorController;
}

export function criarMenuPrincipal(controllers: ControllersAplicacao, terminal: Terminal): Menu {
  return new Menu(
    "BookStore Manager CLI",
    [{ rotulo: "Autores", executar: () => criarMenuAutores(controllers.autores, terminal).iniciar() }],
    "Encerrar aplicação",
    terminal,
  );
}
