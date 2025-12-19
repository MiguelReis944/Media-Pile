
const container = document.querySelector("#conteiner");

function carregar(tipo) {
    fetch(`/logs/${tipo}`)
        .then(res => res.json())
        .then(data => {
            // data já é o array, não precisa de data[tipo]
            const lista = data;

            container.innerHTML = ""; // limpa os antigos

            lista.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("conteudo");

                card.innerHTML = `
                    <a href="/logs/log/${tipo}/${item.id}"><img src="${item.capa_url}"></a>
                    <div class="descricao">
                    <h2>${item.titulo}</h2>
                    <p>Nota: ${item.nota ?? "—"}</p>
                    <p>Status: ${item.concluido == 1 ? "Concluído" : "Pendente"} </p>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar:", error);
        });

        switch(tipo){
            case "jogos":
                document.getElementById("jogos").style.textDecoration = "underline var(--corPrincipal) .35vh";
                document.getElementById("jogos").style.textUnderlineOffset = ".65vh";
                document.getElementById("filmes").style.textDecoration = "none";
                document.getElementById("filmes").style.textUnderlineOffset = "none";
                document.getElementById("series").style.textDecoration = "none";
                document.getElementById("series").style.textUnderlineOffset = "none";
                document.getElementById("livros").style.textDecoration = "none";
                document.getElementById("livros").style.textUnderlineOffset = "none";
                break

            case "filmes":
                document.getElementById("jogos").style.textDecoration = "none";
                document.getElementById("jogos").style.textUnderlineOffset = "none";
                document.getElementById("filmes").style.textDecoration = "underline var(--corPrincipal) .35vh";
                document.getElementById("filmes").style.textUnderlineOffset = ".65vh";
                document.getElementById("series").style.textDecoration = "none";
                document.getElementById("series").style.textUnderlineOffset = "none";
                document.getElementById("livros").style.textDecoration = "none";
                document.getElementById("livros").style.textUnderlineOffset = "none";
                break

            case "series":
                document.getElementById("jogos").style.textDecoration = "none";
                document.getElementById("jogos").style.textUnderlineOffset = "none";
                document.getElementById("filmes").style.textDecoration = "none";
                document.getElementById("filmes").style.textUnderlineOffset = "none";
                document.getElementById("series").style.textDecoration = "underline var(--corPrincipal) .35vh";
                document.getElementById("series").style.textUnderlineOffset = ".65vh";
                document.getElementById("livros").style.textDecoration = "none";
                document.getElementById("livros").style.textUnderlineOffset = "none";
                break

            case "livros":
                document.getElementById("jogos").style.textDecoration = "none";
                document.getElementById("jogos").style.textUnderlineOffset = "none";
                document.getElementById("filmes").style.textDecoration = "none";
                document.getElementById("filmes").style.textUnderlineOffset = "none";
                document.getElementById("series").style.textDecoration = "none";
                document.getElementById("series").style.textUnderlineOffset = "none";
                document.getElementById("livros").style.textDecoration = "underline var(--corPrincipal) .35vh";
                document.getElementById("livros").style.textUnderlineOffset = ".65vh";
                break
        };
}

// carregar categorias nos botões
document.querySelector(".midia button:nth-child(1)")
    .addEventListener("click", () => carregar("jogos"));
document.querySelector(".midia button:nth-child(2)")
    .addEventListener("click", () => carregar("filmes"));
document.querySelector(".midia button:nth-child(3)")
    .addEventListener("click", () => carregar("series"));
document.querySelector(".midia button:nth-child(4)")
    .addEventListener("click", () => carregar("livros"));

function perfil() {
    fetch("/perfil")
        .then(res => res.json())
        .then(data => {
            document.querySelector(".user").innerHTML = `
                    <img class="userImg" src="${data.foto}" alt="">
                    <h1>${data.nome}<a href="editar-perfil.html"><img src="https://cdn-icons-png.freepik.com/512/2774/2774738.png" alt=""></a></h1>


                `;
                        document.querySelector(".cocozinho").innerHTML = `

                    <p>Jogos: ${data.estatisticas.jogos}<br>Filmes: ${data.estatisticas.filmes}<br>Séries: ${data.estatisticas.series}<br>Livros: ${data.estatisticas.livros}<br>Total de Logs: ${data.estatisticas.total_logs}</p>

                `;
        })
        .catch(error => {
            console.error("Erro ao carregar perfil:", error);
        });
}


perfil()
carregar("jogos");