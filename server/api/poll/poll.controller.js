'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
    // remove the date item from the request, we'll insert now by default.
    delete req.body.date;
    var poll = new Poll(req.body);
    poll.save(function(err, poll) {
        if (err) { return handleError(res, err); }
        return res.status(201).json(poll);
    });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.vote = function(req, res) {
    Poll.findById(req.params.id, function(err, poll) {
        if(err) { return handleError(res, err); }
        if(!poll) { return res.status(404).send('Not Found'); }
        // @TODO check if the vote_id exists in the poll

        console.log(poll.options.findById(req.params.vote_id));

        // @TODO remove the user_id from other options in the same poll if exists

        // @TODO add the user_id to the selected option's voters array

    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
