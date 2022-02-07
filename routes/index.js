const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.send('it works as well!')
})


module.exports = router