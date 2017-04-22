import * as React from 'react';

import Panel from '../container/panel';
import Remains from '../container/remains';
import Description from './description';

import Edit from '../container/edit';

import {
    findParent,
} from '../util/dom';

export interface IPropBoard{
    size: {
        x: number;
        y: number;
    };
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
            if (this.handleMoveStart(clientX, clientY)){
                e.preventDefault();
            }

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

        this.touchStartHandler = (e: TouchEvent)=>{
            const {
                changedTouches,
            } = e;
            const t = changedTouches[0];
            if (t == null){
                return;
            }
            const {
                clientX,
                clientY,
                identifier,
            } = t;

            this.handleMoveStart(clientX, clientY);

            this.touchMoveHandler = (e: TouchEvent)=>{
                const {
                    changedTouches,
                } = e;
                for (let i = 0; i < changedTouches.length; i++){
                    const {
                        identifier: id2,
                        clientX,
                        clientY,
                    } = changedTouches[i];
                    if (identifier === id2){
                        this.handleMove(clientX, clientY);
                        break;
                    }
                }
            };
            this.touchEndHandler = ()=>{
                this.handleMoveEnd();

                document.removeEventListener('touchmove', this.touchMoveHandler, false);
                document.removeEventListener('touchend', this.touchEndHandler, false);
                document.removeEventListener('touchcancel', this.touchEndHandler, false);
            };
            document.addEventListener('touchmove', this.touchMoveHandler, false);
            document.addEventListener('touchend', this.touchEndHandler, false);
            document.addEventListener('touchcancel', this.touchEndHandler, false);
        };
        document.addEventListener('touchstart', this.touchStartHandler, false);
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown', this.mouseDownHandler, false);
        document.removeEventListener('touchstart', this.touchStartHandler, false);
    }
    render(){
        const {
            x,
        } = this.props.size;
        const width = Math.max(300, x * 48);
        const style = {
           'maxWidth': `${width}px`,
        };
        return <div className="board-wrapper">
            <div className="board" style={style}>
                <Panel />
                <div className="board-description">
                    <Description />
                    <Remains />
                </div>
                <Edit />
            </div>
        </div>;
    }
    protected handleMoveStart(clientX: number, clientY: number): boolean{
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
            return true;
        }
        return false;
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
