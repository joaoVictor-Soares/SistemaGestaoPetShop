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
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${c[1]}</td>
        <td>${c[2]}</td>
        <td>${c[3]}</td>
        `;

        lista.appendChild(row)
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
    const select = document.getElementById("id_cliente");
    const resCliente = await fetch(`${API}/cliente`);
    const clientes = await resCliente.json(); 

    select.innerHTML = '<option value="" disabled selected>Selecione o Dono (Cliente)</option>';

    clientes.forEach(c => {
        const option = document.createElement('option');
        option.value = c[0];       
        option.textContent = c[1];
        select.appendChild(option);
    });

    const lista = document.getElementById("listaPets");
    lista.innerHTML = "";

    data.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c[1]}</td>
            <td>${c[2]}</td>
            <td>${c[3]}</td>
            <td>${c[4]}</td>
            <td>${c[5]}</td>
        `;
        lista.appendChild(row);
    });
}

document.getElementById("formServico").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target; 

    await fetch(`${API}/servicos`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            id_pet: form.querySelector("#id_pet").value,
            tipo: form.querySelector("#tipo_servico").value,
            data: form.querySelector("#data_service").value,
            valor: form.querySelector("#valor").value
        })
    });

    carregarServicos();
});

async function carregarServicos() {
    const res = await fetch(`${API}/servicos`);
    const data = await res.json();
    const select = document.getElementById("id_pet");
    const resCliente = await fetch(`${API}/pets`);
    const clientes = await resCliente.json(); 

    select.innerHTML = '<option value="" disabled selected>Selecione o Pet</option>';

    clientes.forEach(c => {
        const option = document.createElement('option');
        option.value = c[0];       
        option.textContent = c[1];
        select.appendChild(option);
    });
    

    const lista = document.getElementById("listaServicos");
    lista.innerHTML = "";

    data.forEach(c => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${c[1]}</td>
        <td>${c[2]}</td>
        <td>${c[3]}</td>
        <td>${c[4]}</td>
        `;

        lista.appendChild(row)
    });
}

document.getElementById("formProduto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target; 

    await fetch(`${API}/produtos`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome: form.querySelector("#nome_produto").value,
            descricao: form.querySelector("#descricao").value,
            preco: form.querySelector("#preco").value,
            quantidade: parseInt(form.querySelector("#quantidade").value) 
        })
    });
    carregarProdutos();
});

async function carregarProdutos() {
    const res = await fetch(`${API}/produtos`);
    const data = await res.json();
    const select = document.getElementById("produto");
    const resCliente = await fetch(`${API}/produtos`);
    const clientes = await resCliente.json(); 

    select.innerHTML = '<option value="" disabled selected>Selecione o Produto</option>';

    clientes.forEach(c => {
        const option = document.createElement('option');
        option.value = c[0];       
        option.textContent = c[1];
        select.appendChild(option);
    });

    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    data.forEach(c => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${c[1]}</td>
        <td>${c[2]}</td>
        <td>${c[3]}</td>
        <td>${c[4]}</td>
        `;

        lista.appendChild(row)
    });
}

document.getElementById("formFornecedor").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    await fetch(`${API}/fornecedores`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            nome: form.querySelector("#nome_fornecedor").value,
            telefone: form.querySelector("#telefone").value,
            email: form.querySelector("#email").value,
            id_produto: parseInt(form.querySelector("#produto").value)
        })
    });
    carregarFornecedores();
});

async function carregarFornecedores() {
    const res = await fetch(`${API}/fornecedores`);
    const data = await res.json();
    const select = document.getElementById("produto");
    const resCliente = await fetch(`${API}/produtos`);
    const clientes = await resCliente.json(); 

    select.innerHTML = '<option value="" disabled selected>Selecione o Produto</option>';

    clientes.forEach(c => {
        const option = document.createElement('option');
        option.value = c[0];       
        option.textContent = c[1];
        select.appendChild(option);
    });

    const lista = document.getElementById("listaFornecedores");
    lista.innerHTML = "";

    data.forEach(c => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${c[1]}</td>
        <td>${c[2]}</td>
        <td>${c[3]}</td>
        <td>${c[4]}</td>
        `;

        lista.appendChild(row)
    });
}

document.getElementById("formVenda").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    await fetch(`${API}/vendas`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            id_cliente: form.querySelector("#venda_cliente").value, 
            id_produto: form.querySelector("#venda_produto").value,
            data: form.querySelector("#data").value,
            quantidade: parseInt(form.querySelector("#quantidade").value),
            valor: form.querySelector("#valor").value
        })
    });
    
    form.reset();
    carregarVendas();
    carregarProdutos(); 
});

async function carregarVendas() {
    const res = await fetch(`${API}/vendas`);
    const data = await res.json();

    const selectCliente = document.getElementById("venda_cliente");
    const resClientes = await fetch(`${API}/cliente`);
    const clientes = await resClientes.json();
    
    selectCliente.innerHTML = '<option value="" disabled selected>Selecione o Cliente</option>';
    clientes.forEach(c => {
        const option = document.createElement('option');
        option.value = c[0];
        option.textContent = c[1];
        selectCliente.appendChild(option);
    });

    const selectProduto = document.getElementById("venda_produto");
    const resProdutos = await fetch(`${API}/produtos`);
    const produtos = await resProdutos.json();
    
    selectProduto.innerHTML = '<option value="" disabled selected>Selecione o Produto</option>';
    produtos.forEach(p => {
        const option = document.createElement('option');
        option.value = p[0];
        option.textContent = p[1];
        selectProduto.appendChild(option);
    });

    const lista = document.getElementById("listaVendas");
    lista.innerHTML = "";

    data.forEach(c => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c[1]}</td>
            <td>${c[2]}</td>
            <td>${c[3]}</td>
            <td>${c[4]}</td>
            <td>${c[5]}</td>
        `;
        lista.appendChild(row);
    });
}
carregarClientes();
carregarPets();
carregarServicos();
carregarProdutos();
carregarFornecedores();
carregarVendas();