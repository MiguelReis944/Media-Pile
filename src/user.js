import { db } from "./sql.js";

class PerfilModel {
    constructor(db) {
        this.db = db;
        this.tabela = "perfil";
    }

    async buscar() {
        return this.db.query(`SELECT * FROM ${this.tabela} WHERE id = 1`);
    }

    async editar(dados) {
        // ignora campos vazios para não quebrar datas
        const filtrado = {};
        for (const chave in dados) {
            if (dados[chave] !== "") {
                filtrado[chave] = dados[chave];
            }
        }

        if (Object.keys(filtrado).length === 0) return;

        const campos = Object.keys(filtrado).map(c => `${c} = ?`).join(", ");
        const valores = Object.values(filtrado);

        return this.db.query(
            `UPDATE ${this.tabela} SET ${campos} WHERE id = 1`,
            valores
        );
    }
}

export const Perfil = new PerfilModel(db);