import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { db } from "./sql.js";

import { Jogos } from "./modelobase.js"
import { Series } from "./modelobase.js"
import { Livros } from "./modelobase.js"
import { Filmes } from "./modelobase.js"
import { Perfil } from "./user.js";


const modelos = {
  jogos: Jogos,
  livros: Livros,
  series: Series,
  filmes: Filmes
};

const PORT = 3028
const app = express()
app.use(express.json())


//coisas que fazem o path retornar o front e ler o form
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'front')))
app.use(express.urlencoded({ extended: true }))

//porta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'))
})

//pega os dados do perfil
app.get("/perfil", async (req, res) => {
    const [[perfil]] = await Perfil.buscar();

    const [[{ jogos }]] = await db.query("SELECT COUNT(*) AS jogos FROM jogos");
    const [[{ filmes }]] = await db.query("SELECT COUNT(*) AS filmes FROM filmes");
    const [[{ series }]] = await db.query("SELECT COUNT(*) AS series FROM series");
    const [[{ livros }]] = await db.query("SELECT COUNT(*) AS livros FROM livros");

    const total = jogos + filmes + series + livros;

    res.json({
        nome: perfil.nome,
        foto: perfil.foto_url,
        estatisticas: {
            total_logs: total,
            jogos,
            filmes,
            series,
            livros
        }
    });
});

//lugar que edita o perfil
app.get("/perfil/editar", (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'editar-perfil.html'))
})

//edita os dados do perfil
app.post("/perfil/edicao", async (req, res) => {
    await Perfil.editar(req.body);
    res.redirect("/");
});

//lugar onde aparece as coisas cadastradas
app.get("/log", async (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'log.html'))
})

//lugar onde voce adiciona as coisas
app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'cadastro.html'))
})

// rota de logs
app.get("/logs", async (req, res) => {
  const [jogos] = await Jogos.buscarTodos()
  const [series] = await Series.buscarTodos()
  const [livros] = await Livros.buscarTodos()
  const [filmes] = await Filmes.buscarTodos()

  res.json({ jogos, series, livros, filmes })
})

// rota de logs
app.get("/logs/:tipo", async (req, res) => {
  const tipo = req.params.tipo;

  if (!["jogos","livros","series","filmes"].includes(tipo)) {
    return res.status(400).json({ error: "Tabela inválida" });
  }

  const model = modelos[tipo];
  const [rows] = await model.buscarTodos();
  res.json(rows);
})

// rota de log único
app.get("/log/:tipo/:id", async (req, res) => {
  const model = modelos[req.params.tipo]
  const id = req.params.id

  const [rows] = await model.buscarLog(id)
  res.json(rows[0])
})

app.get("/logs/log/:tipo/:id", async (req, res) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  res.redirect(`/log.html?tipo=${tipo}&id=${id}`);
});
//editar log+
app.get("/editar/:tipo/:id", async (req, res) => {
  const tipo = req.params.tipo;
  const id = req.params.id;
  res.redirect(`/editar.html?tipo=${tipo}&id=${id}`);
});

// editar
app.post("/edicao/:tipo/:id", async (req, res) => {
  const model = modelos[req.params.tipo]
  const tipo = req.params.tipo
  const id = req.params.id

  await model.editar(id, req.body)
  res.redirect(`/`);
})

// adicionar
app.post("/adicionar", async (req, res) => {
  const model = modelos[req.body.tipo]

  const dados = { ...req.body }
  delete dados.tipo
  if(dados.concluido==0){
      delete dados.nota
  }

  await model.adicionar(dados)
  res.redirect("/")
})

// deletar
app.get("/delete/:tipo/:id", async (req, res) => {
  const model = modelos[req.params.tipo]
  await model.delete(req.params.id)
  res.redirect("/")
})

//busca por status se ta concluido ou pendente
app.get("/logs/:tipo/status/:estado", async (req, res) => {
  const model = modelos[req.params.tipo];
  const estado = req.params.estado;

  if (!model) return res.status(400).json({ error: "Tipo inválido" });

  const [rows] = await model.buscarPorStatus(estado);
  res.json(rows);
});

//mudar status log
app.get("/logs/:tipo/:id/status/:estado", async (req, res) => {
  const model = modelos[req.params.tipo];
  const id = req.params.id;
  const estado = req.params.estado;

  if (!model) return res.status(400).json({ error: "Tipo inválido" });

  await model.editarStatus(id, estado);
  res.redirect(`/log.html?tipo=${req.params.tipo}&id=${id}`);;
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});

