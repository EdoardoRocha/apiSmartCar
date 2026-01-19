# 🚗 SmartPark API

Uma API robusta para gerenciamento de estacionamentos, desenvolvida com **Node.js**, **Express** e **PostgreSQL**. O sistema permite controlar a entrada e saída de veículos, gerenciar a disponibilidade de vagas em tempo real e calcular automaticamente o valor total devido com base no tempo de permanência.

## 🚀 Tecnologias Utilizadas

* **Runtime**: [Node.js](https://nodejs.org/) (v22.19.0)
* **Framework Web**: [Express](https://expressjs.com/)
* **Query Builder**: [Knex.js](https://knexjs.org/)
* **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
* **Auto-load de Módulos**: [Consign](https://www.google.com/search?q=https://www.npmjs.com/package/consign)
* **Documentação**: [Swagger (OpenAPI 3.0)](https://swagger.io/)

---

## 🛠️ Configuração do Ambiente

### Pré-requisitos

* Node.js instalado.
* Instância do PostgreSQL rodando.

### 1. Clonar e Instalar

```bash
git clone <url-do-repositorio>
cd backend
npm install

```

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `backend` com as seguintes credenciais (baseado no `knexfile.js`):

```env
DB_NAME=smartPark
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
PORT=3000

```

### 3. Banco de Dados (Migrations e Seeds)

O projeto utiliza o Knex para gerenciar a estrutura do banco e dados iniciais.

```bash
# Executar as migrações para criar as tabelas 'vaga' e 'registros'
npm run migrate

# Popular o banco com as 10 vagas iniciais
npm run seed

```

---

## 🛰️ Endpoints da API

Abaixo estão os principais recursos disponíveis:

### Vagas

* **`GET /vagas`**: Lista todas as vagas e seus status (disponível/ocupada).

### Registros e Fluxo de Estacionamento

* **`GET /registros`**: Retorna o histórico completo de entradas e saídas.
* **`POST /registros`**: Registra a entrada de um veículo.
* **Regra**: Verifica se a vaga existe e se está livre antes de permitir o registro.
* **Payload**: `{ "modelo": "Civic", "placa": "ABC-1234", "id_vaga": 1 }`.


* **`PUT /registros/checkout`**: Finaliza a permanência de um veículo.
* **Lógica**: Calcula o tempo entre `timestamp_entrada` e a saída atual.
* **Cobrança**: Aplica uma taxa de **R$ 10,00 por hora** (arredondado para cima).
* **Payload**: `{ "placa": "ABC-1234" }`.



---

## 📊 Regras de Negócio Implementadas

1. **Atomicidade**: O check-out utiliza **Transactions** do banco de dados para garantir que a saída do veículo e a liberação da vaga ocorram simultaneamente ou não ocorram de forma alguma em caso de erro.
2. **Cálculo de Permanência**: Utiliza `Math.ceil` para cobrar horas inteiras, garantindo a viabilidade financeira do modelo de negócio.
3. **Integridade Referencial**: A tabela de registros é vinculada à tabela de vagas via chave estrangeira (`id_vaga`).

---

## 📖 Documentação Swagger

A documentação interativa da API pode ser acessada localmente após iniciar o servidor:

📍 **URL**: `http://localhost:3000/api-docs`

---

## 📂 Estrutura de Pastas

```text
backend/
├── api/             # Controladores com a lógica de negócio (vagas e registros)
├── config/          # Configurações de Middlewares, Banco e Rotas
├── migrations/      # Histórico de alterações do esquema do banco
├── seeds/           # Dados populacionais iniciais
├── index.js         # Ponto de entrada do servidor
└── knexfile.js      # Configuração de conexão com o Postgres

```

---

## 🔧 Scripts Disponíveis

* `npm start`: Inicia o servidor com **nodemon** para desenvolvimento.
* `npm run migrate`: Sincroniza o banco de dados.
* `npm run seed`: Insere dados de teste.

---


*Desenvolvido para o sistema de gestão de pátio SmartPark.*