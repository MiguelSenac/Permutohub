const prompt = require('prompt-sync')()
const { Pool, Query } = require('pg')

const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',         
  database: 'permutohub',   
  password: '1234',     
  port: 5432
})

async function testedb() {
    console.log("Vou iniciar a conexão")
  
    try {
      const client = await pool.connect()
      console.log('Conexão bem-sucedida com o banco PermutoHub!')
      client.release()
      
    } catch (error) {
      console.error('Erro ao conectar ao banco:')
    }
  }

async function inserirUsuarios() {
    try{
        const  nome = prompt("Nome do usuário: ")
        const  email = prompt("E-mail do usuário: ")
        const  senha  = prompt("Senha do usuário: ")
        const  descricao = prompt("Descrição: ")
    
      const query = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario, descricao_usuario) VALUES ($1, $2, $3, $4)'
      await  pool.query(query, [nome, email, senha, descricao])
      console.log("Usuário incluído com sucesso!")
    }
    catch(erro){
      console.log("Erro ao adicionar usuário" + erro)
    }
}

async function mostrarUsuarios() {
    try{
      const query = 'SELECT * FROM usuarios'
      const result = await pool.query(query)
      console.table(result.rows)
    }
    catch{
      console.table("Erro ao mostrar usuários")
    }
  }
  
  async function pesquisarUsuarios() {
    const emailUsuario = prompt("Digite o email do usuário que deseja buscar: ")
    
    try {
      const result = await pool.query('SELECT id_usuario FROM usuarios WHERE email_usuario ILIKE $1 LIMIT 1', [emailUsuario])
      const rows = result.rows
  

        console.log("Usuário encontrado: " + emailUsuario + " ID: "  + rows[0].id_usuario)
        return rows[0].id_usuario
      
    } catch (erro) {
      console.log("Erro ao buscar o Usuario." + erro)
    }
  }
  
  async function deletarUsuarios() {
  const idUsuario = await pesquisarUsuarios()
    try {
      await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [idUsuario])
      console.log('Usuário deletado: ID: ' + idUsuario)
    } catch (error) {
      console.log("Erro ao deletar o usuário." + console.log(error))
    }
}

async function atualizarUsuarios() {
    try {
      const idTime = await pesquisarUsuarios()
      const novoNome = prompt("Novo nome do usuário: ")
      const novoEmail = prompt("Novo e-mail: ")
      const novaSenha = prompt("Nova senha: ")
      const novaDescricao = prompt("Nova descrição: ")
   
      const query = `UPDATE usuarios SET nome_usuario = $1, email_usuario = $2, senha_usuario = $3, descricao_usuario = $4 WHERE id_usuario = $5`
      await pool.query(query, [novoNome || null, novoEmail || null, novaSenha || null, novaDescricao || null, idTime])
      console.log("Usuário atualizado com sucesso!")
    } catch{
      console.error("Erro ao atualizar o Usuário:")
    }
  } 

  module.exports = {mostrarUsuarios, inserirUsuarios, deletarUsuarios, pesquisarUsuarios, atualizarUsuarios};