const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const renderTotal = require("../liker/scr").renderTotal;
const saveLike = require("../liker/scr").saveLike;
const saveDislike = require("../liker/scr").saveDislike;
let pathToJson = "./liker/likes.json";
const { readFile } = require("fs/promises");





router.get("/total", async (req, res, next) => {
  try {
    let likesThisPage = await renderTotal(pathToJson, req.query.article, req.query.kblg_user)
    res.json(likesThisPage)

  } catch (error) {
    console.error(error)
  }
 
});

router.get("/like", async function (req, res, next) {
  try {
    let liked = await saveLike(pathToJson, req.query.article, req.query.kblg_user)
    res.json({ completion: true })
  } catch (error) {
    console.error(error)
  }
  

});

router.get("/dislike", async function (req, res, next) {
  try {
    let disliked = await saveDislike(pathToJson, req.query.article, req.query.kblg_user)
    res.json({ completion: true })
  } catch (error) {
    console.error(error)
  }
  

});


router.get("/setcookie", setCookie);

function setCookie(req, res, next) {
  if (req.query.kblg_user) {
    res.status(200).send({ newUser: false })
  } else {
    let id = uuidv4()
    let expires = new Date()
    expires.getFullYear(2025)
    res.send({newUser: true,  kblg_user: id, expires })
  }
}



module.exports = router;


