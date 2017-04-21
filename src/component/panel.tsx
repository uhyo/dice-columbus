import * as React from 'react';

import {
    PanelState,
} from '../reducer/panel';

import Tile from './tile';

export interface IPropPanel{
    panel: PanelState;
}
export interface IStatePanel{
}

export default class Panel extends React.Component<IPropPanel, IStatePanel>{
    render(){
        const {
            panel: {
                panel,
            },
        } = this.props;
        return <div className="panel-container">{
            panel.map((row, i)=>{
                return <div key={`row-${i}`} className="panel-row">{
                    row.map((tile, j)=>{
                        return <Tile key={`tile-${i}-${j}`} tile={tile} />
                    })
                }</div>;
            })
            }</div>;
    }
}
