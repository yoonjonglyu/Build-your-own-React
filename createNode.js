const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello"
    }
};
const container = document.getElementById("root")

const node = document.createElement(element.type);
node.title = element.props.title;

const text = document.createTextNode("");
text.nodeValue = element.props.children;

node.appendChild(text);
container.appendChild(node);

/**
 * 간단한 헬로 월드를 리액트 라이브러리에서 단순히 DOM에 파싱해서 렌더링 하는 과정이다.
 * 이걸 라이브러리를 통해서 자동화해준다. 그것도 명령형이 아닌 선언형 방식으로 API 사용법만
 * 알면 되게 모두 은닉해서 말이다. 제이쿼리가 SPA 라이브러리 보다 편하다는 사람들은
 * 이것에 대해서 아무런 생각조차 없기에 그런 소리가 나오거나 간단한 코딩만 하기에 그렇겠지. 
 */

class Spact {
    constructor() {
        this._node = undefined;
    }

    createElement(type, ...props) {
        const _node = this._node = document.createElement(type);

        props.forEach((child) => {
            if (typeof child === "object" && Object.keys(child).length > 0) {
                for (let [key, value] of Object.entries(child)) {
                    if (key === "class") {
                        key = "className";
                    }
                    _node[key] = value;
                }
            } else if (typeof child === "string") {
                const _text = document.createTextNode("");
                _text.nodeValue = child;
                _node.appendChild(_text);
            } else {
                _node.appendChild(child);
            }
        });

        return this._node;
    }
    render(entry, components) {
        const container = document.querySelector(entry);

        container.appendChild(components);
    }
}

const View = new Spact();

const HelloSpact = View.createElement(
    "h2",
    { "class": "foo" },
    "Hello2",
    View.createElement(
        "p",
        "재귀구조 순환",
        View.createElement(
            "div",
            {"id" : "foo"},
            View.createElement("br"),
            "인라인 속성안의 블록속성",
        )
    )
);

View.render("#root", HelloSpact);

/**
 * @jsx View.createElement 바벨 트랜스 파일시 지시
 */
/*
const HelloComponents = (
    <h2 class="foo">
        Hello2
        <p>
            재귀구조 순환
            <div id="foo">
                <br />
                인라인 속성안의 블록속성
            </div>
        </p>
    </h2>
);
*/

/**
 * 아무 생각 없이 만들다 보니 createElement함수가 명명과 다르게 너무 광범위한 역할을 수행한다(DOM 트리 구축)
 * 트랜스파일러를 통해서 jsx를 처리하는 방법에 대한 궁금증이 조금 생기긴한다.
 * 클래스 형이나 함수형이나 사실 그닥 차이는 없다고 느낀다. 좀 더 코드 스타일이 달라지긴하는 듯 글고 함수형이
 * 확실히 좀 더 유연하긴하다.
 */

let nextUnitOfWork = null;

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performanceUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaning() < 1;
    }
    requestAnimationFrame(workLoop);
}

function performanceUnitOfWork(nextUnitOfWork) {
    
}

requestAnimationFrame(workLoop);

