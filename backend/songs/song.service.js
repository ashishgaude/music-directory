const config = require("config.json");
const jwt = require("jsonwebtoken");
const db = require("_helpers/db");

const { QueryTypes } = require("sequelize");

module.exports = {
  getSongs,
  verifySong,
  editSong,
  remapSongname,
};

async function getSongs({ limit, offset, userId }) {
  const songs = await db.sequelize.query(
    `SELECT * FROM view_masterlist where refer1 = "${userId}" and referremark1 = "pending" ORDER BY id ASC LIMIT ${limit} OFFSET ${offset}`,
    {
      type: QueryTypes.SELECT,
    }
  );

  return songs;
}

async function verifySong({ songId }) {
  const updateResponse = await db.sequelize.query(
    `UPDATE songmasterlist SET referremark1 = "verified" where id="${songId}"`,
    {
      type: QueryTypes.UPDATE,
    }
  );
  return { status: updateResponse[1] };
}

async function editSong(song) {
  const updateResponse = await db.sequelize.query(
    `UPDATE songmasterlist SET newsongname = "${song.newsongname}",
    searchsongname = "${song.searchsongname}",
    searchartistname = "${song.searchartistname}",
    lyric = "${song.lyric}"
    where id="${song.songId}"`,
    {
      type: QueryTypes.UPDATE,
    }
  );
  return { status: updateResponse[1] };
}

async function remapSongname({ songId, newSearchMid }) {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  const updateResponse = await db.sequelize.query(
    `INSERT INTO songmasterlist_update (songid,newsearchmid, createdAt, updatedAt) VALUES ("${songId}","${newSearchMid}","${date}","${date}")`,
    {
      type: QueryTypes.INSERT,
    }
  );
  console.log("update response::", updateResponse);
  return;
}

// write a helper function to return selected data
