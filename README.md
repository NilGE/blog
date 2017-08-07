# blog

## 1. Dependencies
this project is based on mongoDB and node.js, if you have not installed mongoDB and node.js please refer:
* [Installing MongoDB on a Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* [How to Install Node.js and NPM on a Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac)

## 2. Start server

Go the project root directory and run

```
npm install
npm start
```

Then open http://localhost:8080

## 3. Google Cloud Platform

* Use mLab Cloud-hosted MongoDB. Account and password can be found in keePass
* Cloud version config file is `config/configCloud.js` in config directory. Make a change in
`server/index.js`:

```
import config from '../config/config';

==>

import config from '../config/configCloud';

```


TODO: might need to change the host setting in server.js
