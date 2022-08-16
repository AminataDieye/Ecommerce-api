// Create
exports.create = (Collection, req, res) => {
  newEntry = new Collection(req.body)
  newEntry.save()
    .then(newEntry => { res.status(200).json(newEntry) })
    .catch(error => {
      // const errors = this.getErrors(error)
      res.status(500).json(this.getErrors(error))
    })
}
exports.getErrors = (error) => {
  let errors = {};
  if (error.code === 11000)
    errors = Object.keys(error.keyValue)[0] + ' existe déja'
  else {
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
  }
  return errors

}


// Read many
exports.readMany = (Collection, req, res) => {
  Collection.find()
    .then(result => { res.status(200).json(result) })
    .catch(error => { res.status(500).json(error) })
};

// Read one
exports.readOne = (Collection, req, res) => {
  Collection.findById(req.params.id, (e, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.send(result);
    }
  });
};

// Update
exports.update = (Collection, req, res) => {
  const changedEntry = req.body;
  Collection.findByIdAndUpdate({ _id: req.params.id }, changedEntry, { new: true })
    .then(result => {
      if (req.originalUrl.includes("users")) {
        const newUser = new Collection(result)
        newUser.save()
          .then(user => { return res.json(user) })
      }
      else {
        return res.json(result)
      }
    })
    .catch(err => { return res.json(err) })
};

// Delete one
exports.remove = (Collection, req, res) => {
  Collection.findByIdAndDelete({ _id: req.params.id }, (e, result) => {
    if (e)
      res.status(500).send(e);
    else
      res.sendStatus(200);
  });
};


