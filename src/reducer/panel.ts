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
     7=7    |
   3*4=6*6  |
    14=14   |
            |;
16*
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
                if (targetTile == null){
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
                if (targetTile == null){
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
