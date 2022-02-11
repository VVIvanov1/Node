
document.addEventListener('DOMContentLoaded', async function (e) {
    let likeBTN = document.getElementById('likeCheckbox');

    let pathName = window.location.pathname;
    // let kb = await window.cookieStore.get("kblg_user")
    let cookiesArr = document.cookie.split(';')
    let kbString = cookiesArr.map(i=> i.trim()).find(u=>u.startsWith('kblg_user'))

    e.preventDefault();
    checkCookie();
    renderTotal(pathName, kbString);
    // renderLike(pathName, kb.value);




    likeBTN.addEventListener('change', function (e) {
        let article = window.location.pathname
        e.preventDefault();
        if (e.currentTarget.checked) {

            increaseLikes(article, kbString)
        } else {
            decreaseLikes(article, kbString)
        }


    })
})
function renderTotal(article, user) {
    let articleTotalLikes = `/likes/total?article=${article}&${user}`
    fetch(articleTotalLikes)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {

            document.getElementById('likesCount').innerText = json.likes
            if (json.liked == true) {
                document.getElementById('likeCheckbox').checked = true
            } else {
                document.getElementById('likeCheckbox').checked = false
            }

        })
}
function increaseLikes(article, user) {
    let articleIncreaseLikes = `/likes/like?article=${article}&${user}`
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
function decreaseLikes(article, user) {
    let articleDecreaseLikes = `/likes/dislike?article=${article}&${user}`
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
async function checkCookie() {

    let queryUrl

    
    let cookiesArr = document.cookie.split(';')
    let kbString = cookiesArr.map(i=> i.trim()).find(u=>u.startsWith('kblg_user'))

    if (!kbString) {
        queryUrl = `/likes/setcookie`
    } else {
       
        queryUrl = `/likes/setcookie?${kbString}`
        
    }


    fetch(queryUrl)
        .then((resp) => {
            return resp.json()
        })
        .then(async (data) => {
            if (data.newUser == true) {
                setCookie("kblg_user", data.kblg_user, 1200)
            }

            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            }

        })
}



function renderLike(article, user) {
    let articleIsLiked = `/likes/isliked?article=${article}&kblg_user=${user}`
    fetch(articleIsLiked)
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
            if (json.liked === true) {
                document.getElementById('likeCheckbox').checked = true
            } else {
                document.getElementById('likeCheckbox').checked = false
            }
        })
}



