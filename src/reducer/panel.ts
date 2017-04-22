import {
    deserialize,
} from '../util/panel';
import {
    MovePosition,
} from '../reducer/edit';
import {
    Action,
} from '../action';

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
           |
    7=7    |
  2+6=4*2  |
   41=41   |
           |
;0-/
`);
export default function reducer(state = initialState, action: Action){
    switch(action.type){
        case 'tile-move': {
            const {
                from,
                to,
            } = action;

            const movingTile = getTileAt(state, from);
            if (movingTile == null){
                return state;
            }

            if (from.type === 'panel' && to.type === 'panel'){
                const targetTile = getTileAt(state, to);
                if (targetTile == null || isTileSame(movingTile, targetTile)){
                    return state;
                }
                const state1 = setTileAt(state, from, targetTile);
                const state2 = setTileAt(state1, to, movingTile);
                return state2;
            }else if (from.type === 'panel' && to.type === 'remains'){
                const state1 = setTileAt(state, from, {
                    type: 'blank',
                });
                const state2 = setTileAt(state1, to, movingTile);
                return state2;
            }else if (from.type === 'remains' && to.type === 'panel'){
                const targetTile = getTileAt(state, to);
                if (targetTile == null || isTileSame(movingTile, targetTile)){
                    return state;
                }
                const state1 = setTileAt(state, to, movingTile);
                const state2 = removeRemainsTile(state1, from.idx);
                const state3 = setTileAt(state2, from, targetTile);
                return state3;
            }else{
                return state;
            }
        }
        case 'set-panel': {
            return action.panel;
        }
        default: {
            return state;
        }
    }
}

function getTileAt(state: PanelState, position: MovePosition): Tile | undefined{
    if (position.type === 'panel'){
        const {
            x,
            y,
        } = position;
        if (state.panel[y] && state.panel[y][x]){
            return state.panel[y][x];
        }else{
            return void 0;
        }
    }else{
        const {
            idx,
        } = position;
        if (state.remains[idx]){
            return  state.remains[idx];
        }else{
            return void 0;
        }
    }
}
function setTileAt(state: PanelState, position: MovePosition, tile: Tile): PanelState{
    if (position.type === 'panel'){
        const panel = state.panel.map((row, y)=>{
            if (y === position.y){
                return row.map((t, x)=>{
                    if (x === position.x){
                        return tile;
                    }else{
                        return t;
                    }
                });
            }else{
                return row;
            }
        });
        return {
            ... state,
            panel,
        };
    }else{
        if (tile.type === 'blank'){
            return state;
        }
        const remains = [
            ... state.remains,
            tile,
        ];
        return {
            ... state,
            remains,
        };
    }
}
function removeRemainsTile(state: PanelState, idx: number): PanelState{
    return {
        ...state,
        remains: [
            ... state.remains.slice(0, idx),
            ... state.remains.slice(idx+1),
        ],
    };
}

function isTileSame(tile1: Tile, tile2: Tile): boolean{
    if (tile1.type !== tile2.type){
        return false;
    }
    if (tile1.type === 'blank'){
        return true;
    }
    if (tile1.type === 'number' && tile1.value === (tile2 as NumberTile).value && tile1.remains === (tile2 as NumberTile).remains){
        return true;
    }
    if (tile1.type === 'op' && tile1.value === (tile2 as OpTile).value && tile1.remains === (tile2 as OpTile).remains){
        return true;
    }
    if (tile1.type === 'eq' && tile1.remains === (tile2 as EqTile).remains){
        return true;
    }
    return false;
}
