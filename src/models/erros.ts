export class ErroAplicacao extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = new.target.name;
  }
}

export class EntradaInvalidaError extends ErroAplicacao {}

export class RegistroNaoEncontradoError extends ErroAplicacao {}

export class RegistroDuplicadoError extends ErroAplicacao {}

export class RegraDeNegocioError extends ErroAplicacao {}

export class EntradaEncerradaError extends Error {
  constructor() {
    super("A entrada do terminal foi encerrada.");
    this.name = "EntradaEncerradaError";
  }
}
