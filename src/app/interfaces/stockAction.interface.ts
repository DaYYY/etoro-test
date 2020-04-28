export enum ActionType {
    Buy = 'Buy', Sell = 'Sell'
}

export interface StockAction {
    type: ActionType;
    price: number;
    name: string;
}
