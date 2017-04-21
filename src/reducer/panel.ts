export interface BlankTile{
    type: 'blank';
}

export type Tile =
    BlankTile;

export interface PanelState{
    size: {
        x: number;
        y: number;
    };
    panel: Array<Array<Tile>>;
}

// initial stateの作成
const initialPanel: Array<Array<Tile>> = [];
for (let y = 0; y < 3; y++){
    const row: Array<Tile> = [];
    for (let x = 0; x < 11; x++){
        row.push({
            type: 'blank',
        });
    }
    initialPanel.push(row);
}


const initialState: PanelState = {
    size: {
        x: 11,
        y: 3,
    },
    panel: initialPanel,
};

export default function reducer(state = initialState, _action: any){
    return state;
}
