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
}
export interface IStateTile{
}

export default class TileComponent extends React.Component<IPropTile, IStateTile>{
    render(){
        const {
            tile,
        } = this.props;
        switch(tile.type){
            case 'blank': {
                return <div className="tile tile-blank" />;
            }
            case 'number': {
                const remains = tile.remains ? ' tile-remains' : '';
                return <div className={`tile tile-number${remains}`}>{
                    tile.value
                }</div>;
            }
            case 'op': {
                const remains = tile.remains ? ' tile-remains' : '';
                return <div className={`tile tile-op${remains}`} data-op={tile.value}>{
                    opTable[tile.value]
                }</div>;
            }
            case 'eq': {
                const remains = tile.remains ? ' tile-remains' : '';
                return <div className={`tile tile-eq${remains}`}>
                    =
                </div>;
            }
        }
    }
}
