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
        } = this.props;
        return <div className="remains-wrapper">
            <p>余り</p>
            <div className="remains">{
                remains.map((tile, i)=>{
                    let moveFrom = false;
                    let moveTo = false;
                    if (move != null){
                        if (move.from != null &&
                            move.from.type === 'remains' &&
                            move.from.idx !== i){
                            moveFrom = true;
                        }
                        if (move.to != null &&
                            move.to.type === 'remains' &&
                            move.to.idx !== i){
                            moveTo = true;
                        }
                    }
                    return <div key={`remains-${i}`} className="remains-tile">
                        <Tile tile={tile} moveFrom={moveFrom} moveTo={moveTo} />
                    </div>;
                })
            }</div>
        </div>
    }
}
