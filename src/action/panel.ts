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

export type PanelAction = TileMoveAction;
