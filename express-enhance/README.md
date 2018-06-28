# express-enhance pattern

> [링크](https://medium.com/steady-study/번역-아주-거대한-자바스크립트-어플리케이션을-구축하기-3aa37fc45122) 의 글을 읽고 테스트 해보았다.



## What is enhance?

* 위 링크의 글을 통해 소개 받은 방식
* "상위" 모듈이 "하위" 모듈을 import 하여 의존성 관계를 나타내지 않고
* "하위" 모듈이 "상위" 모듈에 자기 자신을 알린다.



## How to use in express

* express 모듈은 (적어도 내가 생각할 떈) enhance 방식이 적합하지 않다.
* sub path 들에 대해 중앙에서 tree 형식으로 관리하고
* 이 구조의 장점을 잘 살리도록 설계 된 방식이다.
* 그럼에도 불구하고 사용 해보자면 아래의 패턴을 사용하면 될 것 같다.



### /index.js

```javascript
const express = require('express')

const app = express()

app.get('/', (req, res) => res.json({ path: '/' }))

module.exports = app

// api 디렉터리 밑에 있는 index.js 를 모두 찾아 require 한다.
const { join } = require('path')
require('glob').sync(`${join(__dirname, './api')}/**/index.js`).forEach(file => require(file))
```

* 가장 main 이 되는 index.js 에선 아래의 역할을 수행한다.
  * app 객체 생성
  * 자기 자신을 export
  * 하위 모듈들의 index.js 를 순회하며 require

### /api/index.js

```javascript
const app = require('../index')

app.get('/api', (req, res) => res.json({ path: '/api' }))

module.exports = app
```

* 중간 라우팅을 담당하는 /api 에선 상위(main) 을 import 하고 자기의 path 에서 수행 할 일을 수행한다.
* 그리고 상위에서 import 한 app 을 다시 export 한다.

### /api/sub/index.js

```javascript
const app = require('../index')

app.get('/api/sub', (req, res) => res.json({ path: '/api/sub' }))
```

* 각 sub 라우팅 모듈은 자신의 "상위" 모듈을 import 한다.
* 자기의 해야 할 일을 수행한다.



## But

* 어떤 파일이 먼저 require 되어 적용될 지 모른다.
* 즉, pipeline 처럼 api endpoint 를 관리할 수 있는 express 의 기능을 express 답게 활용할 수 없다는 것.
  * main index.js 에서 공통으로 통과해야 하는 middleware 를 앞단에서 정의하면 됨
  * express 답지 못할 뿐..
* 상위 라우팅 주소가 바뀌면 그 아래에 있는 하위 라우팅 파일의 라우팅 주소를 모두 고쳐야 한다.
* 하위에서 여러번 require 하면 require 할 때 마다 해당 파일이 실행되는 것은 아닐까?

## But of But

* 상위 path 보다 먼저 하위 path 가 require 된다?
  * 바로 상위 디렉터리에 있는 모듈을 require 한다는 원칙만 지킨다면 그럴 일은 없을 것.
  * 근데 그 원칙을 지키는 것이 문제일 뿐.
* 상위에서 객체를 전달하기 때문에 shared 객체를 활용하기에 좋아보임
* 하위에서 상위 모듈을 여러번 require 해도 상위 모듈의 로직은 한번만 수행됨
  * app.locals.cnt 값 증가하는 로직을 넣었지만 한번만 해당 기능이 수행됨

