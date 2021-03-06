const fs = require("fs");
const { readFile } = require("fs/promises");



//function that returns total likes for rendered page
// it must return an object like {likes:1, liked: true}
// this function is being called initially once page is loaded
async function renderTotal(path, art, userId) {

  try {
    const result = await readFile(path, "utf-8");
    let json = JSON.parse(result);
    let thisArticle = json.articles.find(item => item.articleId === art)
    if (thisArticle) {
      let likes = thisArticle.users.length
      let isLike = thisArticle.users.includes(userId)
      return { likes, liked: isLike, obj: thisArticle }
    } else {
      return { likes: 0, liked: false, obj: {} }
    }
  } catch (error) {
    console.error(error)
  }
}
//function that returns total likes for rendered page
// it must return an object like {likes:1, liked: true}
// this function is being called initially once page is loaded
async function returnLikes(path, art, userId) {
  try {
    const result = await readFile(path, "utf-8");
    let json = JSON.parse(result);
    if (json == null || json == undefined) {
      return { likes: 0, liked: false };
    } else {
      let thisArticle = json.pagesLikes.filter((i) => i.pageId == art);
      // if this article is not liked by somone than return 0 and false
      if (thisArticle.length == 0) {
        return { likes: 0, liked: false };
      } else {
        // if this article is  liked by somone than return actual likes and if it is liked by current user
        let userActivity = json.userActivity.filter(i => i.userId == userId);
        if (userActivity.length != 0) {
          let isLiked = userActivity[0].pagesLiked.filter(i => i == art)
          if (isLiked.length > 0) {
            let artData = {
              likes: thisArticle[0].pageLikes,
              liked: true
            };
            return artData;
          } else {
            let artData = {
              likes: thisArticle[0].pageLikes,
              liked: false
            };
            return artData;
          }

        } else {
          let artData = {
            likes: thisArticle[0].pageLikes,
            liked: false
          };
          return artData;
        }

      }
    }
  } catch (error) {
    console.error(error);
  }
}
// a function which is called if this page user didnot liked yet
// this function must return pageId and total likes
async function saveLike(path, art, userId) {
  const result = await readFile(path, "utf-8");
  let json = JSON.parse(result);
  let thisArticle = json.articles.find(item => item.articleId === art)
  if (thisArticle != undefined) {
    json.articles.map(article => {
      if (article.articleId === art) {
        article.users.push(userId)
      }
    })
  } else {
    json.articles.push({ articleId: art, users: [userId] })
  }
  fs.writeFile(path, JSON.stringify(json), function writeJSON(err) {
    if (err) return console.log(err);

  });
}
// a function that removes like data by current user
async function saveDislike(path, art, userId) {
  const result = await readFile(path, "utf-8");
  let json = JSON.parse(result);

  json.articles.map(article => {
    if (article.articleId === art) {
      let idx = article.users.indexOf(userId)
      article.users.splice(idx, 1)

    }
  })
  fs.writeFile(path, JSON.stringify(json), function writeJSON(err) {
    if (err) return console.log(err);

  });

}


// a function which is called if this page user didnot liked yet
// this function must return pageId and total likes
async function setLike(path, art, user) {
  // read file content and get its json
  const result = await readFile(path, "utf-8");
  let json = JSON.parse(result);
  // check this page total likes & increase likes count to return
  // check the user actual likes 
  let userLikes = json.userActivity.filter((i) => i.userId == user);
  if (userLikes.length > 0) {
    json.userActivity.map(item => {
      if (item.userId == user) {
        item.pagesLiked.push(art)
      }
    })
  } else {
    json.userActivity.push({ userId: user, pagesLiked: [art] })
  }
  let found = json.pagesLikes.filter((i) => i.pageId == art);
  if (found.length == 0) {
    json.pagesLikes.push({ pageId: art, pageLikes: 1 })
  } else {
    json.pagesLikes.map(item => {
      if (item.pageId == art) {
        item.pageLikes++

      }
    }
    )
  }

  fs.writeFile(path, JSON.stringify(json), function writeJSON(err) {
    if (err) return console.log(err);

  });
}
async function setDislike(path, art, user) {
  // read file content and get its json
  const result = await readFile(path, "utf-8");
  let json = JSON.parse(result);
  json.pagesLikes.map(item => {
    if (item.pageId == art) {
      item.pageLikes--

    }
  }
  )
  // check this page total likes & decrease likes count to return
  // check the user actual likes 
  let userLikes = json.userActivity.filter((i) => i.userId == user);
  if (userLikes.length > 0) {
    json.userActivity.map(item => {
      if (item.userId == user) {

        let index = item.pagesLiked.indexOf(art)

        item.pagesLiked.splice(index, 1)


      }
    })
  }

  fs.writeFile(path, JSON.stringify(json), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

module.exports.returnLikes = returnLikes;
module.exports.setLike = setLike;
module.exports.setDislike = setDislike;
module.exports.renderTotal = renderTotal;
module.exports.saveLike = saveLike;
module.exports.saveDislike = saveDislike;
