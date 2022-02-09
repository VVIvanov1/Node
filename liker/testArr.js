
let obj = {
    "pagesLikes": [
        {
            "pageId": "/art-about-cats",
            "pageLikes": 3
        },
        {
            "pageId": "/art-about-cats-2",
            "pageLikes": 1
        }
    ]
}
let article = '/art-about-cats-2'
let found = obj.pagesLikes.find((current)=>{
    return current.pageId == article
})
console.log(found);