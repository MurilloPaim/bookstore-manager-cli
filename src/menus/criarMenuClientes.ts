import type { ClienteController } from "../controllers/ClienteController";
import type { Terminal } from "../utils/Terminal";
import { Menu } from "./Menu";

export function criarMenuClientes(controller: ClienteController, terminal: Terminal): Menu {
  return new Menu(
    "Clientes",
    [
      { rotulo: "Cadastrar cliente", executar: () => controller.cadastrar() },
      { rotulo: "Listar clientes", executar: () => controller.listar() },
      { rotulo: "Consultar cliente por ID", executar: () => controller.consultar() },
      { rotulo: "Atualizar cliente", executar: () => controller.atualizar() },
      { rotulo: "Remover cliente", executar: () => controller.remover() },
    ],
    "Voltar",
    terminal,
  );
}
