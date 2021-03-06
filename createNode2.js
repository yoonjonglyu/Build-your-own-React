import ISA from "./lib/isaBasic.js";

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

/**
 *     const element2 = {
        type : "div",
        props : {
            id : "main",
            role : "main",
            children : [
                {
                    type : "p",
                    props : {
                        class : "test1",
                        style : "color : red;",
                        children : [
                            "hi test"
                        ]
                    },
                },
                "test2",
                {
                    type : "br",
                    props : {
    
                    }
                },
                "test3"
            ]
        },
    };
 */
(() => {
    const element2 = ISA.createElement("div", 
    {
        id : "main",
        role : "main",
    },
    [
        ISA.createElement("p",{
            class : "test1",
            style : "color : red;",
        },
        [
            "hi test"
        ]),
        "test2",
        ISA.createElement("br"),
        "test3"
    ]
    )
    const components = ISA.createComponents(element2);
    ISA.render(document.querySelector("#root2"), components);
})();

/**
 * ES6 모듈의 경우 같은 모듈 type안에서만 export import가능하다.
 * 그리고 로컬에서는 웹에서 로컬 파일을 참조못하게 하기 위해서 보안 설정 되어서 서버에 올려서 돌려야 정상적으로 확인가능하다.
 */