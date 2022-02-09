const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const { Schema } = mongoose;


let connectionString = process.env.MONGOOSE_CONNECTION;
mongoose.connect(connectionString)


function renderLike(req, res, next) {
  res.render('index', { title: 'Liker tool' })
}
router.get('/', (req,res,next)=>{
  res.send('it works')
})



// router.get('/art-about-cats',  renderLike)

// router.get('/art-about-cats-2',  renderLike)




module.exports = router;


