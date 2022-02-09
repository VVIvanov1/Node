const fs = require("fs");
const { readFile } = require("fs/promises");


//function that returns total likes for rendered page
// it must return an object like {likes:1, liked: true}
// this function is being called initially once page is loaded
async function returnLikes(path, art, userId) {
  try {
    const result = await readFile(path, "utf-8");
    let json = JSON.parse(result);
    if (json == null || json == undefined) {
      return { likes: 0, liked: false }
    } else {
      let thisArticle = json.pagesLikes.filter(i => i.pageId == art)[0];
      let userActivity = json.userActivity.filter((i) => i.userId == userId)[0];
      if (thisArticle == undefined) {
        // if this article is not liked by somone than return 0 and false
        return { likes: 0, liked: false }
      } else {
        // if this article is  liked by somone than return actual likes and if it is liked by current user
        let artData = { likes: thisArticle.pageLikes > 0 ? thisArticle.pageLikes : 0, liked: userActivity ? true : false }
        return artData;
      }
    }
  } catch (error) {
    console.error(error)
  }

}

async function setLike(path, art) {
  const result = await readFile(path, "utf-8");
  let json = JSON.parse(result);
  if (json.articles.filter((i) => i.pageId == art).length > 0) {
    json.articles.map((i) => {
      if (i.pageId == art) {
        i.pageLikes++;

        return { count: i.pageLikes }
      }
    });
  } else {
    json.articles.push({ pageId: art, pageLikes: 1 });
    return { count: 1 }
  }

  fs.writeFile(path, JSON.stringify(json), function writeJSON(err) {
    if (err) return console.log(err);

  });

}
async function setDislike(path, art) {
  const result = await readFile(path, "utf-8");
  let json = JSON.parse(result);
  if (json.articles.filter((i) => i.pageId == art).length > 0) {
    json.articles.map((i) => {
      if (i.pageId == art) {
        i.pageLikes--;
        return i.pageLikes
      }

    });
  }

  fs.writeFile(path, JSON.stringify(json), function writeJSON(err) {
    if (err) return console.log(err);

  });

}


module.exports.returnLikes = returnLikes;
module.exports.setLike = setLike;
module.exports.setDislike = setDislike;
