import * as React from 'react';

import {
    PanelState,
} from '../reducer/panel';
import {
    EditState,
} from '../reducer/edit';

import Tile from './tile';

export interface IPropPanel{
    panel: PanelState;
    edit: EditState;

    moveStart?(obj: {
        type: 'mouse' | 'touch';
        x: number;
        y: number;
    }): void;
    moveOver?(obj: {
        x: number;
        y: number;
    }): void;
}
export interface IStatePanel{
}

export default class Panel extends React.Component<IPropPanel, IStatePanel>{
    render(){
        const {
            panel: {
                panel,
            },
            edit: {
                move,
            },
            moveStart,
            moveOver,
        } = this.props;
        return <div className="panel-container">{
            panel.map((row, i)=>{
                return <div key={`row-${i}`} className="panel-row">{
                    row.map((tile, j)=>{
                        let moveFrom = false;
                        let moveTo = false;
                        if (move != null){
                            if (move.from != null && move.from.type === 'panel' && move.from.x === j && move.from.y === i){
                                moveFrom = true;
                            }
                            if (move.to != null && move.to.type === 'panel' && move.to.x === j && move.to.y === i){
                                moveTo = true;
                            }
                        }

                        let handleDragStart;
                        if (moveStart == null){
                            handleDragStart = void 0;
                        }else{
                            handleDragStart = (type: 'mouse' | 'touch')=>{
                                moveStart({
                                    type,
                                    x: j,
                                    y: i,
                                });
                            };
                        }
                        let handleDragMove;
                        if (moveOver == null || move == null){
                            handleDragMove = void 0;
                        }else{
                            handleDragMove = ()=>{
                                moveOver({
                                    x: j,
                                    y: i,
                                });
                            };
                        }

                        const position = {
                            type: 'panel',
                            x: j,
                            y: i,
                        };

                        return <Tile
                            key={`tile-${i}-${j}`}
                            tile={tile}
                            moveFrom={moveFrom}
                            moveTo={moveTo}
                            position={position as any}
                            />
                    })
                }</div>;
            })
        }</div>;
    }
}
