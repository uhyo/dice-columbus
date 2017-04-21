import {
    PanelAction,
} from './panel';
import {
    EditAction,
} from './edit';

export type Action =
    PanelAction |
    EditAction;
