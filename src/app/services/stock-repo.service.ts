import { Injectable } from '@angular/core';
import { Instrument } from '../interfaces/instrument.interface';
import { StockAction } from '../interfaces/stockAction.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Injectable({
  providedIn: 'root'
})
export class StockRepoService {
  private stockList: Instrument[] = [
    {
      currentPrice: 11,
      img: 'http://placekitten.com/g/100/100',
      name: 'B',
      openPrice: 9
    },
    {
      currentPrice: 8,
      img: 'http://placekitten.com/g/50/50',
      name: 'A',
      openPrice: 11
    },
    {
      currentPrice: 100,
      img: 'http://placekitten.com/g/50/50',
      name: 'Ah',
      openPrice: 11
    }
  ];
  transactionHistory: StockAction[] = [];
  private stockSubject$: BehaviorSubject<Instrument[]> = new BehaviorSubject(this.stockList);
  public stocks$: Observable<Instrument[]> = this.stockSubject$.asObservable();
  private order: keyof Instrument = null;
  constructor() { }

  sortBy(name: keyof Instrument, amount: number): Instrument[] {
    if (amount > this.stockList.length) {
      console.error(`${amount} is to big array has only ${this.stockList.length}`);
      return [];
    }
    return [...this.stockList].sort((a, b) => {
      if (a[name] && typeof a[name] === 'string') {
        return (a[name] as string).localeCompare(b[name] as string);
      }
      if (a[name] && typeof a[name] === 'number') {
        return (a[name] as number) - (b[name] as number);
      }
      console.error('uncomparable or not implemented');
      return 0;
    }

    ).slice(0, amount);

    // i prefer not to return but publish new values directly but i did according to assignment
  }

  random(amount: number): Instrument[] {
    if (amount > this.stockList.length) {
      console.error(`${amount} is to big array has only ${this.stockList.length}`);
      return [];
    }
    const tmp = [];
    const source = [...this.stockList];
    for (let i = 0; i < amount; i++) {
      const randIndex = Math.floor(Math.random() * source.length);
      tmp.push(source[randIndex]);
      source.splice(randIndex, 1);
    }
    return tmp;
    // i prefer not to return but publish new values directly but i did according to assignment
  }

  addTransaction(transaction: StockAction) {
    this.transactionHistory.push(transaction);
    console.log(this.transactionHistory);
  }

  updatePrice(index: number, change: number) {
    const forChange = this.stockList[index];
    if (!forChange) {
      console.error('no elements');
      return;
    }
    this.stockList.splice(index, 1, { ...forChange, currentPrice: forChange.currentPrice + change });
    this.updateList(this.stockList);
  }

  updateList(list: Instrument[]) {
    this.stockList = list;
    if (this.order) {
      const sorted = this.sortBy(this.order, list.length);
      this.stockList = sorted;
    }
    this.stockSubject$.next(this.stockList);
  }
  setOrder(order: keyof Instrument) {
    this.order = order;
  }
  delete(n: number) {
    this.stockList.splice(n, 1);
    this.stockSubject$.next(this.stockList);
  }
  moveItem(event: CdkDragDrop<Instrument[]>) {
    moveItemInArray(this.stockList, event.previousIndex, event.currentIndex);
    this.order = null;
    this.stockSubject$.next(this.stockList);
  }
}
