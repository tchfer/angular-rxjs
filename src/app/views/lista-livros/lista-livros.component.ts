import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EMPTY, catchError, debounceTime, filter, map, switchMap, tap, throwError } from 'rxjs';

import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300; // const added to avoid magic numbers in application
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  public campoBusca = new FormControl();
  mensagemErro: string = '';

  constructor(
    private livroService : LivroService,
  ) { }

  public livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter(valorDigitado => valorDigitado.length >= 3),
      tap(() => console.log('Requisições ao servidor')),
      switchMap(valorDigitado => this.livroService.buscar(valorDigitado)),
      tap(() => console.log('Requisições ao servidor após o switchMap')),
      map(items => this.livrosResultadoParaLivros(items)),
      // catchError(erro => {
      //   console.log(erro);
      //   return throwError(() => new Error(this.mensagemErro = 'Ops! Ocorreu um erro. Recarregue a aplicação!'))
      // })
      catchError(() => {
        this.mensagemErro = 'Ops! Ocorreu um erro. Recarregue a aplicação!';
        return EMPTY; // A simple Observable that emits no items to the Observer and immediately emits a complete notification. That's why it needs to be reloaded. Cycle is complete
      })
    )

  public livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

}
