import {
    PanelAction,
} from './panel';
import {
    EditAction,
} from './edit';
import {
    ModifyAction,
} from './modify';

export type Action =
    PanelAction |
    EditAction |
    ModifyAction;
