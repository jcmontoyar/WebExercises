var express = require("express");
var router = express.Router();
const fs = require("fs");
var path = require("path")
const locJson = "/db/prueba.json";


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/messages", function (req, res) {
  res.send(JSON.parse(fs.readFileSync(path.join(__dirname, '..', locJson))))
});


router.get('/messages/:ts', function (req, res, next) {
    messages = JSON.parse(fs.readFileSync(path.join(__dirname, '..', locJson)))
    for(let i of messages){
        if(i["ts"] == req.params.ts){
            res.send(i)
            break;
        }
    }
    
  })

module.exports = router;
