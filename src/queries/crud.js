
const mongoose = require('mongoose')

function checkDoublons (tab)
{
var uniqueValues = [];
var arr = tab.filter(function(el) {
  // If it is not a duplicate, return true
  if (uniqueValues.indexOf(el) == -1) {
    uniqueValues.push(el);
    return true;
  }
  return false; 
});

//return array without duplicates
return arr
}

// Create
exports.create = (Collection, req,res) => {
    reqUrl=req.originalUrl
    let tab = []
     if(req.originalUrl.includes("produits"))
     {
              tab = checkDoublons(req.body.category) 
              req.body.category=tab
     }
 
    newEntry=new Collection(req.body)
    newEntry.save(newEntry, (e,newEntry) => {
      if(e) {
        console.log(e);
        res.sendStatus(500);
      } else {
        res.send(newEntry);
      }
    });

}

// Read many
  exports.readMany = (Collection,req, res) => {
    let query = res.locals.query || {};
  
    Collection.find(query, (e,result) => {
      if(e) {
        res.status(500).send(e);
        console.log(e.message);
      } else {
        res.send(result);
      }
    });
  };

  // Read one
  exports.readOne = (Collection,req, res) => {  
    Collection.findById(req.params.id, (e,result) => {
      if(e) {
        res.status(500).send(e);
        console.log(e.message);
      } else {
        res.send(result);
      }
    });
  };
  
  // Update
  exports.update = (Collection,req, res) => {
    const changedEntry = req.body;
    Collection.findByIdAndUpdate({ _id: req.params.id }, changedEntry, { new: true })
    .then(result => {
       if(req.originalUrl.includes("users"))
       {
        const newUser = new Collection(result)
        newUser.save()
        .then(user => {return res.json(user)})
       }
       else
       {
        return res.json(result)
       }
    })
    .catch(err => {return res.json(err)} )
  }; 
  
  // Delete one
  exports.remove = (Collection,req, res) => {
    Collection.findByIdAndDelete({ _id: req.params.id }, (e, result) => {
      if (e)
      res.status(500).send(e);
      else
        res.sendStatus(200);
    });
  };


