import { ClienteService } from "./ClienteService"; 
 
const servico = new ClienteService();
 
async function teste() {
  console.table(await servico.listarClientes());
}
 
teste();