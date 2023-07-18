import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  public listaLivros: [];
  public campoBusca: string = '';
  private subscription: Subscription;

  constructor(
    private livroService : LivroService,
  ) { }

  buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next:(response) =>  console.log(response),
      error: (error) => console.error(error),
      complete: () => console.log('Observable completado') // Não aparece quando tem um erro porque o erro já encerra o ciclo
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}



