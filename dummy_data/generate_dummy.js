let dummyDataGenerator = require('./dummydata-init.js'),
    fs = require('fs'),
    path = require('path');

fs.readFile(path.join(__dirname, 'data_definition.json'), (err, data) => {
    if (err) throw err;
    const response = JSON.parse(data.toString());

    Promise.all(response.map(def => {
        const filePath = path.join(__dirname, 'data', def.fileName);
        return new Promise(resolve =>
            dummyDataGenerator(filePath, def.definition).then(() => {
               resolve({
                   url: def.fileName.split('.')[0],
                   filePath: path.join('dummy_data', 'data', def.fileName)
               });
            }));
    })).then(defs => {
        fs.writeFile(path.join(__dirname, 'restpoint_def.json'), JSON.stringify(defs), 'utf8', (err) => {
            console.log(err);
        });
    })
});