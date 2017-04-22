export interface OpenCloseAction{
    type: 'open-close',
    open: boolean;
}

export function openCloseAction(open: boolean): OpenCloseAction{
    return {
        type: 'open-close',
        open,
    };
}


export type ModifyAction =
    OpenCloseAction;
