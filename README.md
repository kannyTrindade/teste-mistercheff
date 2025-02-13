# Formulário de Contato MisterCheff - Teste com PHP, Mysql, React e Docker

Este projeto utiliza Docker para rodar o backend e o banco de dados, e um frontend baseado em Vite, React, Axios, React Hook Form, use-mask-input e Zod.

## Tecnologias Utilizadas

### Backend
- PHP com API
- MySQL (Banco de Dados)
- Docker
- Docker Compose

### Frontend (React com Vite)

- React
- Vite
- Axios
- React Hook Form
- use-mask-input
- Zod

----

## Como Rodar o Backend

### Pré-Requisitos

- Docker e Docker Compose instalados
- Node.js e npm instalados (para o frontend)

1️⃣ Clonar o Repositório
```
git clone https://github.com/kannyTrindade/teste-mistercheff.git
cd teste-mistercheff
``` 

2️⃣ Subir os Containers com Docker
```
docker-compose up -d
```

3️⃣ Instalar o dump do banco

Após inciar o container, acesse http://localhost:8080 para acessar o PhpMyAdmin e faça a importação do banco de dados, do arquivo dump.sql

Isso iniciará:
✅ O banco de dados MySQL
✅ O backend em PHP
----

## Como Rodar o Frontend

```
cd frontend
npm install
npm run dev
```

----

## Endereços para acesar o projeto

FrontEnd - http://localhost:5173

Backend - http://localhost:8000

PhpMyAdmin - http://localhost:8080