import {
    PanelState,
} from '../reducer/panel';
import {
    MovePosition,
} from '../reducer/edit';

export interface TileMoveAction{
    type: 'tile-move';
    from: MovePosition;
    to: MovePosition;
}

export function tileMoveAction(obj: TileMoveAction){
    return {
        type: 'tile-move',
        ... obj,
    };
}

export interface SetPanelAction{
    type: 'set-panel';
    panel: PanelState;
}
export function setPanelAction(panel: PanelState): SetPanelAction{
    return {
        type: 'set-panel',
        panel,
    };
}

export type PanelAction =
    TileMoveAction |
    SetPanelAction;
