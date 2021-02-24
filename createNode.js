const element = {
    type : "h1",
    props : {
        title : "foo",
        children : "Hello"
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