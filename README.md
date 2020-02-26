### Dummy data server
Dummy server is based on npm json server instance, which can automaticly generate dummy data based on data definition and host it as server with database.

Documentation page: `https://www.npmjs.com/package/json-server#add-custom-routes`

How to run server:
 - install NodeJS
 - install dependencies `npm i`
 - start `npm run start` or just `node server.js`

#### Generation of Dummy Data
 - Create definition of dummy in `dummy_data\data_definition.json`. 
   - Types of fields are under URL: `http://www.filltext.com/`
   - Structure of definition: 
   ```javascript
   {
       "fileName": "FILENAME.json",
       "definition": {
           "COLLECTION_NAME": {
                "fields": {
                 "FIELD1": "TYPE1",
                 "FIELD2": "TYPE2"
                },
                "rows": "NUMBER_OF_OBJECTS"
           }
     }
   }
   ```
  - Generate dummy data with command `npm run gen-dummy`
  - After start of server the generated dummy data will be hosted under URL: `FILENAME/COLLECTION_NAME`