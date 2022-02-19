function appendStyle(node: HTMLElement, newStyle: any): void {
  node.setAttribute('class', node.className + ' ' + newStyle);
}

export default appendStyle;
