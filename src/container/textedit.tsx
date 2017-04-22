import {
    connect,
} from 'react-redux';
import {
    createSelector,
} from 'reselect';
import {
    serialize,
    deserialize,
} from '../util/panel';

import {
    setPanelAction,
} from '../action/panel';
import {
    addCurrentHistoryAction,
} from '../action/history';

import TexteditComponent from '../component/textedit';

const panelSelector = ({panel}: any)=>panel;

const textSelector = createSelector(
    panelSelector,
    serialize,
);

const textareaSelector = createSelector(
    textSelector,
    text=> ({text}),
);

const TexteditContainer = connect(
    textareaSelector,
    (dispatch)=>({
        onChange(text: string){
            dispatch(addCurrentHistoryAction());
            dispatch(setPanelAction(deserialize(text)));
        },
    }),
)(TexteditComponent);

export default TexteditContainer;

