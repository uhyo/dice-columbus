import {
    deserialize,
} from '../util/panel';

export interface BlankTile{
    type: 'blank';
}
export interface NumberTile{
    type: 'number';
    value: number;
}
export interface OpTile{
    type: 'op';
    value: '+' | '-' | '*' | '/';
}
export interface EqTile{
    type: 'eq';
}

export type Tile =
    NumberTile |
    OpTile |
    EqTile |
    BlankTile;

export interface PanelState{
    size: {
        x: number;
        y: number;
    };
    panel: Array<Array<Tile>>;
}

// initial stateの作成
const initialState: PanelState = deserialize(`
   3*2=4+2  |
   520=520  |
   8=8-0/3  |
`);
console.log(initialState);
export default function reducer(state = initialState, _action: any){
    return state;
}
