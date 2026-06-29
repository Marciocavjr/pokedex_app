const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Configuração para o Express entender dados enviados por formulários e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Diz ao Express para servir os arquivos estáticos (HTML e CSS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// CONEXÃO COM O BANCO DE DADOS
// O Node lê as variáveis de ambiente que configuramos lá no docker-compose.yml
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// FUNÇÃO PARA CRIAR A TABELA (Se ela não existir)
// Como você é leigo em banco de dados, o SQL abaixo cria uma tabela chamada 'pokemons'
// com colunas para o ID automático, Nome, Sexo, Tipo 1, Tipo 2 e a URL da Imagem.
async function iniciarBanco() {
  const queryTabela = `
    CREATE TABLE IF NOT EXISTS pokemons (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      sexo VARCHAR(20) NOT NULL,
      tipo1 VARCHAR(50) NOT NULL,
      tipo2 VARCHAR(50),
      imagem TEXT
    );
  `;
  try {
    await pool.query(queryTabela);
    console.log("Banco de dados pronto e tabela 'pokemons' verificada/criada!");
  } catch (err) {
    console.error("Erro ao iniciar o banco de dados. Tentando novamente...", err);
    // Se o banco ainda estiver iniciando, espera 2 segundos e tenta de novo
    setTimeout(iniciarBanco, 2000);
  }
}
iniciarBanco();

// --- ROTAS DA NOSSA APLICAÇÃO (A API) ---

// 1. ROTA PARA CONSULTAR (Buscar todos os pokemons)
app.get('/api/pokemons', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM pokemons ORDER BY id DESC');
    res.json(resultado.rows); // Devolve a lista de pokemons em formato JSON para o HTML
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pokémons" });
  }
});

// 2. ROTA PARA ADICIONAR (Inserir um novo pokemon)
app.post('/api/pokemons', async (req, res) => {
  const { nome, sexo, tipo1, tipo2, imagem } = req.body;
  try {
    const queryInserir = `
      INSERT INTO pokemons (nome, sexo, tipo1, tipo2, imagem) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    // Usamos esses '$1, $2...' por segurança, para evitar um ataque chamado SQL Injection
    await pool.query(queryInserir, [nome, sexo, tipo1, tipo2, imagem || null]);
    res.status(201).send("Pokémon adicionado com sucesso!");
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar pokémon" });
  }
});

// 3. ROTA PARA EXCLUIR (Deletar um pokemon pelo ID)
app.delete('/api/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM pokemons WHERE id = $1', [id]);
    res.send("Pokémon excluído com sucesso!");
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir pokémon" });
  }
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log(`Aplicação rodando com sucesso em http://localhost:${port}`);
});