//create router and path dependencies
var router =require("express").Router();
var path =require("path");

//reouter.get
  //notes, sendFile to notes.html
router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname,"../public/notes.html"))
})

  //get home page, send to index.html
router.get("*", function(req, res){
    res.sendFile(path.join(__dirname,"../public/index.html"))
})

//export router
module.exports = router

