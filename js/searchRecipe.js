
const productsIn = document.getElementById("products");
const btnadd = document.getElementById("btnadd");
btnadd.onclick = (e) => {
    e.preventDefault();
    const newProd = document.createElement('div');
    newProd.classList.add("product");
    const input = document.createElement('input');
    input.name = "product";
    input.setAttribute("placeholder", "חפש או הכנס מצרך חדש");
    const btn = document.createElement('button');
    btn.innerHTML = "-";
    btn.onclick = () => {
        newProd.remove();
    }
    newProd.append(input, btn);
    productsIn.append(newProd);
}

const filter = {
    recipes: [],
    searchByProducts: [],
    filteredRecipesOfProducts: [],
    searchBy: '',
}

$.ajax({
    url: "/recipes.json",
    success: (data) => {
        filter.recipes = data.recipes;
    }
})

const filterRecipesOfProducts = (ifWith) => {
    if (ifWith)
        return filter.recipes.filter((recipe) => contain(recipe.products));
    return filter.recipes.filter((recipe) => notContain(recipe.products));
}

const contain = (pfr) => {
    let r = true;
    filter.searchByProducts.forEach((p1) => {
        let r2 = false;
        pfr.forEach((p2) => {
            if (p2.includes(p1)) {
                r2 = true;
            }
        })
        if (!r2)
            r = false;
    });
    return r;
}

const notContain = (pfr) => {
    let r = true;
    filter.searchByProducts.forEach((p1) => {
        pfr.forEach((p2) => {
            if (p2.includes(p1)) {
                r = false;
            }
        });
    });
    return r;
}

const form = document.querySelector("form");
const h1 = document.querySelector("section>h1");
const allRecipes = document.querySelector("#allRecipes");

form.onsubmit = (e) => {
    e.preventDefault();
    setRecipes1();
}

const setRecipes1 = () => {
    const ifWith = form.withORwithout.value == 1;
    filter.searchByProducts = [];
    if (!form.product.length) {
        if (!form.product.value)
            return;
        filter.searchByProducts[0] = form.product.value;
    }
    else for (p of form.product) {
        if (p.value)
            filter.searchByProducts.push(p.value);
    }

    filter.filteredRecipesOfProducts = filterRecipesOfProducts(ifWith);
    if (filter.filteredRecipesOfProducts.length == 0) {
        h1.innerHTML = "לא נמצאו מתכונים מתאימים";
        rs.innerHTML = "";
    }
    else {
        if (ifWith) {
            h1.innerHTML = "מתכונים המכילים ";
        }
        else {
            h1.innerHTML = "מתכונים שאינם מכילים ";
        }
        for (let i = 0; i < filter.searchByProducts.length; i++) {
            if (i < filter.searchByProducts.length - 1)
                h1.innerHTML += `${filter.searchByProducts[i]}, `;
            else h1.innerHTML += `${filter.searchByProducts[i]}:`;
        }
        setRecipes2();
    }
}

const filterRecipes = () => {
    return filter.filteredRecipesOfProducts.filter((recipe) => recipe.name.includes(filter.searchBy));
}

const currentLove = () => {
    const love = sessionStorage.getItem('currentLove');
    if (!love) {
        return [];
    }
    return JSON.parse(love);
}

const setRecipes2 = () => {
    allRecipes.innerHTML = "";
    const filteredRecipes = filterRecipes();
    const love = currentLove().map((l) => l.name);
    // filteredRecipes.forEach((r) => {
    //     const div = document.createElement("div");
    //     div.id = "r";
    //     const img = document.createElement("img");
    //     img.src = `/images/${r.image}`;
    //     const a = document.createElement("a");
    //     a.innerHTML = r.name;
    //     a.href = `/html/recipe.html?recipeName=${r.name}`;
    //     const p = document.createElement('p');
    //     p.id = "p";
    //     const span1 = document.createElement('span');
    //     const span2 = document.createElement('span');
    //     const span3 = document.createElement('span');
    //     span1.innerHTML = `כ-${r.time} דקות`;
    //     span2.innerHTML = r.level;
    //     span3.innerHTML = r.kashrut;
    //     span1.classList.add('span');
    //     span2.classList.add('span');
    //     span3.classList.add('span');
    //     p.append(span1, span2, span3);
    //     div.append(img, a, p);
    //     rs.append(div);
    // })
    filteredRecipes.forEach((recipe) => {
        const { name, image, time, level, kashrut } = recipe;
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = `/images/${image}`;
        img.setAttribute("class", "food");
        const a = document.createElement('a');
        a.innerHTML = name;
        a.href = `/html/recipe.html?recipeName=${name}`;
        a.id = "title";
        const h4 = document.createElement('h4');
        h4.innerHTML = "צוות מה בסיר";
        const imgLogo = document.createElement('img');
        imgLogo.src = "/images/לוגו לבן.png";
        imgLogo.classList.add("imgLogo");
        const heart = document.createElement('a');
        heart.innerHTML = `<img src="/images/לב ריק.png" class="heart" title="בא לי ${name}" >`;
        heart.href = "";
        const p = document.createElement('p');
        p.id = "p";
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        span1.innerHTML = `כ-${time} דקות`;
        span2.innerHTML = level;
        span3.innerHTML = kashrut;
        span1.classList.add('span');
        span2.classList.add('span');
        span3.classList.add('span');
        p.append(span1, span2, span3);
        heart.onclick = (e) => {
            e.preventDefault();
            const love = currentLove();
            const recipeFromLove = love.find((l) => l.name === name);
            if (!recipeFromLove) {
                heart.children[0].src = "/images/לב מלא.png";
                love.push(recipe);
                heart.children[0].title = `אהבתי ${name}`
            } else {
                heart.children[0].src = "/images/לב ריק.png";
                const index = love.indexOf(recipe);
                love.splice(index, 1);
                heart.children[0].title = `בא לי ${name}`
            }
            sessionStorage.setItem('currentLove', JSON.stringify(love));
        }
        if (love.includes(name)) {
            heart.children[0].src = "/images/לב מלא.png";
            heart.children[0].title = `אהבתי ${name}`
        }
    
        div.append(img, imgLogo, h4, a, heart, p);
        allRecipes.appendChild(div);
    })
}

const searchInput = document.getElementById('search');
searchInput.onkeyup = () => {
    filter.searchBy = searchInput.value;
    setRecipes2();
}

form.onreset = () => {
    const products = document.querySelectorAll(".product");
    products.forEach(p => {
        p.remove();
    });
    filter.filteredRecipesOfProducts = [];
    h1.innerHTML = "";
    filter.searchBy = searchInput.value = '';
    setRecipes2();
}


form.withORwithout.forEach((w) => {
    w.onchange = () => {
        if (h1.innerHTML)
            setRecipes1();
    }
})
