const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// default middlewares
server.use(middlewares)
// use body parser for POST, PUT and DELETE
server.use(jsonServer.bodyParser)
// example restpoint
server.get('/echo', (req, res) => {
  res.jsonp({
    data: [{
      name: "I\' dummy"
    },
      {
        name: "Delete me"
      }]
  })
})

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

