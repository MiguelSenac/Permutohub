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

async function inserirAvaliacoes() {
    try{
        const  idTroca = prompt("ID da troca: ")
        const  notaAvaliacao = prompt("Nota da avaliação (0 - 10): ")
        const  comentarioAvaliacao  = prompt("Comentario da avaliação: ")
        const  dataAvaliacao = prompt("Data da avaliação: ")
    
      const query = 'INSERT INTO avaliacoes (id_troca, nota_avaliacao, comentario_avaliacao, data_avaliacao) VALUES ($1, $2, $3, $4)'
      await  pool.query(query, [idTroca, notaAvaliacao, comentarioAvaliacao, dataAvaliacao])
      console.log("Avaliação incluída com sucesso!")
    }
    catch(erro){
      console.log("Erro ao adicionar avaliação" + erro)
    }
}

async function mostrarAvaliacoes() {
    try{
      const query = 'SELECT * FROM avaliacoes'
      const result = await pool.query(query)
      console.table(result.rows)
    }
    catch{
      console.table("Erro ao mostrar avaliação")
    }
  }
  
  async function pesquisarAvaliacoes() {
    const comentarioAvaliacao = prompt("Digite o comentario da avaliação que deseja buscar: ")
    
    try {
      const result = await pool.query('SELECT * FROM avaliacoes WHERE comentario_avaliacao ILIKE $1', [`%${comentarioAvaliacao}%`])
        console.table(result.rows)
        const  idAvaliacao = prompt("Qual o ID da avaliação pesquisada: ")
        return idAvaliacao

        
    } catch (erro) {
      console.log("Erro ao buscar a avaliação." + erro)
    }
  }
  
  async function deletarAvaliacoes() {
  const idAvaliacao = await pesquisarAvaliacoes()
    try {
      await pool.query('DELETE FROM avaliacoes WHERE id_avaliacao = $1', [idAvaliacao])
      console.log('Avaliação deletada ID: ' + idAvaliacao)
    } catch (error) {
      console.log("Erro ao deletar a avaliação." + error)
    }
}

async function atualizarAvalicoes() {
    try {
      const idAvaliacao = await pesquisarAvaliacoes()
    
      const novoIDtroca = prompt("Nova ID da troca: ")
      const novaNotaAvaliacao = prompt("Nova nota de avaliação (0 - 10): ")
      const novoComentarioAvalicao = prompt("Novo comentario para avaliação: ")
      const novaDataAvaliacao = prompt("Nova data para avaliação: ")
   
      const query = `UPDATE trocas SET id_troca = $1, nota_avalicao = $2, comentario_avaliacao = $3, data_avaliacao = $4 WHERE id_avaliacao = $5`
      await pool.query(query, [novoIDtroca || null, novaNotaAvaliacao || null, novoComentarioAvalicao || null, novaDataAvaliacao || null, idAvaliacao])
      console.log("Avaliação atualizada com sucesso!")
    } catch{
      console.error("Erro ao atualizar a avaliação:")
    }
  }

  