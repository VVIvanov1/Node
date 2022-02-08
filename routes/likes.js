const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const returnLikes  = require('../liker/scr')
let pathToJson = './liker/likes.json'

const id = uuidv4();
let connectionString = process.env.MONGOOSE_CONNECTION;
mongoose.connect(connectionString);

const articlikes = new Schema({
    likesArticles: [String],
    userId: String,
});
const pageTotalLikes = new Schema({
    pageId: String,
    pageLikes: Number,
});

const likeMongo = mongoose.model("articleslikes", articlikes);
const likesTotal = mongoose.model("pageslikes", pageTotalLikes);

// router.get('/setcookie', checkCookie)

router.get("/total", async (req, res, next)=> {
   try {
       let likesThisPage = await returnLikes(pathToJson, req.query.article)
       res.json({count: likesThisPage})
   } catch (error) {
       console.log(error);
   }
});
async function getTotal(req, res) {
    likesTotal.findOne({ pageId: req.query.article })
        .then((doc) => {
            if (doc) {
                res.json({ count: doc.pageLikes });
            } else {
                res.json({ count: 1 });
            }
        })
}

router.get("/like", checkCookie, async function (req, res, next) {
    try {
        await setLike(req, res)
    } catch (error) {
        console.log(error);
    }
    // likesTotal.findOne({ pageId: req.query.article }, (err, doc) => {

    //     if (doc == null) {
    //         likesTotal.create({ pageId: req.query.article, pageLikes: 1 });
    //         res.json({ count: 1 });
    //     } else {
    //         doc.pageLikes++;
    //         doc.save();
    //         res.json({ count: doc.pageLikes });
    //     }
    // });
    updateUserActivity(req.cookies.kblg_usr, req.query.article, "true");
});

async function setLike(req, res) {
    likesTotal.findOne({ pageId: req.query.article })
        .then((doc) => {
            if (doc) {
                doc.pageLikes++;
                doc.save();
                res.json({ count: doc.pageLikes });
            } else {
                likesTotal.create({ pageId: req.query.article, pageLikes: 1 })
                    .then(() => {
                        res.json({ count: 1 })
                    })
            }
        })
}




router.get("/dislike", checkCookie, function (req, res, next) {
    const query = { pageId: req.query.article };
    likesTotal.findOne(query, (err, doc) => {
        if (doc == null) {
            likesTotal.create({ pageId: req.query.article, pageLikes: 1 });
            res.json({ count: 1 });
        } else {
            doc.pageLikes--;
            doc.save();
            res.json({ count: doc.pageLikes });
        }
    });
    updateUserActivity(req.cookies.kblg_usr, query.pageId, "false");
});

router.get("/check", async (req, res, next) => {
    try {
        await checkLikedMongo(req, res)
    } catch (error) {
        console.log(error);
    }

});

async function checkLikedMongo(req, res) {
    likeMongo.findOne({ userId: req.cookies.kblg_usr })
        .then((doc) => {
            if (doc == null) {
                res.json({ liked: false });
            } else {
                if (doc.likesArticles.indexOf(req.query.article) != -1) {
                    res.json({ liked: true });
                } else {
                    res.json({ liked: false });
                }
            }
        })

}

function updateUserActivity(user, articlePath, action) {
    if (action == "true") {
        likeMongo.findOne({ userId: user }, function (err, result) {
            if (result == null) {
                likeMongo.create({ userId: user, likesArticles: articlePath });
            } else {
                if (result.likesArticles.indexOf(articlePath) == -1) {
                    result.likesArticles.push(articlePath);
                    result.save();
                }
            }
        });
    } else {
        likeMongo.findOne({ userId: user }, function (err, result) {
            let indexArt = result.likesArticles.indexOf(articlePath);
            result.likesArticles.splice(indexArt, 1);
            result.save();
        });
    }
}
router.get("/setcookie", setCookie);

function setCookie(req, res, next) {
    if (req.cookies.kblg_usr) {
        res.status(200).send();

    } else {
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + 365 * 3);
        let id = uuidv4();
        res.cookie(`kblg_usr`, id, {
            expires: expiration,
            secure: true,
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).send();
    }
}

function checkCookie(req, res, next) {
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 365 * 3);
    let id = uuidv4();
    if (req.cookies.kblg_usr == null) {
        res.cookie(`kblg_usr`, id, {
            expires: expiration,
            secure: true,
            // httpOnly: true,
            sameSite: "lax",
        });
    }
    res.status(200);
    next();
}

module.exports = router;

// router.get('/setcookie', function (req, res) {
//     let expiration = new Date()
//     expiration.setDate(expiration.getDate() + 365 * 3)
//     let id = uuidv4()
//     if (req.cookies.kblg_usr == null) {
//         res.cookie(`kblg_usr`, id, {
//             expires: expiration,
//             secure: true,
//             httpOnly: true,
//             sameSite: 'lax'
//         });
//         res.status(200)
//         res.end()

//     } else {
//         res.json({ status: 'it works!' })
//     }
// })
