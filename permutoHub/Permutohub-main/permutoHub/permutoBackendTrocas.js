const trocas = [
    {id: 1, idUsuarioOfereceu: 1, idUsuarioRecebeu: 2, idServicoTrocado: 1, dadosTroca: "Troca de website por arte visual"}
  ]
  let id = trocas.length + 1
  
  function mostrarTrocas() {
    console.table(trocas)
  }
  
  function inserirTroca(idUsuarioOfereceu, idUsuarioRecebeu, idServicoTrocado, dadosTroca) {
    if (!idUsuarioOfereceu || !idUsuarioRecebeu || !idServicoTrocado || !dadosTroca) {
      console.log("É necessário preencher todos os campos")
    } else {
      trocas.push({id, idUsuarioOfereceu, idUsuarioRecebeu, idServicoTrocado, dadosTroca})
      id++
    }
  }
  
  function encontrarTroca(id) {
    return trocas.findIndex(troca => troca.id === id)
  }
  
  function deletarTroca(id) {
    const indice = encontrarTroca(id)
    if (indice !== -1) {
      trocas.splice(indice, 1)
      console.log("Troca excluída com sucesso")
    } else {
      console.log("Nenhuma troca com o id: " + id + " encontrada")
    }
  }
  
  module.exports = {mostrarTrocas, encontrarTroca, inserirTroca, deletarTroca}