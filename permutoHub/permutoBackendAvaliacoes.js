const avaliacoes = []

let id = 1

function mostrarAvaliacoes() {
    console.table(avaliacoes)
}

function inserirAvaliacao(idUsuarioAvaliador, idUsuarioAvaliado, nota, comentario, dataAvaliacao) {
    if (!idUsuarioAvaliador || !idUsuarioAvaliado || !nota || !comentario || !dataAvaliacao) {
        console.log("É necessário preencher todos os campos")
    } else if (nota < 1 || nota > 5) {
        console.log("A nota deve ser entre 1 e 5.")
    } else {
        avaliacoes.push({id: id, idUsuarioAvaliador, idUsuarioAvaliado, nota, comentario, dataAvaliacao})
        id++
        console.log("Avaliação cadastrada com sucesso!")
    }
}

function encontrarAvaliacao(id) {
    return avaliacoes.findIndex(avaliacao => avaliacao.id === id)
}

function deletarAvaliacao(id) {
    const indice = encontrarAvaliacao(id)
    if (indice !== -1) {
        avaliacoes.splice(indice, 1)
        console.log("Avaliação excluída com sucesso")
    } else {
        console.log("Nenhuma avaliação com o id: " + id + " encontrada")
    }
}

module.exports = {mostrarAvaliacoes, inserirAvaliacao, encontrarAvaliacao, deletarAvaliacao}
