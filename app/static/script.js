const API = "http://localhost:5000";

document.getElementById("formCliente").addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch(`${API}/cliente`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome: nome.value,
            telefone: telefone.value,
            email: email.value
        })
    });

    carregarClientes();
});

async function carregarClientes() {
    const res = await fetch(`${API}/cliente`);
    const data = await res.json();

    const lista = document.getElementById("listaClientes");
    lista.innerHTML = "";

    data.forEach(c => {
        lista.innerHTML += `<li>${c[1]} - ${c[2]}</li>`;
    });
}

document.getElementById("formPet").addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch(`${API}/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome_pet: nome_pet.value,
            tipo: tipo.value,
            raca: raca.value,
            idade: idade.value,
            id_cliente: id_cliente.value
        })
    });

    carregarPets();
});

async function carregarPets() {
    const res = await fetch(`${API}/pets`);
    const data = await res.json();

    const lista = document.getElementById("listaPets");
    lista.innerHTML = "";

    data.forEach(p => {
        lista.innerHTML += `<li>${p[1]} (${p[2]})</li>`;
    });
}

document.getElementById("formServico").addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch(`${API}/servicos`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            id_pet: id_pet.value,
            tipo: tipo_servico.value,
            data: data.value,
            valor: valor.value
        })
    });

    carregarServicos();
});

async function carregarServicos() {
    const res = await fetch(`${API}/servicos`);
    const data = await res.json();

    const lista = document.getElementById("listaServicos");
    lista.innerHTML = "";

    data.forEach(s => {
        lista.innerHTML += `<li>Pet ${s[1]} - ${s[2]} - R$${s[4]}</li>`;
    });
}

document.getElementById("formProduto").addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch(`${API}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome: nome_produto.value,
            descricao: descricao.value,
            preco: preco.value,
            quantidade: quantidade.value
        })
    });

    carregarProdutos();
});

async function carregarProdutos() {
    const res = await fetch(`${API}/produtos`);
    const data = await res.json();

    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    data.forEach(p => {
        lista.innerHTML += `<li>${p[1]} - R$${p[3]}</li>`;
    });
}

// carregarClientes();
// carregarPets();
// carregarServicos();
// carregarProdutos();