import React from 'react';
import marked from 'marked';
import prism from 'prismjs';

// marked.setOptions({
//     renderer: new marked.Renderer(),
//     gfm: true,
//     tables: true,
//     breaks: true,
//     pedantic: false,
//     sanitize: true,
//     smartLists: true,
//     smartypants: false
// });

const content =
  'Marked Demo\n' +
'======================\n\n' +

'这是一个Marked库使用的例子。 http://blog.fens.me/nodejs-markdown-marked/\n\n' +

'> A full-featured markdown parser and compiler, written in JavaScript. Built\n' +
'> for speed.\n\n' +

'[![NPM version](https://badge.fury.io/js/marked.png)][badge]\n\n' +

'## Install\n\n' +

'``` bash\n' +
'npm install marked --save\n' +
'```\n\n' +

'## 列表测试\n\n' +

'+ 列表测试，行1\n' +
'+ 列表测试，行2\n' +
'+ 列表测试，行3\n' +
'+ 列表测试，行4\n\n' +

'## 表格测试\n\n' +

'A | B | C\n' +
'--|--|--\n' +
'A1 | B1 | C1\n' +
'A2 | B2 | C2\n' +
'A3 | B3 | C3\n\n' +

'aaaaa\n\n' +

'```js\n' +
'import React from \'react\';\n\n' +

'const Home = () => {\n' +
'  return (\n' +
'    <div>\n' +
'      <h1>Home Page</h1>\n' +

'      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam architecto at exercitationem ipsa iste molestiae nobis odit! Error quo reprehenderit velit! Aperiam eius non odio optio, perspiciatis suscipit vel?</p>\n' +
'    </div>\n' +
'  );\n' +
'};\n\n' +

'export default Home;\n' +
'```\n';

const Article = () => {
  return (
    <div dangerouslySetInnerHTML = {{ __html: marked(content) }} />
  );
};

export default Article;
