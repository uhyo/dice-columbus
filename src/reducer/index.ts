import {
    combineReducers,
} from 'redux';

import panelReducer from './panel';
import editReducer from './edit';
import modifyReducer from './modify';
import historyReducer from './history';

const reducer = combineReducers({
    panel: panelReducer,
    edit: editReducer,
    modify: modifyReducer,
    history: historyReducer,
});

export default reducer;
