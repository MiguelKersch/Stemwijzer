var getqeustionId = 0



var Title = document.getElementById("vraagTitle");
var beschrijving = document.getElementById("vraag");



function next() {
    getqeustionId++;
    if (getqeustionId == 1) {
        document.getElementById("stemwijzer-container").style.display = "none";
        document.getElementById("vragen-container").style.display = "block";
    }
    if (getqeustionId < 30) {
        load();
    } else {
        result();
    }

}

function back() {
    getqeustionId--;
    load();
    if (getqeustionId == 0) {
        document.getElementById("vragen-container").style.display = "none";
        document.getElementById("stemwijzer-container").style.display = "block";
    }
}
function load() {
    Title.innerHTML = subjects[getqeustionId].title;
    beschrijving.innerHTML = subjects[getqeustionId].statement;
}

function save() {



}

function result() {

}