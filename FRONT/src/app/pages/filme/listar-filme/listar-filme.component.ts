import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Filme } from 'src/app/models/filme.model';

@Component({
  selector: 'app-listar-filme',
  templateUrl: './listar-filme.component.html',
  styleUrls: ['./listar-filme.component.css']
})
export class ListarFilmeComponent {

  alugado: string = "alugado"
  disponivel: string = "disponivel"
  filmes: Filme[] = [];
  displayedColumns: string[] = ['filmeID','nome','classif_ind','ano_lanc','alugado','genero','deletar','alterar'    ];

  constructor(private client: HttpClient){
  }

  //"ngOnInit" é execultado na abertura do componente
  ngOnInit(): void{
    this.client.get<Filme[]>
      ("https://localhost:7035/api/filme/listar")
      .subscribe({
        next: (filmes) => {
          this.filmes = filmes;
        },
        error: (erro) =>{
          console.log(erro);
        }
      });
  }

  deletar(filmeID: number){
    this.client.delete<Filme[]>
      (`https://localhost:7035/api/filme/deletar/${filmeID}`)
      .subscribe({
        next: (filmes) =>{
          this.filmes = filmes;         
          console.log("Filme deletado com sucesso") 
        },
        error: (erro) => {
          console.log(erro);
        }
      })
  }

}
