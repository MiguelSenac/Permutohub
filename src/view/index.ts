//import { UsuarioService } from "./service/UsuarioService"
import { AvaliacaoView } from "./AvaliacaoView";
import { ServicoView } from "./ServicoView";
import { TrocaView } from "./TrocaView";
import { UsuarioView } from "./UsuarioView"
import { MainView } from "./MainView"

/*const servico = new UsuarioService();
 
async function testeUm() {
  console.table(await servico.listarUsuarios());
}
 
async function testeDois(email){
  console.table(await servico.buscarUsuarioPorEmail(email))
}

async function testeTres (usuario, nome, email, senha, descricao) {
  await servico.inserirUsuario(usuario, nome, email, senha, descricao)
}

async function testeQuatro (email){
  await servico.removerUsuario(email)
}



//testeDois("henrique@email")
//testeTres("Felipe", "felipe@outlook.com", "felipinhogay", "junior desenvolto")
testeQuatro("felipe@email.com")
testeUm()*/

const usuarioView = new MainView();
usuarioView.exibirMenu()

