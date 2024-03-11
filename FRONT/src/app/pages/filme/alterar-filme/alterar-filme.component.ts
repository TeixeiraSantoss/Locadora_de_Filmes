import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/models/filme.model';
import { Genero } from 'src/app/models/genero.model';

@Component({
  selector: 'app-alterar-filme',
  templateUrl: './alterar-filme.component.html',
  styleUrls: ['./alterar-filme.component.css']
})
export class AlterarFilmeComponent {

  filmeID: string = "";
  nome: string = "";
  classif_ind: string = "";
  ano_lanc: string = "";
  alugado: boolean = false;
  generoID: string = "";

  generos: Genero[] = [];

  constructor(private client: HttpClient,
    private router: Router,
    private route: ActivatedRoute){}

    ngOnInit(): void{
      this.route.params.subscribe({
        next: (parametros) =>{
          let { filmeID } = parametros;

          this.client.get<Filme>
            (`https://localhost:7035/api/filme/buscar/${filmeID}`)
            .subscribe({
              next: (filme) =>{
                this.client.get<Genero[]>
                  ("https://localhost:7035/api/genero/listar")
                  .subscribe({
                    next: (generos) =>{
                      this.generos = generos;

                      this.filmeID = filme.filmeID.toString();
                      this.nome = filme.nome;
                      this.classif_ind = filme.classif_ind.toString();
                      this.ano_lanc = filme.ano_lanc.toString();
                      this.alugado = filme.alugado;
                      this.generoID = filme.generoID.toString();
                    },
                    error: (erro) =>{
                      console.log(erro);
                    },
                  });
              },
              error: (erro) =>{
                console.log(erro);
              },
            });
        },
      });
    }

  
  alterar(): void{
    let filme: Filme ={
      filmeID: Number.parseInt(this.filmeID),
      nome: this.nome,
      classif_ind: Number.parseInt(this.classif_ind),
      ano_lanc: Number.parseInt(this.ano_lanc),
      alugado: this.alugado,
      generoID: Number.parseInt(this.generoID)
    }; 

    this.client.put
      (`https://localhost:7035/api/filme/alterar/${this.filmeID}`, filme)
      .subscribe({
        next: (filme) =>{
          this.router.navigate(["pages/filme/listar"]);
        },
        error: (erro) =>{
          console.log(erro);
        }
      })
  }

}
