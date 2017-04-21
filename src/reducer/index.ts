import {
    combineReducers,
} from 'redux';

import panelReducer from './panel';

const reducer = combineReducers({
    panel: panelReducer,
});

export default reducer;
