import {
    connect,
} from 'react-redux';

import PanelComponent from '../component/panel';

const PanelContainer = connect(
    ({panel, edit})=>({panel, edit}),
)(PanelComponent);

export default PanelContainer;

