import { Injectable } from '@angular/core';
import { StockRepoService } from './stock-repo.service';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdaterService {

  constructor(private stock: StockRepoService) {
    interval(1000).subscribe(_ => {
      const indexToUpdate = Math.floor(Math.random() * 3);
      // from amout of elements in the array in real world should be unique name id or smthing else
      this.stock.updatePrice(indexToUpdate, Math.random());
    });
  }
}
