﻿const express = require("express");
const { func } = require("joi");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const songService = require("./song.service");

// routes
router.get("/", authorize(), authenticateSchema, getSongs);
router.put("/:songId/verify", authorize(), verifySong);
router.put("/:songId/edit", authorize(), editSong);
router.post("/remap", authorize(), remapSongname);

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    limit: Joi.number().required(),
    offset: Joi.number().required(),
  });
  validateRequest(req, next, schema, "query");
}

function getSongs(req, res, next) {
  const { limit, offset } = req.query;
  const userId = req.user.id;
  songService
    .getSongs({ limit, offset, userId })
    .then((d) => {
      res.json(d);
    })
    .catch(next);
}

function verifySong(req, res, next) {
  const { songId } = req.params;
  songService
    .verifySong({ songId })
    .then((d) => {
      res.json(d);
    })
    .catch(next);
}

function editSong(req, res, next) {
  const { songId } = req.params;
  const { newsongname, searchsongname, searchartistname, lyric } = req.body;
  songService
    .editSong({
      songId,
      newsongname,
      searchsongname,
      searchartistname,
      lyric,
    })
    .then((d) => {
      res.json(d);
    })
    .catch(next);
}

function remapSongname(req, res, next) {
  const { songId, newSearchMid } = req.body;
  songService
    .remapSongname({ songId, newSearchMid })
    .then((d) => {
      res.json(d);
    })
    .catch(next);
}
