import type { Autor } from "../models/Autor";

export function formatarAutor(autor: Autor): string {
  return `#${autor.id} - ${autor.nome} | Nacionalidade: ${autor.nacionalidade}`;
}
