# 🎒 Pokédex Full-Stack com Docker: Guia Prático de Infraestrutura Segura

Bem-vindo ao repositório da nossa **Pokédex Dockerizada**! Este projeto foi desenvolvido do zero para servir como material didático e prático, ideal para ensinar como funciona a comunicação entre microsserviços em containers isolados, segurança de portas e persistência de dados em bancos de dados relacionais.

---

## 🛠️ Tecnologias Utilizadas

A aplicação utiliza uma arquitetura moderna e minimalista baseada no ecossistema JavaScript e em ferramentas de infraestrutura:

1. **Frontend (Interface do Usuário):**
   * **HTML5:** Estruturação semântica de todo o formulário de cadastro e grid de cards.
   * **CSS3 (Isolado):** Estilização personalizada de layout responsivo (CSS Grid e Flexbox) simulando a identidade visual clássica de uma Pokédex (Vermelho Pokébola).
   * **Vanilla JavaScript:** Manipulação do DOM e consumo da API nativa (`fetch`) para enviar dados (POST), consultar (GET) e excluir (DELETE).

2. **Backend (Lógica de Negócios):**
   * **Node.js (v18-alpine):** Ambiente de execução leve de alta compatibilidade.
   * **Express:** Framework web minimalista utilizado para estruturar as rotas da API (`/api/pokemons`).
   * **PG (node-postgres):** Driver oficial para comunicação e execução segura de queries SQL estruturadas.

3. **Banco de Dados:**
   * **PostgreSQL 15 (Alpine):** Sistema gerenciador de banco de dados relacional robusto. Toda a criação de tabelas é realizada dinamicamente pelo backend caso ela não exista (`CREATE TABLE IF NOT EXISTS`).

4. **Orquestração e Infraestrutura:**
   * **Docker & Docker Compose:** Criação, isolamento e automação dos ambientes em múltiplos containers dentro de uma rede virtual privada.

---

## 🧱 Como o Projeto foi Criado & Ambiente de Desenvolvimento

Este projeto foi construído e validado utilizando as seguintes especificações de hardware e software:
* **Sistema Hospedeiro (Host):** Google Chromebook (ChromeOS)
* **Ambiente Técnico:** Ambiente de Desenvolvimento Linux nativo do ChromeOS (Crostini) baseado em Debian.
* **Editor de Código:** Visual Studio Code (VS Code).

### O Grande Enfoque: Docker e Segurança de Redes 🛡️

O pilar central desta aplicação é demonstrar na prática como **dois containers isolados se comunicam de forma segura sem expor portas desnecessárias ao sistema operacional hospedeiro**.