import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactFastClick from 'react-fastclick';
import * as qs from 'query-string';

import store from './store/index';

import {
    setPanelAction,
} from './action/panel';
import {
    deserialize,
} from './util/panel';

import App from './container/index';

ReactFastClick();

document.addEventListener('DOMContentLoaded', ()=>{


    const div = document.getElementById('app');
    if (div == null){
        return;
    }

    // URLを取得
    const param = qs.parse(location.search);
    if (param.q){
        store.dispatch(setPanelAction(deserialize(param.q)));
    }

    const app = <App />;
    ReactDOM.render(app, div);
});
