import type { Terminal } from "../utils/Terminal";
import { Menu } from "./Menu";

export function criarMenuPrincipal(terminal: Terminal): Menu {
  return new Menu("BookStore Manager CLI", [], "Encerrar aplicação", terminal);
}
