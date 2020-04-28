import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Instrument } from 'src/app/interfaces/instrument.interface';
import { } from 'protractor';
import { StockAction, ActionType } from 'src/app/interfaces/stockAction.interface';

@Component({
  selector: 'app-instrument-card',
  templateUrl: './instrument-card.component.html',
  styleUrls: ['./instrument-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstrumentCardComponent {
  @Input()
  instrument: Instrument;
  @Output()
  action: EventEmitter<StockAction> = new EventEmitter<StockAction>();

  get rising() {
    return this.instrument.currentPrice > this.instrument.openPrice;
  }
  get falling() {
    return this.instrument.currentPrice < this.instrument.openPrice;
  }
  constructor() { }
  buy() {
    this.action.emit({ price: this.instrument.currentPrice + 0.02, type: ActionType.Buy, name: this.instrument.name });
  }

  sell() {
    this.action.emit({ price: this.instrument.currentPrice - 0.02, type: ActionType.Sell, name: this.instrument.name });
  }

}
