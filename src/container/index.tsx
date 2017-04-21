import * as React from 'react';
import {
    Provider,
} from 'react-redux';

import store from '../store/index';

import AppComponent from '../component/index';

export default ()=>{
    return <div>
        <Provider store={store}>
            <AppComponent />
        </Provider>
    </div>;
};
