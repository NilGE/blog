# Blog

## 1. Pre-requisite
this project is based on mongoDB and node.js, if you have not installed mongoDB and node.js please refer:

* [Installing MongoDB on a Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* [How to Install Node.js and NPM on a Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac)

## 2. Start server

Go the project root directory and start the server

```bash
npm install
npm start
```
or start in dev mode:

```bash
npm run dev
```

Then open [localhost at port 8080](http://localhost:8080)

## 3. Google Cloud Platform

* Use mLab Cloud-hosted MongoDB. Account and password can be found in keePass
* Cloud version config file is `config/configCloud.js` in config directory. Make a change in
`server-dev.js` and `server.js` to convert to cloud version:

	```js
	const config = require('./config/config');
	
	==>
	
	const config = require('./config/configCloud');
	
	```
* Deploy on Google Cloud Platform: go to project folder and run `gcloud app deploy`
* [Open app](https://blog-176014.appspot.com) in browser


## 4. mLab

mongo ds129183.mlab.com:29183/blog -u neilge -p Gxy660909

**TODO: might need to change the host setting in server.js**