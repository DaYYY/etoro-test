import { Injectable } from '@angular/core';
import { StockRepoService } from './stock-repo.service';
import { interval, combineLatest } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdaterService {

  constructor(private stock: StockRepoService) {

    interval(1000).pipe(withLatestFrom(stock.stocks$)).subscribe(([_, arr]) => {
      const indexToUpdate = Math.floor(Math.random() * (arr.length - 1));
      // from amout of elements in the array in real world should be unique name id or smthing else
      this.stock.updatePrice(indexToUpdate, Math.random());
    });
  }
}
