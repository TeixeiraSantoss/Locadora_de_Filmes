import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/models/filme.model';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alugar-filme',
  templateUrl: './alugar-filme.component.html',
  styleUrls: ['./alugar-filme.component.css']
})
export class AlugarFilmeComponent {
  filmeId: number = 0;
  cpf: number = 0;
  filme: Filme | null = null;
  usuario: Usuario | null = null;

  constructor(private route: ActivatedRoute, 
    private client: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    // Recupera o ID do filme da rota
    this.route.params.subscribe(params => {
      this.filmeId = params['filmeID'];
      this.carregarFilme();
    });
    
  }

  carregarFilme(): void {
    // Carrega informações do filme usando o ID
    this.client.get<Filme>(`https://localhost:7035/api/filme/buscar/${this.filmeId}`).subscribe({
      next: (filme) => {
        this.filme = filme;
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }

  alugar(): void {
    // Faz a chamada para o endpoint de aluguel
    this.client.get
    (`https://localhost:7035/api/usuario/alugar/${this.filmeId}/${this.cpf}`)
    .subscribe({
      next: (filme) => {
        console.log(filme)
        this.router.navigate(["pages/filme/alugados"])
      },
      error: (erro) => {
        console.log(erro);
      }
    });
  }
}