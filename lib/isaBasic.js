class Isa {
    constructor() {
        this._nextUnitOfWork = null;
    }
    createElement(type, props, children) { // 내부함수를 외부로 캡슐화 등의 요소는 조금 더 보완할 필요가있음.
        return this._CreateComponents.createElement(type, props, children);
    }
    createComponents(components) { // 기존 object를 무의미하게 중복해서 갱신하던 부분 제거
        const _components = this._CreateComponents.createDom(components);
        // @todo workLoop
        return _components;
    }
    render(entry, components) {
        if (typeof entry !== "object") {
            entry = document.querySelector(entry);
        }
        entry.appendChild(components);
    }
    _CreateComponents = {
        createText(text) {
            return {
                type: "TEXT_ELEMENT",
                props: {
                    nodeValue: text,
                    children: []
                }
            };
        },
        createElement(type, props, children) {
            return {
                type: type,
                props: {
                    ...props,
                    children: children !== undefined ? children.map((child) => {
                        if (typeof child === "object") {
                            return this.createElement(child.type, child.props, child.props.children);
                        } else {
                            return this.createText(child);
                        }
                    }) : undefined
                }
            }
        },
        createDom(element) {
            const _node = document.createElement(element.type);

            for (let [key, value] of Object.entries(element.props)) {
                if (key === "children") {
                    continue;
                }
                if (key === "class") {
                    key = "className";
                }
                _node[key] = value;

            }
            if (element.props.children !== undefined) {
                element.props.children.forEach((child) => {
                    if (child.type === "TEXT_ELEMENT") {
                        const _text = document.createTextNode("");
                        _text.nodeValue = child.props.nodeValue;
                        _node.appendChild(_text);
                    } else {
                        const _childNode = this.createDom(child);
                        _node.appendChild(_childNode);
                    }
                });
            }

            return _node;
        }
    };

    _CreateWorkFiber = {
        workLoop(deadline) { // fiber 자체는 그냥 트리 자료구조에 DFS로 렌더 트리를 구축하는 것에 가깝다.
            let shouldYield = false;
            while (this._nextUnitOfWork && !shouldYield) { // requestIdleCallback이나 requestAnimationFrame이나 결국 작업중단 및 연결
                this._nextUnitOfWork = this.performanceUnitOfWork(this._nextUnitOfWork);
                shouldYield = deadline.timeRemaing() < 1;
            }
            requestIdleCallback(this._CreateWorkFiber.workLoop);
        },
        performanceUnitOfWork(fiber) {
            if (!fiber.dom) {
                fiber.dom = this._CreateComponents.createDom(fiber);
            }
            if (fiber.parent) {
                fiber.parent.dom.appendChild(fiber.dom);
            }
            const elements = fiber.props.children;
            let index = 0;
            let prevSibling = null;
    
            while (index < elements.length) {
                const element = elements[index];
    
                const newFiber = {
                    type: element.type,
                    props: element.props,
                    parent: fiber,
                    dom: null,
                };
                if(index === 0){ 
                    fiber.child = newFiber;
                } else {
                    prevSibling.sibling = newFiber;
                }
                
                prevSibling = newFiber;
                index++;
            }
    
            if (fiber.child) {
                return fiber.child
              }
              let nextFiber = fiber
              while (nextFiber) {
                if (nextFiber.sibling) {
                  return nextFiber.sibling
                }
                nextFiber = nextFiber.parent
              }
        }
    }
}

export default Isa;