import { EntradaInvalidaError } from "../models/erros";

const ANO_MINIMO_PUBLICACAO = 1000;

export function exigirTexto(valor: string, campo: string): string {
  const texto = valor.trim();
  if (texto === "") {
    throw new EntradaInvalidaError(`O campo "${campo}" é obrigatório.`);
  }
  return texto;
}

export function converterInteiro(valor: string, campo: string): number {
  const texto = valor.trim();
  const numero = Number(texto);
  if (!/^\d+$/.test(texto) || !Number.isSafeInteger(numero)) {
    throw new EntradaInvalidaError(`O campo "${campo}" deve ser um número inteiro válido.`);
  }
  return numero;
}

export function converterIdentificador(valor: string, campo: string): number {
  const numero = converterInteiro(valor, campo);
  if (numero < 1) {
    throw new EntradaInvalidaError(`O campo "${campo}" deve ser maior que zero.`);
  }
  return numero;
}

export function validarAnoPublicacao(ano: number): number {
  const anoAtual = new Date().getFullYear();
  if (ano < ANO_MINIMO_PUBLICACAO || ano > anoAtual) {
    throw new EntradaInvalidaError(`O ano de publicação deve estar entre ${ANO_MINIMO_PUBLICACAO} e ${anoAtual}.`);
  }
  return ano;
}

export function normalizarDigitos(valor: string, campo: string, tamanhosAceitos: number[]): string {
  const digitos = valor.replace(/\D/g, "");
  if (!tamanhosAceitos.includes(digitos.length)) {
    throw new EntradaInvalidaError(`O campo "${campo}" deve ter ${tamanhosAceitos.join(" ou ")} dígitos.`);
  }
  return digitos;
}

export function normalizarEmail(valor: string): string {
  const email = exigirTexto(valor, "E-mail").toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new EntradaInvalidaError("Informe um e-mail válido, como nome@exemplo.com.");
  }
  return email;
}

export function textosIguais(primeiro: string, segundo: string): boolean {
  return primeiro.trim().toLocaleLowerCase("pt-BR") === segundo.trim().toLocaleLowerCase("pt-BR");
}
