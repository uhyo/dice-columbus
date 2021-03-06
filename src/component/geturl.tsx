import * as React from 'react';

import {
    PanelState,
} from '../reducer/panel';
import {
    serialize,
} from '../util/panel';

export interface IPropGeturl{
    panel: PanelState;
}
export interface IStateGeturl{
    open: boolean;
    url: string;
}
export default class Geturl extends React.Component<IPropGeturl, IStateGeturl>{
    constructor(props: IPropGeturl){
        super(props);

        this.state = {
            open: false,
            url: '',
        };
    }
    componentWillReceiveProps(nextProps: IPropGeturl){
        if (this.props.panel !== nextProps.panel){
            this.setState({
                open: false,
                url: '',
            });
        }
    }
    componentDidUpdate(){
        const {
            open,
            url,
        } = this.state;
        if (open && url){
            const sel = window.getSelection();
            sel.removeAllRanges();

            const r = document.createRange();
            r.selectNodeContents(this.refs.urlarea as HTMLElement);
            sel.addRange(r);
        }
    }
    render(){
        const {
            props: {
                panel,
            },
            state: {
                open,
                url,
            },
        } = this;
        const handleGeturl = ()=>{
            const text = serialize(panel);

            const url = `${location.protocol}//${location.host}${location.pathname}?q=${encodeURIComponent(text)}`;

            this.setState({
                open: true,
                url,
            });
        };

        let urlArea;
        if (open && url){
            const handleSelectUrl = ()=>{
                const sel = window.getSelection();
                sel.removeAllRanges();

                const r = document.createRange();
                r.selectNodeContents(this.refs.urlarea as HTMLElement);
                sel.addRange(r);
            };

            urlArea = <div>
                <pre className="geturl-url" ref="urlarea" onClick={handleSelectUrl}>
                    {url}
                </pre>
            </div>;
        }else{
            urlArea = null;
        }
        return <div className="geturl-wrapper">
            <p>この問題を共有するには、問題のURLを用いてください。</p>
            <div className="geturl-button" onClick={handleGeturl}>この問題のURLを取得</div>
            {urlArea}
        </div>;
    }
}
