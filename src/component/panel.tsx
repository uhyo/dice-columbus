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
                        return <Tile
                            key={`tile-${i}-${j}`}
                            tile={tile}
                            moveFrom={moveFrom}
                            moveTo={moveTo}
                            />
                    })
                }</div>;
            })
            }</div>;
    }
}
