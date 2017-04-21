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
                return <div className="tile tile-number">{
                    tile.value
                }</div>;
            }
            case 'op': {
                return <div className="tile tile-op" data-op={tile.value}>{
                    opTable[tile.value]
                }</div>;
            }
            case 'eq': {
                return <div className="tile tile-eq">
                    =
                </div>;
            }
        }
    }
}
