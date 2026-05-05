from flask import Flask, render_template, request, redirect, url_for, jsonify
import mysql.connector
import os 
import time
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Configurações via Variáveis de Ambiente (Kubernetes)
DB_HOST = os.getenv("DB_HOST", "mysql-service")
DB_NAME = os.getenv("DB_NAME", "PetShop")
DB_USER = os.getenv("DB_USER", "user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "senha123")

def conectar_bd():
    tentativas = 10
    while tentativas > 0:
        try:
            conexao = mysql.connector.connect(
                host=DB_HOST,
                database=DB_NAME,
                user=DB_USER,
                password=DB_PASSWORD
            )
            return conexao
        except mysql.connector.Error:
            tentativas -= 1
            time.sleep(3)
    return 
# Adicione esta rota logo acima da index para a página inicial não dar erro 500
@app.route("/")
def home():
    return "Servidor PetShop rodando! Acesse /cliente para ver os dados."

@app.route("/cliente", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        nome = request.form["nome"]
        telefone = request.form["telefone"]
        email = request.form["email"]

        conexao = conectar_bd()
        if conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO clientes (nome, telefone, email) VALUES(%s, %s, %s)",
                (nome, telefone, email)
            )
            conexao.commit()
            cursor.close()
            conexao.close()

    clientes = []
    conexao = conectar_bd()
    if conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT id, nome, telefone, email FROM clientes ORDER BY id")
        clientes = cursor.fetchall()
        cursor.close()
        conexao.close()
    return jsonify(clientes)

@app.route("/pets", methods=["GET", "POST"])
def index1():
    if request.method == "POST":
        nome_pet = request.form["nome_pet"]
        tipo = request.form["tipo"]
        raca = request.form["raca"]
        idade = request.form["idade"]
        id_cliente = request.form["id_cliente"]

        conexao = conectar_bd()
        if conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO pets (nome_pet, tipo, raca, idade, id_cliente) VALUES(%s, %s, %s, %s, %s)",
                (nome_pet, tipo, raca, idade, id_cliente)
            )
            conexao.commit()
            cursor.close()
            conexao.close()

    pets = []
    conexao = conectar_bd()
    if conexao:
        cursor = conexao.cursor()
        cursor.execute(
            "SELECT p.id, p.nome_pet, p.tipo, p.raca, p.idade, c.nome AS nome_dono FROM pets as p INNER JOIN clientes as c ON c.id = p.id_cliente ORDER BY p.id"
        )
        pets = cursor.fetchall()
        cursor.close()
        conexao.close()
    return jsonify(pets)

@app.route("/servicos", methods=["GET", "POST"])
def index2():
    if request.method == "POST":
        id_pet = request.form["id_pet"]
        tipo = request.form["tipo"]
        data = request.form["data"]
        valor = request.form["valor"]

        conexao = conectar_bd()
        if conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO servicos (id_pet, tipo, data, valor) VALUES(%s, %s, %s, %s)",
                (id_pet, tipo, data, valor)
            )
            conexao.commit()
            cursor.close()
            conexao.close()

    servicos = []
    conexao = conectar_bd()
    if conexao:
        cursor = conexao.cursor()
        cursor.execute(
            "SELECT s.id, p.nome_pet AS pet, s.tipo, s.data, s.valor FROM servicos AS s INNER JOIN pets as p on p.id = s.id_pet ORDER BY s.id"
        )
        servicos = cursor.fetchall()
        cursor.close()
        conexao.close()
    return jsonify(servicos)

@app.route("/produtos", methods=["GET", "POST"])
def index3():
    if request.method == "POST":
        nome = request.form["nome"]
        descricao = request.form["descricao"]
        preco = request.form["preco"]
        quantidade = request.form["quantidade"]

        conexao = conectar_bd()
        if conexao:
            cursor = conexao.cursor()
            cursor.execute(
                "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES(%s, %s, %s, %s)",
                (nome, descricao, preco, quantidade)
            )
            conexao.commit()
            cursor.close()
            conexao.close()

    produtos = []
    conexao = conectar_bd()
    if conexao:
        cursor = conexao.cursor()
        cursor.execute("SELECT id, nome, descricao, preco, quantidade FROM produtos ORDER BY id")
        produtos = cursor.fetchall()
        cursor.close()
        conexao.close()
    return jsonify(produtos)

@app.route("/fornecedores", methods=["GET", "POST"])
def index4():
    if request.method == "POST":
        nome = request.form["nome"]
        telefone = request.form["telefone"]
        email = request.form["email"]
        id_produto = request.form["id_produto"]

        conexao = conectar_bd()
        if conexao:
            cursor = conexao.cursor()
            # CORREÇÃO: Tabela correta é fornecedores e campos id_produto incluído
            cursor.execute(
                "INSERT INTO fornecedores (nome, telefone, email, id_produto) VALUES(%s, %s, %s, %s)",
                (nome, telefone, email, id_produto)
            )
            conexao.commit()
            cursor.close()
            conexao.close()

    fornecedores = []
    conexao = conectar_bd()
    if conexao:
        cursor = conexao.cursor()
        cursor.execute(
            "SELECT f.id, f.nome, f.telefone, f.email, p.nome AS produto FROM fornecedores AS f INNER JOIN produtos AS p ON p.id = f.id_produto ORDER BY f.id"
        )
        fornecedores = cursor.fetchall()
        cursor.close()
        conexao.close()
    return jsonify(fornecedores)

@app.route("/vendas", methods=["GET", "POST"])
def index5():
    if request.method == "POST":
        id_cliente = request.form["id_cliente"]
        id_produto = request.form["id_produto"]
        data = request.form["data"]
        quantidade = request.form["quantidade"]
        valor = request.form["valor"]

        conexao = conectar_bd()
        if conexao:
            cursor = conexao.cursor()
            # CORREÇÃO: Ordem dos parâmetros na tupla (quantidade e valor)
            cursor.execute(
                "INSERT INTO vendas (id_cliente, id_produto, data, quantidade, valor) VALUES(%s, %s, %s, %s, %s)",
                (id_cliente, id_produto, data, quantidade, valor)
            )
            conexao.commit()
            cursor.close()
            conexao.close()

    vendas = []
    conexao = conectar_bd()
    if conexao:
        cursor = conexao.cursor()
        cursor.execute(
            "SELECT v.id, c.nome AS cliente, p.nome AS produto, v.data, v.quantidade, v.valor FROM vendas AS v INNER JOIN clientes AS c ON c.id = v.id_cliente INNER JOIN produtos AS p ON p.id = v.id_produto ORDER BY v.id"
        )
        vendas = cursor.fetchall()
        cursor.close()
        conexao.close()
    return jsonify(vendas)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)