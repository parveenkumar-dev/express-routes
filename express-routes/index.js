const express = require('express')
const app = express();
const port = 3000
const path = require('path')
var cors = require('cors')

function iteratorJson(storeInvDecodedMsg) {
  const dataTypes = ["boolean", "int", "long", "float", "double", "bytes", "string", "array", "map", "io.confluent.connect.avro.references"]
  Object.keys(storeInvDecodedMsg).map(storeinv => {
    let value = storeInvDecodedMsg[storeinv];
    if(value != undefined) {
        if (value && typeof value === 'object' && !dataTypes.some(x => value.hasOwnProperty(x))) {
          return iteratorJson(value);
        } else {
            const actualValue = (typeof value === 'object') ? Object.values(value)[0] : value;
            if(typeof value === 'object') { // if data type object is still nested, iterate it again
              storeInvDecodedMsg[storeinv] = actualValue;
              return iteratorJson(value);
            }
            storeInvDecodedMsg[storeinv] = actualValue;
            return storeInvDecodedMsg;
        }
    }
  });
  return storeInvDecodedMsg;
}

const dataa = {
	"EVENT_ID": {
    "int": 123444
  },	
	"SKU_ID": "878787",
	"NEW_OWNERSHIP_CD": "MFG",
	"NEW_CLASS_CD": "HFP",
	"NEW_CONDITION_CD": "CONV",
	"OLD_OWNERSHIP_CD": {
    "string": "Old Sup1"
  },
	"OLD_CONDITION_CD": "Old Sup2",
	"OLD_CLASS_CD": "Old Sup3",
	"UNIT_OF_MEASURE": "EA",
	"OLD_BLDG_ID": "45",
	"BLDG_ID": "40",
	"QTY": 676,
	"REASON_CD": "RES",
	"REASON_DESCRIPTION": "Some Desc",
	"RECORD_TYPE": "INV_RECLASS",
	"CREATED_BY": "-1",
	"CREATION_DATE": "2021-08-23T14:18:11.000Z",
	"LAST_UPDATED_BY": "-1",
	"LAST_UPDATE_DATE": "2021-08-23T14:18:11.000Z"
}

app.use(cors())
// const aa = iteratorJson(dataa);
// console.log(JSON.stringify(aa));
// console.log(path.join(__dirname, '/public'))
app.use('/public', express.static('public'))
// app.use('/public', express.static(path.join(__dirname, '/public')), function (req, res, next) {
//   res.status(404);
//   res.json({error:{code:404}})
//   next()
// })

app.get('/get', (req, res) => {
  res.status(200).send(`get api`).end();
});

app.post('/dummy', (req, res) => {
  res.status(504).send(`post api`).end();
});
// console.log(path.join(__dirname, 'public'))
// app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})