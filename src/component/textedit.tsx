import * as React from 'react';

export interface IPropTextedit{
    text: string;
    onChange(text: string): void;
}

export default class Textedit extends React.Component<IPropTextedit, {}>{
    render(){
        const {
            text,
            onChange,
        } = this.props;

        const handleChange = ()=>{
            const a = this.refs.area as HTMLTextAreaElement;
            onChange(a.value);
        };

        return <div className="textedit-wrapper">
            <p>テキストを編集して問題を変更できます。</p>
            <textarea ref="area" defaultValue={text} onChange={handleChange} />
        </div>;
    }
}
