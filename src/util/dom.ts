// さかのぼって条件みたすやつを探す
export function findParent(node: HTMLElement, pred: (elm: HTMLElement)=>boolean): HTMLElement | undefined{
    if (node == null){
        return void 0;
    }
    do {
        if (pred(node)){
            return node;
        }
    }while(node = node.parentNode as HTMLElement, node && node.nodeType === Node.ELEMENT_NODE);
    return void 0;
}
