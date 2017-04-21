import {
    connect,
} from 'react-redux';

import RemainsComponent from '../component/remains';

const RemainsContainer = connect(
    ({panel, edit})=>({panel, edit}),
)(RemainsComponent);

export default RemainsContainer;

