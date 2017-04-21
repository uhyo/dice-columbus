import * as React from 'react';

import {
    Tile,
} from '../reducer/panel';

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
}
export interface IStateTile{
}

export default class TileComponent extends React.Component<IPropTile, IStateTile>{
    render(){
        const {
            tile,
            moveFrom,
            moveTo,
        } = this.props;
        let c = '';
        if (moveFrom){
            c += ' tile-move-from';
        }
        if (moveTo){
            c += ' tile-move-to';
        }
        switch(tile.type){
            case 'blank': {
                return <div className={`tile tile-blank${c}`} />;
            }
            case 'number': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-number${c}`}>{
                    tile.value
                }</div>;
            }
            case 'op': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-op${c}`} data-op={tile.value}>{
                    opTable[tile.value]
                }</div>;
            }
            case 'eq': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-eq${c}`}>
                    =
                </div>;
            }
        }
    }
}
