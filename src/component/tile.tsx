import * as React from 'react';

import {
    Tile,
} from '../reducer/panel';
import {
    MovePosition,
} from '../reducer/edit';

const opTable = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
};

export interface IPropTile{
    tile: Tile;
    moveFrom?: boolean;
    moveTo?: boolean;

    position: MovePosition;
}
export interface IStateTile{
}

export default class TileComponent extends React.Component<IPropTile, IStateTile>{
    render(){
        const {
            tile,
            moveFrom,
            moveTo,
            position,
        } = this.props;
        let c = '';
        if (moveFrom){
            c += ' tile-move-from';
        }
        if (moveTo){
            c += ' tile-move-to';
        }
        const beacon: Record<string, string> = {};
        if (position.type === 'panel'){
            beacon['data-panel'] = 'panel';
            beacon['data-x'] = String(position.x);
            beacon['data-y'] = String(position.y);
        }else{
            beacon['data-remains'] = 'remains';
            beacon['data-idx'] = String(position.idx);
        }

        switch(tile.type){
            case 'blank': {
                return <div className={`tile tile-blank${c}`} {...beacon} />;
            }
            case 'number': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-number${c}`} {...beacon} >{
                    tile.value
                }</div>;
            }
            case 'op': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-op${c}`} data-op={tile.value} {...beacon}>{
                    opTable[tile.value]
                }</div>;
            }
            case 'eq': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-eq${c}`} {...beacon}>
                    =
                </div>;
            }
        }
    }
}
