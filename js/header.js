const user = localStorage.getItem('currentUser');
const userText = document.getElementById('spanname');
const emailInput = document.querySelector('footer div input');
userText.innerHTML = JSON.parse(user).userName;
emailInput.value = JSON.parse(user).email;

document.getElementById("lev").onclick = () => {
    location.href = '/html/love.html';
}

const category = document.getElementById("category");
const nav = document.querySelector("header nav");
const backDiv = document.querySelector("header>div");
category.onclick = () => {
    nav.style.display = "block";
    backDiv.style.display = "block";
}
backDiv.onclick = () => {
    nav.style.display = "none";
    backDiv.style.display = "none";
}

const c = document.getElementById('c');
const l = document.getElementById('l');
const k = document.getElementById('k');
$.ajax({
    url: "/recipes.json",
    success: (data) => {
        const { recipes } = data;
        const categorys = recipes.map((r) => r.category).sort();
        for (let i = 0; i < categorys.length; i++) {
            if (categorys[i] === categorys[i + 1])
                categorys.splice(i--, 1);
        }
        categorys.forEach(ca => {
            const category = document.createElement('a');
            category.innerHTML=ca;
            category.href=`/html/categorys.html?categoryName=${ca}&sort=c`;
            c.append(category);
        });
        const levels = recipes.map((r) => r.level).sort();
        for (let i = 0; i < levels.length; i++) {
            if (levels[i] === levels[i + 1])
            levels.splice(i--, 1);
        }
        levels.forEach(le => {
            const level = document.createElement('a');
            level.innerHTML=le;
            level.href=`./categorys.html?categoryName=${le}&sort=l`;
            l.append(level);
        });
        const kashruts = recipes.map((r) => r.kashrut).sort();
        for (let i = 0; i < kashruts.length; i++) {
            if (kashruts[i] === kashruts[i + 1])
            kashruts.splice(i--, 1);
        }
        kashruts.forEach(ka => {
            const kashrut = document.createElement('a');
            kashrut.innerHTML=ka;
            kashrut.href=`/html/categorys.html?categoryName=${ka}&sort=k`;
            k.append(kashrut);
        });

    }
})
