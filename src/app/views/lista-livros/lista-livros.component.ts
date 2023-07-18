import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  public listaLivros: Livro[];
  public campoBusca: string = '';
  public livro: Livro;
  private subscription: Subscription;

  constructor(
    private livroService : LivroService,
  ) { }

  public buscarLivros(): void {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next:(items) =>  {
        this.listaLivros = this.livrosResultadoParaLivros(items);
      },
      error: (error) => console.error(error),
      // complete: () => console.log('Observable completado') Não aparece quando tem um erro porque o erro já encerra o ciclo
    });
  }

  livrosResultadoParaLivros(items): Livro[] {
    const livros: Livro[]= [];

    items.forEach(item => {
      livros.push(this.livro = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
      })
    })
    return livros;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



