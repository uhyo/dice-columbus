import {
    connect,
} from 'react-redux';
import {
    historyBackAction,
    historyForwardAction,
} from '../action/history';

import HistoryComponent from '../component/history';

const HistoryContainer = connect(
    ({history})=>({history}),
    (dispatch)=>({
        onBack(){
            dispatch(historyBackAction() as any);
        },
        onForward(){
            dispatch(historyForwardAction() as any);
        },
    }),
)(HistoryComponent);

export default HistoryContainer;
