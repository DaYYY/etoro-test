import { Component, OnInit } from '@angular/core';
import { StockRepoService } from 'src/app/services/stock-repo.service';
import { UpdaterService } from 'src/app/services/updater.service';
import { take } from 'rxjs/operators';
import { Instrument } from 'src/app/interfaces/instrument.interface';

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss']
})
export class InstrumentListComponent {

  constructor(public stockRepo: StockRepoService, private updater: UpdaterService) { }


  sortBy(name: keyof Instrument) {
    this.stockRepo.stocks$.pipe(
      take(1)
    ).subscribe(arr => {
      this.stockRepo.updateList(this.stockRepo.sortBy(name, arr.length));
      this.stockRepo.setOrder(name);
    });
  }

  randomize() {
    this.stockRepo.stocks$.pipe(
      take(1)
    ).subscribe(arr => {
      this.stockRepo.updateList(this.stockRepo.random(arr.length));
      this.stockRepo.setOrder(name);
    });
  }

}
