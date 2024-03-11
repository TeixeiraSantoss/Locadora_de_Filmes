import { Genero } from "./genero.model";

export interface Filme{
    filmeID: number;
    nome: string;
    classif_ind: number;
    ano_lanc: number;
    alugado: boolean;
    genero?: Genero;
    generoID: number;
}