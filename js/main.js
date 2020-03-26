var getqeustionId = -1;
var progress = 100 / subjects.length;


var Title = document.getElementById("vraagTitle");
var beschrijving = document.getElementById("vraag");

console.log(subjects[getqeustionId]);
subjects.forEach(subject => {
    subject.myOpinion = "";
    subject.important = false;
});


parties.forEach(party => {
    party.points = 0;
});
for (T = 0; T < subjects.length; T++) {
    console.log(subjects[T])
}


function next() {
    getqeustionId++;
    if (getqeustionId == 0) {
        document.getElementById("stemwijzer-container").style.display = "none";
        document.getElementById("vragen-container").style.display = "block";
    }
    if (getqeustionId < subjects.length) {
        load();
    } else {
        result();
    }

}
function skip() {
    getqeustionId++
    if (getqeustionId < subjects.length) {
        load();
    } else {
        result();
    }
}

function back() {
    getqeustionId--;

    if (getqeustionId == -1) {
        document.getElementById("vragen-container").style.display = "none";
        document.getElementById("stemwijzer-container").style.display = "block";
    } else {
        removePoints();
    }
    load();
}
function load() {
    if (getqeustionId == -1) {

    } else {
        Title.innerHTML = subjects[getqeustionId].title;
        beschrijving.innerHTML = subjects[getqeustionId].statement;
        progression();
    }

}

function progression() {
    progress = 100 / subjects.length * getqeustionId;

    document.getElementById("progress-bar").style.width = progress.toString() + "%";
}

function save(answer) {
    var question = getqeustionId;



    for (var p = 0; p < parties.length - 1; p++) {
        if (subjects[question].parties[p].position == answer) {
            if (document.getElementById('important').checked == true) {
                subjects[question].important = true
                parties[p].points += 2;
            } else {
                parties[p].points += 1;
            }

        }
    }
    subjects[question].myOpinion = answer;
}
function removePoints() {

    var opinion = subjects[getqeustionId].myOpinion;


    for (var rp = 0; rp < parties.length - 1; rp++) {
        if (subjects[getqeustionId].parties[rp].position == opinion) {
            if (subjects[getqeustionId].important == true) {
                parties[rp].points -= 2;
            } else {
                parties[rp].points--;
            }
        }
    }

}


function result() {
    progress = 100;
    document.getElementById("progress-bar").style.width = progress.toString() + "%";
    document.getElementById('vragen-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';

    parties.sort(function (a, b) {
        return b.points - a.points;
    });
    for (output = 0; output < parties.length - 1; output++) {

        var element = document.createElement('li');
        element.setAttribute("id", "result" + output, "class", "list-group-item");
        document.getElementById("outputElements").appendChild(element);

        document.getElementById('result' + output).innerHTML += parties[output].name + ' ' + Math.floor(100 / subjects.length * parties[output].points) + '%';
    }


}