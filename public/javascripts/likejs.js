
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
    let articleTotalLikes = `/likes/total?article=${article}`
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
    let articleIncreaseLikes = `/likes/like?article=${article}`
    fetch(articleIncreaseLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
            document.getElementById('likesCount').innerText = json.count
        })
}
function decreaseLikes(article) {
    let articleDecreaseLikes = `/likes/dislike?article=${article}`
    fetch(articleDecreaseLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
            document.getElementById('likesCount').innerText = json.count
        })
}
// function checkLiked(article) {
//     let likeBTN = document.getElementById('likeCheckbox')
//     let currentArticleLike = `/likes/check?article=${article}`
//     fetch(currentArticleLike)
//         .then((resp) => {
//             return resp.json()
//         }).then((json) => {
//             if (json.liked == true) {
//                 likeBTN.checked = true
//             }
//         })
// }
function checkCookie() {
    let queryUrl = `/likes/setcookie`;
    fetch(queryUrl)
        .then((resp) => {
            return resp
        })
}







