import * as React from 'react';

import {
    PanelState,
    // Tile,
} from '../reducer/panel';

export interface IPropPanel{
    panel: PanelState;
}
export interface IStatePanel{
}

export default class Panel extends React.Component<IPropPanel, IStatePanel>{
    render(){
        return <div>
            panel
        </div>;
    }
}
