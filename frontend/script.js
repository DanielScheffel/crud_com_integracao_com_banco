const API_URL = "/api/cars";

const form = document.getElementById("form-carro");

const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const anoInput = document.getElementById("ano");


const listaCarros = document.getElementById("lista-carros");

async function listarCarros() {

    try {
        const response = await fetch(API_URL);

        const carros = await response.json();

        listaCarros.innerHTML = "";

        if(carros.length === 0) {
            listaCarros.innerHTML = `
                <div class="alert alert-info">
                    Nenhum carro cadastrado.
                </div>
            `;

            return;
        }

        carros.forEach(carro => {
            const div = document.createElement("div");

            div.classList.add(
                "carro",
                "d-flex",
                "justify-content-between",
                "align-items-center",
            );

            div.innerHTML = `
                <div>
                    <h5 class="mb-1">
                        ${carro.marca} ${carro.modelo}
                    </h5>

                    <span class="text-muted">
                        Ano: ${carro.ano}
                    </span>
                </div>

                <div>
                    <button class="btn btn-warning btn-sm me-2" onclick=!editarCarro(${carro.id})>
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="excluirCarro(${carro.id})">
                        Excluir
                    </button>
                </div>
            `;

            listaCarros.appendChild(div);
        });
    } catch (error) {
        console.log("Erro ao listar carros:", error);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const marca = marcaInput.value;
    const modelo = modeloInput.value;
    const ano = anoInput.value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                marca: marca,
                modelo: modelo,
                ano: ano
            })
        });

        if(!response.ok) {
            throw new Error("Erro ao cadastrar carro");
        }

        form.reset();

        listarCarros();
    } catch (error) {
        console.log("Erro ao cadastrar carro:", error);
    }
})


async function editarCarro(id) {

    try {
        const response = await fetch(`${API_URL}/${id}`);

        if(!response.ok) {
            throw new Error("Erro ao buscar carro");
        }

        const carro = await response.json();

        document.getElementById("id-editar").value = id;
        document.getElementById("marca-editar").value = carro.marca;
        document.getElementById("modelo-editar").value = carro.modelo;
        document.getElementById("ano-editar").value = carro.ano;

        const modal = new bootstrap.Modal(
            document.getElementById("modalEditar")
        );

        modal.show();
    } catch (error) {
        console.log("Erro ao buscar carro:", error);
    }

}

const formEditar = document.getElementById("form-editar");

formEditar.addEventListener('submit', async function(event){
    event.preventDefault();

    const id = document.getElementById("id-editar").value;
    const marca = document.getElementById("marca-editar").value;
    const modelo = document.getElementById("modelo-editar").value;
    const ano = document.getElementById("ano-editar").value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                marca: marca,
                modelo: modelo,
                ano: Number(ano)
            })
        });

        if(!response.ok) {
            throw new Error("Erro ao atualizar carro");
        }

        const modalElement = document.getElementById("modalEditar");

        const modal = bootstrap.Modal.getInstance(modalElement);

        modal.hide();

        listarCarros();
    } catch (error) {
        console.log("Erro ao atualizar carro:", error);
    }
})

async function excluirCarro(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este carro?");

    if(!confirmar) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if(!response.ok) {
            throw new Error("Erro ao excluir carro");
        }

        listarCarros();
    } catch (error) {
        console.log("Erro ao excluir carro:", error);
    }
}

listarCarros();