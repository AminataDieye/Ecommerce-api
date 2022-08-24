const mongoose = require('mongoose')
// Create
exports.create = (Collection, req, res) => {
  newEntry = new Collection(req.body)
  newEntry.save()
    .then(newEntry => { res.status(201).json(newEntry) })
    .catch(error => {
      if (error.name === "ValidationError" || error.code === 11000)
        return res.status(400).json(this.getErrors(error))
      return res.status(500).json(error)
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
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValid)
    res.status(404).json("Résultat non trouvé")
  else {
    Collection.findOne({ _id: req.params.id })
      .then(result => {
        if (!result)
          res.status(404).json("Résultat non trouvé")
        else
          res.status(200).json(result)
      })
      .catch(error => { res.status(500).json(error) })
  }
};

// Update
exports.update = (Collection, req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValid)
    res.status(404).json("Résultat non trouvé")
  else {
    const changedEntry = req.body;
    Collection.findByIdAndUpdate({ _id: req.params.id }, changedEntry, { new: true })
      .then(result => {
        if (!result)
          res.status(404).json("Résultat non trouvé")
        else {
          if (req.originalUrl.includes("users")) {
            const newUser = new Collection(result)
            return newUser.save()
              .then(user => { res.status(200).json(user) })
          }
          return res.status(200).json(result)
        }
      })
      .catch(error => {
        if (error.name === "ValidationError" || error.code === 11000)
          return res.status(400).json(this.getErrors(error))
        return res.status(500).json(error)
      })
  }
};

// Delete one
exports.remove = (Collection, req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id)
  if (!isValid)
    res.status(404).json("Résultat non trouvé");
  else {
    Collection.findByIdAndDelete({ _id: req.params.id }, (error, result) => {
      if (result)
        res.status(200).json("Supprimé avec succès");
      if (!result)
        res.status(404).json("Résultat non trouvé");
      if (error)
        res.status(500).json(error);
    });
  }
};

//94 lines


