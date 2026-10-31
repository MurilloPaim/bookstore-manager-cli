import { criarMenuPrincipal } from "./menus/criarMenuPrincipal";
import { EntradaEncerradaError } from "./models/erros";
import { descreverErro, exibirErro } from "./utils/mensagens";
import { Terminal } from "./utils/Terminal";

async function main(): Promise<void> {
  const terminal = new Terminal();

  try {
    await criarMenuPrincipal(terminal).iniciar();
    console.log("\nAplicação encerrada. Até logo!");
  } catch (erro) {
    if (!(erro instanceof EntradaEncerradaError)) {
      exibirErro(descreverErro(erro));
      process.exitCode = 1;
    }
  } finally {
    terminal.fechar();
  }
}

void main();
