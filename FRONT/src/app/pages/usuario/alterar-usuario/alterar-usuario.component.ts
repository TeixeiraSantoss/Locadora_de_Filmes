import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css']
})
export class AlterarUsuarioComponent {

  cpf: string = "";
  nome: string = "";
  idade: string = "";

  constructor(private client: HttpClient,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void{
    //O "route" serve para fornecer informações sobre a atual ROTA/URL
    //"params" observa especificamente os PARAMETROS presentes na ROTA/URL
    this.route.params.subscribe({
      //"parametros", recebe os parametros da ROTA/URL
      next: (parametros) =>{
        //"id" recebe o 'id' presente na ROTA/URL
        let { cpf } = parametros;
        console.log(cpf);
      

      //fazendo uma requisição de busca com o "id" que foi recebido da ROTA/URL
      this.client.get<Usuario>
        (`https://localhost:7035/api/usuario/buscar/${cpf}`)
        .subscribe({
          next: (usuario) =>{
            //após receber um "usuario" da API, é preciso trazer esses dados para o FRONT, para manipular eles
            this.cpf = usuario.cpf.toString();
            this.nome = usuario.nome;
            this.idade = usuario.idade.toString();
            console.table(usuario);
          },
          error: (erro) =>{
            console.log(erro);
          }
        })
      }
    })
  }

  alterar(): void{    
    let usuario: Usuario = {
      cpf: Number.parseInt(this.cpf),
      nome: this.nome,
      idade: Number.parseInt(this.idade)
    };

    this.client.put<Usuario>
      (`https://localhost:7035/api/usuario/alterar/${this.cpf}`, usuario)
      .subscribe({
        next: (usuario) =>{
          console.log("Usuario alterado com sucesso");
          this.router.navigate(["pages/usuario/listar"]);
        },
        error: (erro) =>{
          console.log(erro);
        }
      })
  }

}
