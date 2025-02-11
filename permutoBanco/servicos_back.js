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

async function inserirServicos() {
    try{
    
        const  idUsuario = prompt("ID do prestador do serviço: ")
        const  tituloServico = prompt("Título do serviço: ")
        const  descricao = prompt("Descrição do serviço: ")
        const  data  = prompt("Data do serviço com mascara dd/mm/aaaa: ")
        const  ativo = true
    
      const query = 'INSERT INTO servicos (id_usuario, titulo_servico, descricao_servico, data_servico, ativo) VALUES ($1, $2, $3, $4, $5)'
      await  pool.query(query, [idUsuario, tituloServico, descricao, data, ativo])
      console.log("Serviço incluído com sucesso!")
    }
    catch(erro){
      console.log("Erro ao adicionar serviço" + erro)
    }
}

async function mostrarServicos() {
    try{
      const query = 'SELECT * FROM servicos'
      const result = await pool.query(query)
      console.table(result.rows)
    }
    catch{
      console.table("Erro ao mostrar serviços")
    }
  }
  
  async function pesquisarServicos() {
    const nomeServico = prompt("Digite o nome do serviço que deseja buscar: ")
    
    try {
      const result = await pool.query('SELECT id_servico, titulo_servico FROM servicos WHERE titulo_servico ILIKE $1', [`%${nomeServico}%`])
        console.table(result.rows)
        const  idServico = prompt("Qual o ID do servico pesquisado: ")
        return idServico

        
    } catch (erro) {
      console.log("Erro ao buscar o serviço." + erro)
    }
  }
  
  async function deletarServicos() {
  const idServico = await pesquisarServicos()
    try {
      await pool.query('DELETE FROM servicos WHERE id_servico = $1', [idServico])
      console.log("Serviço deletado ID:" + idServico)
    } catch (error) {
      console.log("Erro ao deletar o serviço." + console.log(error))
    }
}

async function atualizarServicos() {
    try {
      const idServico = await pesquisarServicos()
    
      const novoTitulo = prompt("Novo titulo para o serviço: ")
      const novaDescricao = prompt("Nova descrição: ")
      const novaData = prompt("Nova data: ")
      
   
      const query = `UPDATE servicos SET titulo_servico = $1, descricao_servico = $2, data_servico = $3 WHERE id_servico = $4`
      await pool.query(query, [novoTitulo || null, novaDescricao || null, novaData || null, idServico])
      console.log("Serviço atualizado com sucesso!")
    } catch(erro){
      console.error("Erro ao atualizar o Serviço: " + erro)
    }
  }
  module.exports = {mostrarServicos, inserirServicos, deletarServicos, pesquisarServicos, atualizarServicos};