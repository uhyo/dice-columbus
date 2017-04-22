// panel serialize&deserialize

import {
    PanelState,
    Tile,
} from '../reducer/panel';

type DeserializeState = 'init' | 'parsing' | 'remains';

export function deserialize(str: string): PanelState{
    const result: Array<Array<Tile>> = [];

    let currentRow: Array<Tile> = [];
    const remains: Array<Tile> = [];

    const l = str.length;
    let state: DeserializeState = 'init';
    for (let i = 0; i < l; i++){
        const c = str.charAt(i);
        const code = str.charCodeAt(i);

        if (c === '\r' || c === '\n'){
            if (state !== 'parsing'){
                continue;
            }
            result.push(currentRow);
            currentRow = [];
        }else if(c === ' '){
            if (state !== 'remains'){
                currentRow.push({
                    type: 'blank',
                });
            }
        }else if (0x30 <= code && code <= 0x39){
            // number
            currentRow.push({
                type: 'number',
                value: code - 0x30,
                remains: state==='remains',
            });
        }else if (c === '+' || c === '-' || c === '*' || c === '/'){
            currentRow.push({
                type: 'op',
                value: c,
                remains: state==='remains',
            });
        }else if (c === '='){
            currentRow.push({
                type: 'eq',
                remains: state==='remains',
            });
        }else if (c === ';'){
            state = 'remains';
            if (currentRow.length > 0){
                result.push(currentRow);
            }
            currentRow = remains;
            continue;
        }else{
            continue;
        }
        if (state === 'init'){
            state = 'parsing';
        }
    }

    // size
    let x = 0;
    let y = 0;
    for (const row of result){
        const l = row.length;
        if (l > x){
            x = l;
        }
        y++;
    }
    // サイズを合わせる
    for (const row of result){
        while (row.length < x){
            row.push({
                type: 'blank',
            });
        }
    }

    return {
        size: {
            x,
            y,
        },
        panel: result,
        remains,
    };
}

export function serialize({size, panel, remains}: PanelState): string{
    let result = '';

    for (let y = 0; y < size.y; y++){
        const row = panel[y];
        for (let x = 0; x < size.x; x++){
            const tile = row[x];
            result += tileString(tile);
        }
        result += '|\n';
    }
    result += ';';
    for (const tile of remains){
        result += tileString(tile);
    }
    return result;
}
function tileString(tile: Tile): string{
    switch (tile.type){
        case 'blank': {
            return ' ';
        }
        case 'number': {
            return String(tile.value);
        }
        case 'op': {
            return tile.value;
        }
        case 'eq': {
            return '=';
        }
    }
}
