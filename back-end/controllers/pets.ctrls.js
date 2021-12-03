const db = require('../models');

/* index */
const index = (req, res) => {
  db.Pet.find({}, (error, pets) => {
    if(error) return res.status(400).json({ error: error.message });

    return res.status(200).json(pets)
  })
}

/* create */
const create = (req, res) => {
    const newPet = {...req.body, user: req.session.currentUser._id}
  db.Pet.create(newPet, (error, createdPet) => {
    if(error) return res.status(400).json({ error: error.message });
    return res.status(201).json(createdPet);
  });
}

/* update */
const update = (req, res) => {
  console.log("you hit the update route")
  db.Pet.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    },
    (error, updatedPet) => {
      if(error) return res.status(400).json({ error: error.message });
      console.log(updatedPet)
      return res.status(200).json(updatedPet);
  })
}

/* delete */
const destroy = (req, res) => {
  db.Pet.findByIdAndDelete(req.params.id, (error, deletedPet) => {
    if(error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      message: `${deletedPet.name} deleted successfully`
    })
  })
}

module.exports = {
  index,
  create,
  update,
  destroy,
}