import type { LivroController } from "../controllers/LivroController";
import type { Terminal } from "../utils/Terminal";
import { Menu } from "./Menu";

export function criarMenuLivros(controller: LivroController, terminal: Terminal): Menu {
  return new Menu(
    "Livros",
    [
      { rotulo: "Cadastrar livro", executar: () => controller.cadastrar() },
      { rotulo: "Listar livros", executar: () => controller.listar() },
      { rotulo: "Consultar livro por ID", executar: () => controller.consultar() },
      { rotulo: "Buscar livros por título", executar: () => controller.buscarPorTitulo() },
      { rotulo: "Atualizar livro", executar: () => controller.atualizar() },
      { rotulo: "Remover livro", executar: () => controller.remover() },
    ],
    "Voltar",
    terminal,
  );
}
