import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  public listaLivros: [];
  public campoBusca: string = '';

  constructor(
    private livroService : LivroService,
  ) { }

  buscarLivros() {
    this.livroService.buscar(this.campoBusca).subscribe(
      (response) =>  console.log(response),
      (error) => console.log(error)
    );
  }


}



