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

