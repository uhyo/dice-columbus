import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './container/index';

document.addEventListener('DOMContentLoaded', ()=>{

    const div = document.getElementById('app');
    if (div == null){
        return;
    }

    const app = <App />;
    ReactDOM.render(app, div);
});
