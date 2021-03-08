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
        createElement (type, props, children) {
            return {
                type : type,
                props : {
                    ...props,
                    children : children !== undefined ? children.map((child) => {
                        if(typeof child === "object"){
                            return this.createElement(child.type, child.props, child.props.children);
                        } else {
                            return this.createText(child);
                        }
                    }) : undefined
                }
            }
        },
        createDom (element) {
            const _node = document.createElement(element.type);

            for(let [key, value] of Object.entries(element.props)){
                if(key === "children"){
                    continue;
                }
                if (key === "class") {
                    key = "className";
                }
                _node[key] = value;

            }
            if(element.props.children !== undefined){
                element.props.children.forEach((child) => {
                    if(child.type === "TEXT_ELEMENT"){
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
    }

    createComponents(components) {
        const _nodeTree = this._CreateComponents.createElement(components.type, components.props, components.props.children);

        const _components = this._CreateComponents.createDom(_nodeTree);

        return _components;
    }
    
    render(entry, components) {
        if(typeof entry !== "object"){
            entry = document.querySelector(entry);
        }
        entry.appendChild(components);
    }
}

export default Isa;