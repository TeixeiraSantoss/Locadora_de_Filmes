import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/models/genero.model';

@Component({
  selector: 'app-alterar-genero',
  templateUrl: './alterar-genero.component.html',
  styleUrls: ['./alterar-genero.component.css']
})
export class AlterarGeneroComponent {

  generoID: string = "";
  generoNome: string = "";

  constructor(private client: HttpClient,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.params.subscribe({
      next: (parametros) =>{
        let { generoID } = parametros;

        this.client.get<Genero>
          (`https://localhost:7035/api/genero/buscarID/${generoID}`)
          .subscribe({
            next: (genero) =>{
              this.generoID = genero.generoID.toString();
              this.generoNome = genero.generoNome;
              console.table(genero);
            },
            error: (erro) =>{
              console.log(erro);
            }
          })
      }
    })    
  }

  alterar(): void{
    let genero: Genero = {
      generoID: Number.parseInt(this.generoID),
      generoNome: this.generoNome
    }

    this.client.put<Genero>
      (`https://localhost:7035/api/genero/alterar/${this.generoID}`, genero)
      .subscribe({
        next: (genero) =>{
          this.router.navigate(["pages/genero/listar"]);
        },
        error: (erro) =>{
          console.log(erro);
        }
      })
  }

}
