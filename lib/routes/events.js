const { Router } = require('express');
const Event = require('../models/Event');
const Recipe = require('../models/Recipe');

module.exports = Router()
  .post('/', (req, res) => {
    Event
      .create(req.body)
      .then(event => res.send(event));
  })

  .get('/', (req, res) => {
    Event
      .find()
      .select({ notes: false })
      .then(events => res.send(events));
  })

  .get('/:id', (req, res) => {
    Promise.all([
      Event.findById(req.params.id),
      Recipe.find({ recipeId: req.params.id })
    ])
      .then(([event, recipes]) => {
        res.send({ ...event.toJSON(), recipes });
      });
  })

  .patch('/:id', (req, res) => {
    Event
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(event => res.send(event));
  })

  .delete('/:id', (req, res) => {
    Event
      .findByIdAndDelete(req.params.id)
      .then(event => res.send(event));
  });
