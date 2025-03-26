const ol = document.querySelector("ol");
const b = document.querySelector("button");
b.onclick = () => {
    window.print();
}

const cList = () => {
    const list = sessionStorage.getItem('currentList');
    if (!list) {
        return [];
    }
    return JSON.parse(list);
}

const setlist = () => {
    ol.innerHTML = "";
    const list = cList();
    list.forEach(l => {
        const li = document.createElement("li");
        const g = document.createElement("img");
        g.src = "/images/trash-can.svg";
        const c = document.createElement("input");
        c.type = "checkbox";
        c.disabled = true;
        const div = document.createElement("div");
        div.append(c, " ", l);
        li.append(div, g);
        ol.append(li);
        g.onclick = () => {
            const index = list.indexOf(l);
            list.splice(index, 1);
            sessionStorage.setItem('currentList', JSON.stringify(list));
            setlist();
        }

    });
}
setlist();
