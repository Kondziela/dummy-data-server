const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// default middlewares
server.use(middlewares)
// use body parser for POST, PUT and DELETE
server.use(jsonServer.bodyParser)

// code to host whole file of data
server.get('*', (req, res, next) => {
  if (req.originalUrl.split('/').length < 3) {
    fs.readFile(path.join('dummy_data', 'data', `${req.originalUrl.split('/')[1]}.json`), (err, data) => {
      if (!err) {
        res.jsonp(JSON.parse(data.toString()));
      } else {
        console.error(err);
      }
    });
  } else {
    next();
  }
})
// OUR DUMMY RESTPOINT (URL for respoint contains below URL and name of object from JSON file)
server.use('/personal', jsonServer.router('dummy_data/data/personal.json'))
server.use('/interactions', jsonServer.router('dummy_data/data/interactions.json'))
server.use('/insurance', jsonServer.router('dummy_data/data/insurance.json'))
server.use('/dashboard', jsonServer.router('dummy_data/data/dashboard.json'))

// routing for dummy data from JSON files
fs.readFile(path.join('dummy_data', 'restpoint_def.json'), (err, data) => {
  if (err) {
    console.log('No file with predefined restpoints from JSON files');
  } else {
    JSON.parse(data.toString()).forEach(def => {
      console.log(`Set proxy for /${def.url}`, def.filePath)
      server.use('/' + def.url, jsonServer.router(def.filePath))
    })
  }
  server.listen(3000, () => {
    console.log('JSON Server is running')
    server._router.stack.forEach(function(r){
      if (r.route && r.route.path){
        console.log(r.route.path)
      }
    })
  })
});

