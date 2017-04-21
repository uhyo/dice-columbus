import * as React from 'react';

import Panel from '../container/panel';
import Remains from '../container/remains';
import Description from './description';

export default ()=>{
    return <div className="board-wrapper">
        <div className="borad">
            <Panel />
            <div className="board-description">
                <Description />
                <Remains />
            </div>
        </div>
    </div>;
};
