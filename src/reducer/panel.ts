import {
    deserialize,
} from '../util/panel';

export interface BlankTile{
    type: 'blank';
}
export interface NumberTile{
    type: 'number';
    value: number;
    remains: boolean;
}
export interface OpTile{
    type: 'op';
    value: '+' | '-' | '*' | '/';
    remains: boolean;
}
export interface EqTile{
    type: 'eq';
    remains: boolean;
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
    remains: Array<Tile>;
}

// initial stateの作成
const initialState: PanelState = deserialize(`
     7=7    |
   3*4=6*6  |
    14=14   |
            |;
16*
`);
export default function reducer(state = initialState, _action: any){
    return state;
}
