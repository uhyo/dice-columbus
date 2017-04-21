import {
    connect,
} from 'react-redux';

import RemainsComponent from '../component/remains';

const RemainsContainer = connect(
    ({panel})=>({panel}),
)(RemainsComponent);

export default RemainsContainer;

