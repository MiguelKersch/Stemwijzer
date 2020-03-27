var getqeustionId = -1;
var progress = 100 / subjects.length;


var Title = document.getElementById("vraagTitle");
var beschrijving = document.getElementById("vraag");


// voegt twee variables toe aan subjects zodat het jou antwoord onthoud en zodat het kan bijhouden of de vraag extra moet metelen
subjects.forEach(subject => {
    subject.myOpinion = "";
    subject.important = false;
});

// voegt een niewe variable toe aan parties waarme de punten worden bijgehouden
parties.forEach(party => {
    party.points = 0;
});
for (T = 0; T < subjects.length; T++) {
    console.log(subjects[T])
}

// als je een antwoord heb gekozen en het is opgeslagen zorgt deze functie dat de volgenden vraag wordt laten zien
function next() {
    getqeustionId++;
    if (getqeustionId == 0) {
        document.getElementById("stemwijzer-container").style.display = "none";
        document.getElementById("vragen-container").style.display = "block";
    }
    if (getqeustionId < subjects.length) {
        resetButtonColor()
        load();
    } else {
        result();
    }

}
//deze functie skipt een vraag
function skip() {
    getqeustionId++
    if (getqeustionId < subjects.length) {
        load();
    } else {
        result();
    }
}
    //zorgt ervoor dat je een vraag terug gaat
function back() {
    getqeustionId--;
    progression();
    if (getqeustionId == -1) {
        document.getElementById("vragen-container").style.display = "none";
        document.getElementById("stemwijzer-container").style.display = "block";
    } else {
        lastanswer();
        removePoints();

    }
    load();
}
// zorgt ervoor dat de vraag word gedisplayd
function load() {
    if (getqeustionId == -1) {

    } else {
        Title.innerHTML = subjects[getqeustionId].title;
        beschrijving.innerHTML = subjects[getqeustionId].statement;
        progression();
    }

}
    //berekent de progressie met de hulp van getqeustionId en verandert de progressie balk om te laten zien hoe ver je bent
function progression() {
    progress = 100 / subjects.length * getqeustionId;

    document.getElementById("progress-bar").style.width = progress.toString() + "%";
}

//slaat het antwoord op
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
// haalt punten weg als je een vraag terug gaat door over alle parties te loopen en te kijken of de opinion gelijk is aan wat er was ingevoerd
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
// laat het resultaat zien van de vragen in procenten
function result() {
    progress = 100;
    document.getElementById("progress-bar").style.width = progress.toString() + "%";
    document.getElementById('vragen-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    //filter voor de hoogste scoren en zet zo de resultaat in volgorde
    parties.sort(function (a, b) {
        return b.points - a.points;
    });
    //loopt over de parties en maakt een div aan om het resultaat in te stoppen
    for (output = 0; output < parties.length - 1; output++) {

        var element = document.createElement('div');
        element.setAttribute("id", "result" + output);
        document.getElementById("outputElements").appendChild(element);

        document.getElementById('result' + output).innerHTML += parties[output].name + '-' + Math.floor(100 / subjects.length * parties[output].points) + '%';
    }
}

//the filter functie kijkt naar de optie die word meegegeven en veranderd met de hulp daarvan de display
function filter(option) {
    for (filterItem = 0; filterItem < parties.length - 1; filterItem++) {
        var party = document.getElementById('result' + filterItem);
        party.style.display = 'block';
        if (option == 'seculair' && parties[filterItem].secular == false) {
            party.style.display = 'none';
        } else if (option == 'grote' && parties[filterItem].size < 20) {
            party.style.display = 'none';
        } else {
            party.style.display = 'block';

        }
    }
}

//verandert de kleur van de knop met de keuzen die je laatst had gemaakt
function lastanswer() {
    resetButtonColor()
    if (subjects[getqeustionId].myOpinion == "pro") {
        document.getElementById("pro").style.color = "green";
    }
    if (subjects[getqeustionId].myOpinion == "none") {
        document.getElementById("none").style.color = "green";
    }
    if (subjects[getqeustionId].myOpinion == "contra") {
        document.getElementById("contra").style.color = "green";
    }
}
//wordt gebruikt om de kleuren van de buttons weer wit te maken als je naar de volgende vraag gaat
function resetButtonColor() {
    document.getElementById("pro").style.color = "white";
    document.getElementById("none").style.color = "white";
    document.getElementById("contra").style.color = "white";
}