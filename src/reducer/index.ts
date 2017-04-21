import {
    combineReducers,
} from 'redux';

import panelReducer from './panel';
import editReducer from './edit';

const reducer = combineReducers({
    panel: panelReducer,
    edit: editReducer,
});

export default reducer;
