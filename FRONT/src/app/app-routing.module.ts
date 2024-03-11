import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFilmeComponent } from './pages/filme/listar-filme/listar-filme.component';
import { CadastrarFilmeComponent } from './pages/filme/cadastrar-filme/cadastrar-filme.component';
import { CadastrarGeneroComponent } from './pages/genero/cadastrar-genero/cadastrar-genero.component';
import { ListarGeneroComponent } from './pages/genero/listar-genero/listar-genero.component';
import { ListarUsuarioComponent } from './pages/usuario/listar-usuario/listar-usuario.component';
import { CadastrarUsuarioComponent } from './pages/usuario/cadastrar-usuario/cadastrar-usuario.component';
import { AlterarFilmeComponent } from './pages/filme/alterar-filme/alterar-filme.component';
import { AlterarGeneroComponent } from './pages/genero/alterar-genero/alterar-genero.component';
import { AlterarUsuarioComponent } from './pages/usuario/alterar-usuario/alterar-usuario.component';
import { AlugadosFilmeComponent } from './pages/filme/alugados-filme/alugados-filme.component';
import { DisponiveisFilmeComponent } from './pages/filme/disponiveis-filme/disponiveis-filme.component';
import { AlugarFilmeComponent } from './pages/filme/alugar-filme/alugar-filme.component';

//Definindo as rotas da aplicação
const routes: Routes = [
  {
    //"path" define a rota
    path: "",
    //"componet" define qual component vai ser aberto naquela rota
    component: ListarFilmeComponent
  },
  //Rotas do FILME
  {
    path: "pages/filme/listar",
    component: ListarFilmeComponent
  },
  {
    path: "pages/filme/cadastrar",
    component: CadastrarFilmeComponent
  },
  {
    path: "pages/filme/alterar/:filmeID",
    component: AlterarFilmeComponent
  },
  {
    path: "pages/filme/alugados",
    component: AlugadosFilmeComponent
  },
  {
    path: "pages/filme/disponiveis",
    component: DisponiveisFilmeComponent
  },
  {
    path: "pages/filme/alugar/:filmeID",
    component: AlugarFilmeComponent
  },
  //Rotas do GENERO
  {
    path: "pages/genero/listar",
    component: ListarGeneroComponent
  },
  {
    path: "pages/genero/cadastrar",
    component: CadastrarGeneroComponent
  },
  {
    path: "pages/genero/alterar/:generoID",
    component: AlterarGeneroComponent
  },
  //Rotas do USUARIO
  {
    path: "pages/usuario/listar",
    component: ListarUsuarioComponent
  },
  {
    path: "pages/usuario/cadastrar",
    component: CadastrarUsuarioComponent
  },
  {
    path: "pages/usuario/alterar/:cpf",
    component: AlterarUsuarioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
