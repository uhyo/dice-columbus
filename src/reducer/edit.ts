export interface EditState{
    move: Move | undefined;
}

export interface Move{
    from: MovePosition;
    to: MovePosition | undefined;
}
export type MovePosition = PanelPosition | RemainsPosition;
export interface PanelPosition{
    type: 'panel';
    x: number;
    y: number;
}
export interface RemainsPosition{
    type: 'remains';
    idx: number;
}

const initialState = {
    // move: undefined,
    move: void 0,
};

export default function reducer(state = initialState, _action: any){
    return state;
}
