
document.addEventListener('DOMContentLoaded', function (e) {
    let likeBTN = document.getElementById('likeCheckbox');

    let pathName = window.location.pathname;

    e.preventDefault();
    checkCookie();
    renderCounts(pathName);
    // checkLiked(pathName);


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
function renderCounts(article) {
    let articleTotalLikes = `https://yarma.kz/likes/total?article=${article}`
    fetch(articleTotalLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {

            document.getElementById('likesCount').innerText = json.likes
            if (json.liked == true) {
                document.getElementById('likeCheckbox').checked = true
            }

        })
}
function increaseLikes(article) {
    let articleIncreaseLikes = `https://yarma.kz/likes/like?article=${article}`
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
    let articleDecreaseLikes = `https://yarma.kz/likes/dislike?article=${article}`
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
    let queryUrl = `https://yarma.kz/likes/setcookie`;
    fetch(queryUrl)
        .then((resp) => {
            return resp
        })
}







