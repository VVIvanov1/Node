const fs = require("fs")
const { readFile } = require('fs/promises');
const file = 'likes.json'
let artName = '/art-about-cats'



async function returnLikes(path, art) {
    const result = await readFile(path, 'utf-8')
    let json = JSON.parse(result)
    let thisArticle =  json.articles.filter(i => i.pageId === art)[0]
    return thisArticle.pageLikes
}

module.exports = returnLikes


