import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarFilmeComponent } from './pages/filme/listar-filme/listar-filme.component';
import { CadastrarFilmeComponent } from './pages/filme/cadastrar-filme/cadastrar-filme.component';
import { CadastrarUsuarioComponent } from './pages/usuario/cadastrar-usuario/cadastrar-usuario.component';
import { ListarUsuarioComponent } from './pages/usuario/listar-usuario/listar-usuario.component';
import { ListarGeneroComponent } from './pages/genero/listar-genero/listar-genero.component';
import { CadastrarGeneroComponent } from './pages/genero/cadastrar-genero/cadastrar-genero.component';
import { AlterarFilmeComponent } from './pages/filme/alterar-filme/alterar-filme.component';
import { AlterarUsuarioComponent } from './pages/usuario/alterar-usuario/alterar-usuario.component';
import { AlterarGeneroComponent } from './pages/genero/alterar-genero/alterar-genero.component';
import { AlugadosFilmeComponent } from './pages/filme/alugados-filme/alugados-filme.component';
import { DisponiveisFilmeComponent } from './pages/filme/disponiveis-filme/disponiveis-filme.component';
import { AlugarFilmeComponent } from './pages/filme/alugar-filme/alugar-filme.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListarFilmeComponent,
    CadastrarFilmeComponent,
    AlterarFilmeComponent,
    CadastrarUsuarioComponent,
    ListarUsuarioComponent,
    AlterarUsuarioComponent,
    ListarGeneroComponent,
    CadastrarGeneroComponent,
    AlterarGeneroComponent,
    AlugadosFilmeComponent,
    DisponiveisFilmeComponent,
    AlugarFilmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,   
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
