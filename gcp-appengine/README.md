# GCP App Engine

> Quickstart for Node.js in the App Engine



## Setup project

### Project

```bash
$ yarn init
$ yarn add express bluebird
```

### app.js

> via [Link](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/appengine/hello-world/standard/app.js)

```javascript
const express = require('express')
const Promise = require('bluebird')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end()
})

app.get('/async', async (req, res) => {
  await Promise.delay(3000)
  res.status(200).send('Hello, world! (After 3 seconds)').end()
})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
```

### app.yaml

```yaml
runtime: nodejs8
```

### Google App Engine

* [Link](https://console.cloud.google.com/cloud-resource-manager) 에서 `kanziw-start-ap-nodejs` project 생성

```bash
$ gcloud auth login
$ gcloud config set project kanziw-start-ap-nodejs
```

### Deploy

```bash
$ gcloud components update
$ gcloud app deploy --project=kanziw-start-ap-nodejs
```

* 헌데 아래의 에러와 함께 실패.

```
ERROR: (gcloud.app.deploy) Error Response: [7] Access Not Configured. Container Builder has not been used in project kanziw-start-ap-nodejs before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/cloudbuild.googleapis.com/overview?project=kanziw-start-ap-nodejs then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.
```

* Billing 설정이 되어있지 않아서이며, Billing 설정 이후 다시 수행
  * 다만, 테스트 용이기에 혹시 모를 지불에 대비해 무료사용량만 사용할 수 있도록 설정한다.
  * App Engine - Settings - Application settings - Edit
    * Daily spending : USD 0

```bash
$ gcloud app deploy --project=kanziw-start-ap-nodejs
```



## Usage

### URL Handler

* /asset 에 대한 요청은 asset directory 에서 static 하게 파일 서빙
* 나머지는 https only 로 서빙

#### app.yaml

```yaml
runtime: nodejs8

handlers:
- url: /asset
  static_dir: asset

- url: /.*
  secure: always
  script: auto
```

* 단, 개발 시 로컬에서 문제 없게 하기 위해 static directory 는 코드 내에서 한번 더 지정해준다.
  * production 상황에선 해당 url 에 대한 라우팅은 앞단에서 처리한다.

```javascript
app.use('/asset', express.static(__dirname + '/asset'))
```



### Logs

#### 설정

* 디버깅 등을 위해 실시간으로 로그를 봐야 할 때가 있다.
* morgan logger 를 추가
  * `app.use(morgan('short'))`
* package.json 에 `"logs": "gcloud app logs tail -s default --project=kanziw-start-ap-nodejs"` script 추가

#### 사용 후기

##### 실제 로그

```bash
2018-06-16 00:04:46 default[20180616t085135]  "GET / HTTP/1.1" 200
2018-06-16 00:05:47 default[20180616t085135]  "GET /async HTTP/1.1" 304
2018-06-16 00:05:47 default[20180616t085135]  "GET /async HTTP/1.1" 200
2018-06-16 00:05:52 default[20180616t085135]  "GET /ip HTTP/1.1" 304
2018-06-16 00:05:52 default[20180616t085135]  "GET /ip HTTP/1.1" 200
2018-06-16 00:05:58 default[20180616t085135]  "GET /asset/kanziw.png HTTP/1.1" 304
```

* 실시간이 아니라 딜레이가 좀 있다.
  * stackdriver 의 로그를 보여주는 듯 하다.
* 내가 custom 하게 추가한 로그는 보여지지 않는다?!
  * morgan 및 console.log 를 통해 찍는 로그가 보여지지 않고있다.
  * `--user-output-enabled` 을 적용 해보았지만 여전히 보이지 않는다.
* stackdriver 내에선 아래의 방법으로 로깅한 내용을 볼 수 있다.
  * morgan / console.log / console.debug / console.info / console.warn / console.error
* 아직 지원하지 않던지.. 다른 방법을 찾아봐야겠다.

