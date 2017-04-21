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

        let c = 'remains-wrapper';
        if (move != null && move.to != null && move.to.type === 'remains' && (move.from == null || move.from.type !== 'remains')){
            c += ' remains-move-to';
        }
        return <div className={c} data-remainsarea="remainsarea">
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
                    const position = {
                        type: 'remains',
                        idx: i,
                    };
                    return <div key={`remains-${i}`} className="remains-tile">
                        <Tile
                            tile={tile}
                            moveFrom={moveFrom}
                            position={position as any}
                            />
                    </div>;
                })
            }</div>
        </div>
    }
}
