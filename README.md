# 📝 Task Management API

API RESTful para gerenciamento de tarefas desenvolvida com **Node.js**, **Express**, **TypeScript** e **ESModules**, utilizando **PostgreSQL** como banco de dados relacional e **Docker** / **Docker Compose** para containerização e orquestração dos serviços.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (v20+)
- **Express**
- **TypeScript**
- **PostgreSQL** (`pg`)
- **Docker** & **Docker Compose**
- **tsx** (execução e watch em ambiente de desenvolvimento)

---

## 📁 Estrutura do Projeto

```text
task-api/
├── src/
│   ├── config/          # Configuração e inicialização da conexão com PostgreSQL
│   ├── controllers/     # Lógica de negócio e queries SQL
│   ├── middlewares/     # Validações de requisições e verificação de existência
│   ├── routes/          # Mapeamento e roteamento dos endpoints da API
│   └── server.ts        # Ponto de entrada da aplicação
├── .dockerignore
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

## 📌 Endpoints da API

| Método | Endpoint | Descrição | Parâmetros / Body | Status Sucesso |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Health Check | N/A | `200 OK` |
| `POST` | `/tasks` | Cria uma nova tarefa | body: `{ title, description }` | `201 Created` |
| `GET` | `/tasks` | Lista tarefas (com ou sem filtro) | query (opcional): `?search=termo` | `200 OK` |
| `PUT` | `/tasks/:id` | Atualiza título e/ou descrição | params: `id`, body: `{ title?, description? }` | `200 OK` |
| `PATCH` | `/tasks/:id/complete` | Alterna status (concluída/pendente) | params: `id` | `200 OK` |
| `DELETE` | `/tasks/:id` | Remove uma tarefa | params: `id` | `204 No Content` |

---

## 🧠 Aprendizados e Destaques Técnicos

- **Arquitetura Desacoplada e ESModules:** Isolamento claro entre Roteamento (Routes), Lógica de Aplicação (Controllers), Validações (Middlewares) e Configuração de Banco (Config), utilizando a sintaxe moderna de ESModules no TypeScript.
- **Containerização e Resiliência:** Orquestração completa via Docker Compose com script de reconexão automática (*retry strategy*) para garantir a inicialização da API somente após a prontidão do banco PostgreSQL.
- **Segurança no Banco de Dados:** Prevenção total contra ataques de SQL Injection através do uso rigoroso de *Parameterized Queries* (`$1`, `$2`) nativas do driver PostgreSQL.
- **Validação Efetiva de Requisições:** Middlewares customizados para validação de payloads e verificação antecipada de existência de registros (`400 Bad Request` e `404 Not Found`), otimizando o fluxo dos controllers.
- **Tratamento Assíncrono e Erros:** Manipulação robusta de Promises via `async/await` com blocos `try/catch` centralizados, garantindo respostas padronizadas em JSON (`500 Internal Server Error`).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (v20 ou superior)
- Docker e Docker Compose
- Git

### Passos para Execução

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/NatanJAlmeida99/task-api-ts.git
   cd task-api-ts
   ```

2. **Configurar Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   DB_USER=postgres
   DB_PASSWORD=docker
   DB_HOST=db
   DB_PORT=5432
   DB_NAME=taskdb
   ```

3. **Executar via Docker Compose (Recomendado)**
   Suba a aplicação e o banco de dados PostgreSQL simultaneamente:
   ```bash
   docker compose up -d --build
   ```
   O servidor estará pronto e acessível em `http://localhost:3000`.

---

## 👤 Autor

Desenvolvido por **Natan Almeida**
- LinkedIn (https://www.linkedin.com/in/natan-almeida-5215a6444/)
- GitHub (https://github.com/NatanJAlmeida99)