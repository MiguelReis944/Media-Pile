
const params = new URLSearchParams(window.location.search);
const tipo = params.get("tipo");
const id = params.get("id");
const card = document.createElement("div");
const log = document.querySelector(".log");

fetch(`/log/${tipo}/${id}`)
    .then(res => res.json())
    .then(data => {
        card.classList.add("log-container");
        card.innerHTML = `
            <div class="log-imagem">
                <img src="${data.capa_url}" alt="${data.titulo}">
            </div>
            <div class="log-info">
                <h2 class="log-titulo">${data.titulo}</h2>
                <div class="log-detalhes">
                    <p class="log-nota"><strong>Nota:</strong> ${data.nota ?? "—"}</p>
                    <p class="log-nota"><strong>Comentario:</strong> ${data.comentario}</p>
                    <p class="log-status"><strong>Status:</strong> ${data.concluido == 1 ? "Concluído" : "Pendente"}</p>
                </div>
                <div class="log-botoes">
                    <button class="btn-status" onclick="location.href='/logs/${tipo}/${id}/status/${data.concluido}'">Mudar Status</button>
                    <button class="btn-editar" onclick="location.href='/editar/${tipo}/${id}'">Editar Log</button>
                    <button class="btn-excluir" onclick="location.href='/delete/${tipo}/${id}'">Excluir Log</button>
                </div>
                <button class="btn-concluir" onclick="location.href='/'">Concluído</button>
            </div>
        `;

        log.appendChild(card);
});
