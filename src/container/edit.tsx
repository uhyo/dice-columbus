import {
    connect,
} from 'react-redux';

import {
    openCloseAction,
} from '../action/modify';

import EditComponent from '../component/edit';

const EditContainer = connect(
    ({modify: {open}})=>({
        open,
    }),
    (dispatch)=>{
        return {
            onOpenClose(open: boolean){
                dispatch(openCloseAction(open));
            },
        };
    },
)(EditComponent);

export default EditContainer;
