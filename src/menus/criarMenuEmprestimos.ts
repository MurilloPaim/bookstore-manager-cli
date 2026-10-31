import type { EmprestimoController } from "../controllers/EmprestimoController";
import type { Terminal } from "../utils/Terminal";
import { Menu } from "./Menu";

export function criarMenuEmprestimos(controller: EmprestimoController, terminal: Terminal): Menu {
  return new Menu(
    "Empréstimos",
    [
      { rotulo: "Realizar empréstimo", executar: () => controller.realizar() },
      { rotulo: "Registrar devolução", executar: () => controller.registrarDevolucao() },
      { rotulo: "Listar empréstimos", executar: () => controller.listar() },
      { rotulo: "Listar empréstimos ativos", executar: () => controller.listarAtivos() },
      { rotulo: "Consultar empréstimo por ID", executar: () => controller.consultar() },
    ],
    "Voltar",
    terminal,
  );
}
