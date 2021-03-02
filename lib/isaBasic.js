class Isa {
    _CreateComponents = {
        createText (text) {
            return {
                type : "TEXT_ELEMENT",
                props : {
                    nodeValue : text,
                    children : []
                }
            };
        },
        createElement (type, props, ...children) {
            return {
                type : type,
                props : {
                    ...props,
                    children : children.map((child) => {
                        if(typeof child === "object"){
                            return child;
                        } else {
                            return this.createText(children);
                        }
                    })
                }
            }
        }
    }

    createComponents(type, props, ...children) {
        const _nodeTree = this._CreateComponents.createElement(type, props, ...children);

        return _nodeTree;
    }
    
    render(entry, components) {
        if(typeof entry !== "object"){
            entry = document.querySelector(entry);
        }
        entry.appendChild(components);
    }
}