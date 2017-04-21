import * as React from 'react';

import {
    PanelState,
} from '../reducer/panel';
import {
    EditState,
} from '../reducer/edit';

import Tile from './tile';

export interface IPropRemains{
    panel: PanelState;
    edit: EditState;

    moveStart?(obj: {
        type: 'mouse' | 'touch';
        idx: number;
    }): void;
    moveOver?(): void;
}
export interface IStateRemains{
}


export default class Remains extends React.Component<IPropRemains, IStateRemains>{
    render(){
        const {
            panel: {
                remains,
            },
            edit: {
                move,
            },
            moveStart,
            moveOver,
        } = this.props;

        const dragMode = move && move.type || void 0;
        let handleMouseOver;
        if (moveOver != null && dragMode === 'mouse'){
            handleMouseOver = ()=>{
                moveOver();
            };
        }else{
            handleMouseOver = void 0;
        }
        let c = 'remains-wrapper';
        if (move != null && move.to != null && move.to.type === 'remains' && (move.from == null || move.from.type !== 'remains')){
            c += ' remains-move-to';
        }
        return <div className={c} onMouseOver={handleMouseOver}>
            <p>余り</p>
            <div className="remains">{
                remains.map((tile, i)=>{
                    let moveFrom = false;
                    if (move != null){
                        if (move.from != null &&
                            move.from.type === 'remains' &&
                            move.from.idx === i){
                            moveFrom = true;
                        }
                    }
                    let dragStart;
                    if (moveStart != null){
                        dragStart = (type: 'mouse' | 'touch')=>{
                            moveStart({
                                type,
                                idx: i,
                            });
                        };
                    }else{
                        dragStart = void 0;
                    }
                    return <div key={`remains-${i}`} className="remains-tile">
                        <Tile
                            tile={tile}
                            moveFrom={moveFrom}
                            dragMode={dragMode}
                            dragStart={dragStart}
                            />
                    </div>;
                })
            }</div>
        </div>
    }
}
