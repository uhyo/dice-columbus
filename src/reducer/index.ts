import {
    combineReducers,
} from 'redux';

import panelReducer from './panel';
import editReducer from './edit';
import modifyReducer from './modify';

const reducer = combineReducers({
    panel: panelReducer,
    edit: editReducer,
    modify: modifyReducer,
});

export default reducer;
