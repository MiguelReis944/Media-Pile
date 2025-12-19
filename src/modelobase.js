import { db } from "./sql.js"

class modelobase {
    constructor(db, tipo) {
        this.db = db
        this.tipo = tipo
    }

    buscarTodos() {
        return this.db.query(`SELECT * FROM ${this.tipo} ORDER BY nota DESC`)
    }

    buscarPorStatus(concluido) {
        return this.db.query(
            `SELECT * FROM ${this.tipo} WHERE concluido = ? ORDER BY nota DESC`, [concluido]
        );
    }

    editarStatus(id, concluido) {
        
        const novoValor = concluido == 1 ? 0 : 1;

        return this.db.query(
            `UPDATE ${this.tipo} SET concluido = ? WHERE id = ?`,
            [novoValor, id]
        );
    }

    buscarLog(id) {
        return this.db.query(`SELECT * FROM ${this.tipo} WHERE id = ?`, [id])
    }

    editar(id, dados) {
        const campos = Object.keys(dados)
        const valores = Object.values(dados).map(v => v === "" ? null : v);

        const set = campos.map(campo => `${campo} = ?`).join(", ")

        return this.db.query(
            `UPDATE ${this.tipo} SET ${set} WHERE id = ?`,
            [...valores, id]
        )
    }

    adicionar(dados) {
        const campos = Object.keys(dados)
        const valores = Object.values(dados).map(v => v === "" ? null : v);

        const placeholders = campos.map(() => "?").join(", ")

        return this.db.query(
            `INSERT INTO ${this.tipo} (${campos.join(", ")}) VALUES (${placeholders})`,
            valores
        )
    }

    delete(id) {
        return this.db.query(`DELETE FROM ${this.tipo} WHERE id = ?`, [id])
    }
}

export const Jogos = new modelobase(db, "jogos")
export const Series = new modelobase(db, "series")
export const Livros = new modelobase(db, "livros")
export const Filmes = new modelobase(db, "filmes")