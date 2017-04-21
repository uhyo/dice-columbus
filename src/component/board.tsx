import * as React from 'react';

import Panel from '../container/panel';
import Remains from '../container/remains';
import Description from './description';

import {
    findParent,
} from '../util/dom';

export interface IPropBoard{
    moveFromPanel(x: number, y: number): void;
    moveFromRemains(idx: number): void;
    moveOverNone(): void;
    moveOverPanel(x: number, y: number): void;
    moveOverRemains(): void;
    moveEnd(): void;
}
export interface IStateBoard{
}
export default class BoardComponent extends React.Component<IPropBoard, IStateBoard>{
    protected mouseDownHandler: any;
    protected mouseMoveHandler: any;
    protected mouseUpHandler: any;
    protected touchStartHandler: any;
    protected touchMoveHandler: any;
    protected touchEndHandler: any;
    componentDidMount(){
        this.mouseDownHandler = (e: MouseEvent)=>{
            const {
                button,
                clientX,
                clientY,
            } = e;
            if (button !== 0){
                return;
            }
            e.preventDefault();
            this.handleMoveStart(clientX, clientY);

            this.mouseMoveHandler = (e: MouseEvent)=>{
                const {
                    clientX,
                    clientY,
                } = e;
                this.handleMove(clientX, clientY);
            };
            this.mouseUpHandler = ()=>{
                this.handleMoveEnd();
                document.removeEventListener('mousemove', this.mouseMoveHandler, false);
                document.removeEventListener('mouseup', this.mouseUpHandler, false);
            };

            document.addEventListener('mousemove', this.mouseMoveHandler, false);
            document.addEventListener('mouseup', this.mouseUpHandler, false);
        };
        document.addEventListener('mousedown', this.mouseDownHandler, false);
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown', this.mouseDownHandler, false);
    }
    render(){
        return <div className="board-wrapper">
            <div className="borad">
                <Panel />
                <div className="board-description">
                    <Description />
                    <Remains />
                </div>
            </div>
        </div>;
    }
    protected handleMoveStart(clientX: number, clientY: number): void{
        const {
            moveFromPanel,
            moveFromRemains,
        } = this.props;
        const pnt = document.elementFromPoint(clientX, clientY) as HTMLElement;

        const elm = findParent(pnt, elm=>
            elm.dataset.panel === 'panel' ||
            elm.dataset.remains === 'remains');
        if (elm != null){
            if (elm.dataset.panel === 'panel'){
                moveFromPanel(parseInt(elm.dataset.x!), parseInt(elm.dataset.y!));
            }else{
                moveFromRemains(parseInt(elm.dataset.idx!));
            }
        }
    }
    protected handleMove(clientX: number, clientY: number): void{
        const {
            moveOverPanel,
            moveOverRemains,
            moveOverNone,
        } = this.props;
        const pnt = document.elementFromPoint(clientX, clientY) as HTMLElement;

        const elm = findParent(pnt, elm=>
            elm.dataset.panel === 'panel' ||
            elm.dataset.remainsarea === 'remainsarea');
        if (elm != null){
            if (elm.dataset.panel === 'panel'){
                moveOverPanel(parseInt(elm.dataset.x!), parseInt(elm.dataset.y!));
            }else{
                moveOverRemains();
            }
        }else{
            moveOverNone();
        }
    }
    protected handleMoveEnd(): void{
        const {
            moveEnd,
        } = this.props;
        moveEnd();
    }
};
