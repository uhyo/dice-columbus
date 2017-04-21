import * as React from 'react';

import {
    PanelState,
} from '../reducer/panel';

import Tile from './tile';

export interface IPropRemains{
    panel: PanelState;
}
export interface IStateRemains{
}


export default class Remains extends React.Component<IPropRemains, IStateRemains>{
    render(){
        const {
            panel: {
                remains,
            },
        } = this.props;
        return <div className="remains-wrapper">
            <p>余り</p>
            <div className="remains">{
                remains.map((tile, i)=>{
                    return <div key={`remains-${i}`} className="remains-tile">
                        <Tile tile={tile} />
                    </div>;
                })
            }</div>
        </div>
    }
}
