const express = require('express');
const router = express.Router();
const Squares = require('../models/squaresModel.js');

router.post("/save", function(req, res) {
  
  const squares = new Squares({ 
    savedBoard: req.body.savedBoard,
    name:  req.body.name,
    structure:  req.body.structure
  });
  
  squares.save(function(err, data) {
    if(err) {
      res.status(400).json({responseText: "server- Oops! Something went wrong."});
    } else {
      res.status(200).json({responseText: "server- Ok, I catch'ya, keep on going!"});
    }
  });
  
});

router.put("/update/:id", function(req, res) {
  Squares.findByIdAndUpdate(req.params.id, {name: req.body.newName}, {new: true}, function(err, newData){
    if(err) {
      res.status(400).json({responseText: "server- Oops! Something went wrong."});
    } else {
      res.status(200).json({responseText: "server- name successfully updated!"});
    }
  });
});

router.get("/load", function(req, res) {
  Squares.find({}, function(err, boards) {
     if(err) {
      res.status(400).json({responseText: "server- Oops! Something went wrong."});
    } else {
       var boardsMap = {};
            boards.forEach(function(board, idx) {
              boardsMap[idx] = board;
            });
      res.status(200).json(boardsMap);
    }
  });
});

router.delete("/delete/:id", function(req, res) {
  Squares.findByIdAndRemove(req.params.id, function(err, data) {
    if(err) {
      res.status(400).json({responseText: "server- Oops! Something went wrong."});
    } else {
      res.status(200).json({responseText: "server- data successfully deleted!"});
      console.log("data deleted: " + data.name);
    }
  });
});

module.exports = router;