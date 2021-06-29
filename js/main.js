const newTile = document.querySelector("#newTile")
const form = document.querySelector("#form")
const add = document.querySelector("#add")
const veil = document.querySelector("#veil")
const lastItem = document.querySelector("#addable")
const inputs = document.querySelectorAll("input")
let deleteXs = document.querySelectorAll(".deleteX")

// function that generate tile template 
const generateTile = (number, name, link, LSkey) => {
    // creating tile element
    let tile__container = document.createElement('div')
    tile__container.classList.add("tile__container")

    let deleteX = document.createElement('div');
    deleteX.classList.add("deleteX");
    deleteX.setAttribute("LSkey", LSkey)
    let X = document.createElement('img')
    X.setAttribute("src", "img/x.png")
    deleteX.appendChild(X)
    tile__container.appendChild(deleteX)

    let a = document.createElement('a')
    tile__container.appendChild(a)
    a.classList.add("tile");
    a.setAttribute("href", link)
    let tile__front = document.createElement('div');
    tile__front.classList.add("tile__front");
    a.appendChild(tile__front)

    let tile__back = document.createElement('div');
    tile__back.classList.add("tile__back");
    a.appendChild(tile__back)

    let front__icon = document.createElement('div');
    front__icon.classList.add("front__icon");
    tile__front.appendChild(front__icon)

    let image = document.createElement('img')
    image.setAttribute("src", `img/icon${number}.png`)
    front__icon.appendChild(image)

    let front__text = document.createElement('div');
    front__text.classList.add("front__text");
    front__text.innerHTML = name
    tile__front.appendChild(front__text)

    lastItem.insertBefore(tile__container, lastItem.lastChild.previousSibling)
}
//deleting tile - making it possible to delete for each added
const makeDeleteTilePossible = () => {
    deleteXs = document.querySelectorAll(".deleteX")
    deleteXs.forEach(x => {
        x.addEventListener("click", () => {
            x.parentElement.remove()
            const attr = x.getAttribute("lskey")
            localStorage.removeItem(attr);
        })
    })
}
//tiles from local storage
if (localStorage.length != 0){
    const LS = top.localStorage
    const n = LS.length
    let tilesArray = [] // array so it could be sorted
    for (i = 0; i < n; i++) {
        key = LS.key(i);
        if (key == "lastLSNumber"){ //ignore last local storage number
            continue
        }
        value = JSON.parse(LS.getItem(key));
        //make an object to put it in an array
        const sigleTile= {
            key: parseInt(key), value
        }
        tilesArray.push(sigleTile)
    }
    //sort by key
    tilesArray.sort(function(a, b){
        return a.key - b.key
    })
    // create tiles from local storage
    for (let i=0; i < tilesArray.length; i++){
        const {number, name, link, LSkey} = tilesArray[i].value
        //creating tile element
        generateTile(number, name, link, LSkey)
    }
    makeDeleteTilePossible()
}

const AddNewTile = () => {
    form.style.display = "none"
    veil.style.display = "none"
    // values from form
    const name = document.querySelector("#name").value
    const link = document.querySelector("#link").value
    // choosing random number for icon
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const number = random(1, 7)
    // saving to local starge
    const LSitem = {
        number, name, link
    }
    if (localStorage.length == 0){
        const lastLSNumber = 1
        LSitem.LSkey = lastLSNumber // each added tile will have unique key so it could be deleted from LS
        LSkey = lastLSNumber
        localStorage.setItem(1, JSON.stringify(LSitem));
        localStorage.setItem("lastLSNumber", lastLSNumber);

    } else {
        const newLSNumber = parseInt(localStorage.getItem('lastLSNumber')) + 1;
        LSitem.LSkey = newLSNumber // each added tile will have unique key so it could be deleted from LS
        LSkey = newLSNumber
        localStorage.setItem("lastLSNumber", newLSNumber);
        localStorage.setItem(newLSNumber, JSON.stringify(LSitem));
    }
    generateTile(number, name, link, LSkey)
    makeDeleteTilePossible()
    //clearing inputs after tile added
    inputs.forEach(input =>input.value = "")
}

//when form submitted
add.addEventListener("click", AddNewTile)

// input "enter" key
inputs.forEach(input => {
    input.addEventListener("keyup", e => {
        if (e.keyCode == 13) {
            AddNewTile()
        }
    })
})
// when clicked "add tile"
newTile.addEventListener("click", () => {
    form.style.display = "flex"
    veil.style.display = "block"
})

// when clicked outside of the form
veil.addEventListener("click", () => {
    form.style.display = "none"
    veil.style.display = "none"
})

