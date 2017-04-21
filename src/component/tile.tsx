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

    dragMode?: 'mouse' | 'touch';
    dragStart?(type: 'mouse' | 'touch'): void;
    dragMove?(): void;
}
export interface IStateTile{
}

export default class TileComponent extends React.Component<IPropTile, IStateTile>{
    render(){
        const {
            tile,
            moveFrom,
            moveTo,
            dragMode,
            dragStart,
            dragMove,
        } = this.props;
        let c = '';
        if (moveFrom){
            c += ' tile-move-from';
        }
        if (moveTo){
            c += ' tile-move-to';
        }
        // ドラッグ開始
        let handleMouseDown = (e: React.MouseEvent<HTMLElement>)=>{
            if (e.button === 0){
                e.preventDefault();
                if (dragStart != null){
                    dragStart('mouse');
                }
            }
        };
        let handleMouseMove;
        if (dragMove != null && dragMode === 'mouse'){
            handleMouseMove = ()=>{
                dragMove();
            };
        }else{
            handleMouseMove = void 0;
        }
        switch(tile.type){
            case 'blank': {
                return <div className={`tile tile-blank${c}`}  onMouseMove={handleMouseMove} />;
            }
            case 'number': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-number${c}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>{
                    tile.value
                }</div>;
            }
            case 'op': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-op${c}`} data-op={tile.value} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>{
                    opTable[tile.value]
                }</div>;
            }
            case 'eq': {
                if (tile.remains){
                    c += ' tile-remains';
                }
                return <div className={`tile tile-eq${c}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>

                    =
                </div>;
            }
        }
    }
}
