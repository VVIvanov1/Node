
document.addEventListener('DOMContentLoaded', function (e) {
    let likeBTN = document.getElementById('likeCheckbox');

    let pathName = window.location.pathname;

    e.preventDefault();
    checkCookie();
    renderTotal(pathName);
    renderLike(pathName);

    


    likeBTN.addEventListener('change', function (e) {
        let article = window.location.pathname
        e.preventDefault();
        if (e.currentTarget.checked) {

            increaseLikes(article)
        } else {
            decreaseLikes(article)
        }


    })
})
function renderTotal(article) {
    let articleTotalLikes = `/likes/total?article=${article}`
    fetch(articleTotalLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
          
            document.getElementById('likesCount').innerText = json.likes
            // if (json.liked == true) {
            //     document.getElementById('likeCheckbox').checked = true
            // }else{
            //     document.getElementById('likeCheckbox').checked = false
            // }

        })
}
function renderLike(article){
    let articleIsLiked = `/likes/isliked?article=${article}`
    fetch(articleIsLiked)
    .then((resp)=>{
        return resp.json()
    })
    .then((json)=>{
        if(json.liked === true){
            document.getElementById('likeCheckbox').checked = true
        }else{
            document.getElementById('likeCheckbox').checked = false
        }
    })
}
function increaseLikes(article) {
    let articleIncreaseLikes = `/likes/like?article=${article}`
    fetch(articleIncreaseLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
            let counter = document.getElementById('likesCount')
            let total = Number(counter.innerText)
            total++
            counter.innerText = total
            document.getElementById('likeCheckbox').checked = true
        })
}
function decreaseLikes(article) {
    let articleDecreaseLikes = `/likes/dislike?article=${article}`
    fetch(articleDecreaseLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
            let counter = document.getElementById('likesCount')
            let total = Number(counter.innerText)
            total--
            counter.innerText = total
            document.getElementById('likeCheckbox').checked = false
        })
}

function checkCookie() {
    let queryUrl = `/likes/setcookie`;
    fetch(queryUrl)
        .then((resp) => {
            return resp
        })
}







