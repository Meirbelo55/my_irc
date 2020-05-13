var http = require('http')
const express = require ('express');
const path = require('path')
const app = express()
const router = express.Router();
router.get('/',function(req,res){
    res.sendFile(path.join('/home/meir/Downloads/first-year/my_irc' + '/views/index.html'))
});
app.use('/',router);
app.listen(1337);