import type { AutorController } from "../controllers/AutorController";
import type { Terminal } from "../utils/Terminal";
import { Menu } from "./Menu";

export function criarMenuAutores(controller: AutorController, terminal: Terminal): Menu {
  return new Menu(
    "Autores",
    [
      { rotulo: "Cadastrar autor", executar: () => controller.cadastrar() },
      { rotulo: "Listar autores", executar: () => controller.listar() },
      { rotulo: "Consultar autor por ID", executar: () => controller.consultar() },
      { rotulo: "Atualizar autor", executar: () => controller.atualizar() },
      { rotulo: "Remover autor", executar: () => controller.remover() },
    ],
    "Voltar",
    terminal,
  );
}
