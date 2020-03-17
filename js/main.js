var getqeustionId = 0;



var Title = document.getElementById("vraagTitle");
var beschrijving = document.getElementById("vraag");

parties.forEach(party => {
    party.points = 0;
});


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

function save(answer) {
    var savePoints = getqeustionId;
    

    for (var p = 0; p < parties.length - 1; p++) {
        if (subjects[savePoints].parties[p].position == answer) {
            if (document.getElementById('important').checked == true) {
                parties[p].points += 2;
            } else {
                parties[p].points += 1;
            }
         
        }
    }
    subjects[savePoints].myOpinion = answer;


}

function result() {
    console.log(parties);
}