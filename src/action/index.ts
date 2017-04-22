import {
    PanelAction,
} from './panel';
import {
    EditAction,
} from './edit';
import {
    ModifyAction,
} from './modify';
import {
    HistoryAction,
} from './history';

export type Action =
    PanelAction |
    EditAction |
    ModifyAction |
    HistoryAction;
