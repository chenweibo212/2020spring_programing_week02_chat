// server.js

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/mytwitter";
const mongo = require("mongodb").MongoClient;

let dbclient;

// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

app.get("/counter", async (req,res) => {
  //get the collection
  const collection = await dbclient.collection("site-info");

  //find the document
  const item = await collection.findOne( {} );

  //get your data out of the item
  const pageviews = item ? item.pageviews + 1 : 1;

  //save this back to database
  //1. search; 2. set; 3. optional
  await collection.updateOne(
    {}, 
    { $set: {
      pageviews: pageviews
    }
    }, {
      upsert: true
    });
   
  res.send(`this page has been visited ${pageviews} times.`)
});

// listen for requests :)
mongo.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((client) => {
  dbclient = client.db();

  const listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + port);
  });

})
