// panel serialize&deserialize

import {
    PanelState,
    Tile,
} from '../reducer/panel';

type DeserializeState = 'init' | 'parsing';

export function deserialize(str: string): PanelState{
    const result: Array<Array<Tile>> = [];

    let currentRow: Array<Tile> = [];

    const l = str.length;
    let state: DeserializeState = 'init';
    for (let i = 0; i < l; i++){
        const c = str.charAt(i);
        const code = str.charCodeAt(i);

        if (c === '\r' || c === '\n'){
            if (state === 'init'){
                continue;
            }
            result.push(currentRow);
            currentRow = [];
        }else if(c === ' '){
            currentRow.push({
                type: 'blank',
            });
        }else if (0x30 <= code && code <= 0x39){
            // number
            currentRow.push({
                type: 'number',
                value: code - 0x30,
            });
        }else if (c === '+' || c === '-' || c === '*' || c === '/'){
            currentRow.push({
                type: 'op',
                value: c,
            });
        }else if (c === '='){
            currentRow.push({
                type: 'eq',
            });
        }else{
            continue;
        }
        state = 'parsing';
    }

    // size
    let x = 0;
    let y = 0;
    for (const row of result){
        if (row.length > x){
            x = row.length;
        }
        y++;
    }

    return {
        size: {
            x,
            y,
        },
        panel: result,
    };
}
