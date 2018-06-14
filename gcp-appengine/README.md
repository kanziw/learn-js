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

