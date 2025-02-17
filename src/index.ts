import { UsuarioService } from "./service/UsuarioService"
 
const servico = new UsuarioService();
 
async function testeUm() {
  console.table(await servico.listarUsuarios());
}
 
async function testeDois(email){
  console.table(await servico.buscarUsuarioPorEmail(email))
}

async function testeTres (nome, email, senha, descricao) {
  await servico.inserirUsuario(nome, email, senha, descricao)
}

async function testeQuatro (email){
  await servico.removerUsuario(email)
}



//testeDois("henrique@email")
//testeTres("Felipe", "felipe@outlook.com", "felipinhogay", "junior desenvolto")
testeQuatro("felipe@email.com")
testeUm()

