(function () {
    const element = {
        type: "div",
        props: {
            id: "foo",
            children: [
                {
                    type: "p",
                    props: {
                        children: [
                            "bar"
                        ]
                    }
                },
                {
                    type: "img",
                    props: {
                    }
                }
            ]
        }
    };

    const container = document.getElementById("root2")

    const node = document.createElement(element.type);
    node.id = element.props.id;

    const childNode = document.createElement(element.props.children[0].type);
    const text = document.createTextNode("");
    text.nodeValue = element.props.children[0].props.children[0];

    const childNode2 = document.createElement(element.props.children[1].type);

    childNode.appendChild(text);
    node.appendChild(childNode);

    node.appendChild(childNode2);

    container.appendChild(node);
})();

/** 
 * 동적 계획법으로 순환하는 구조의 DOM 렌더링이 가능하다.
 */