import {
    connect,
} from 'react-redux';

import {
    openCloseAction,
} from '../action/modify';

import EditComponent from '../component/edit';

const EditContainer = connect(
    ({panel, modify: {open}})=>({
        panel,
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
