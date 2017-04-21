import {
    connect,
} from 'react-redux';

import PanelComponent from '../component/panel';

const PanelContainer = connect(
    ({panel})=>({panel}),
)(PanelComponent);

export default PanelContainer;

