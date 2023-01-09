var table;
var messageTable;
var gender;
var playerName;
var nameCondition;
var outcome;
var yearInput;
var yearCondition;
var tournamentCondition;
var message;

function mainFunc() {
    message = false;
    gender = getGender();
    messageTable = getMessageTable();
    table = getTable();
    playerName = getNameInput();
    nameCondition = getNameConditionInput();
    outcome = getOutcomeConditionInput();
    yearInput = getYearInput();
    yearCondition = getYearConditionInput();
    tournamentCondition = getTournamentConditionInput();
    getDataType();
    appendTable();
}

function appendTable(){
    if(message){
        $("#table").append(messageTable);
    }
    else{
        $("#table").append(table);
    }
}

function getGender(){
    gender = getTournamentTypeInput();
}

function getMessageTable(){
     var newMessageTable = document.createElement("table");
     var tr = document.createElement("tr");
     var td = document.createElement("td");
     var text =" NO DATA TO DISPLAY !!!"
     td.innerHTML = text.bold();
     tr.appendChild(td);
     newMessageTable.appendChild(tr);
     return newMessageTable;
}

function getTable() {
    var newTable = document.createElement("table");
    newTable.setAttribute("class","table_2");
    var year = document.createElement("th");
    year.innerHTML = "Year";
    newTable.appendChild(year);
    var tournament = document.createElement("th");
    tournament.innerHTML = "Tournament";
    newTable.appendChild(tournament);
    var winner = document.createElement("th");
    winner.innerHTML = "Winner";
    newTable.appendChild(winner);
    var runnerUp = document.createElement("th");
    runnerUp.innerHTML =  "Runner - up";
    newTable.appendChild(runnerUp);
    return newTable;
}

function addRow(year, tournament, winner, runnerUp){
    var tr = document.createElement("tr");
    var y = document.createElement("td");
    y.innerHTML = year;
    tr.appendChild(y);
    var t = document.createElement("td");
    t.innerHTML = tournament;
    tr.appendChild(t);
    var w = document.createElement("td");
    w.innerHTML = winner;
    tr.appendChild(w);
    var r = document.createElement("td");
    r.innerHTML = runnerUp;
    tr.appendChild(r);
    table.appendChild(tr);
}

function getData() {
    getGender();
    $.getJSON(gender + "-grand-slam-winners.json", function(value) {
        if(nameVerification()){
            $.each(value.result, function(id, obj){
                if(yearVerification() && tournamentVerification() && outcomeVerification()){
                    if((sortPlayerName(obj.winner) === obj.winner) && (sortYear(obj.year) == obj.year) && (sortTournament(obj.tournament) === obj.tournament) && isWinner()){
                                addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                    else if((sortPlayerName(obj["runner-up"]) === obj["runner-up"]) && (sortYear(obj.year) == obj.year) && (sortTournament(obj.tournament) === obj.tournament) && isRunnerUp()){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                }
                else if(yearVerification() && tournamentVerification()){
                        if((sortPlayerName(obj.winner) === obj.winner || sortPlayerName(obj["runner-up"])) && (sortYear(obj.year) == obj.year) && sortTournament(obj.tournament) === obj.tournament){
                                addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                        }
                }
                else if(tournamentVerification() && outcomeVerification()){
                    if((sortPlayerName(obj.winner) === obj.winner) && (sortTournament(obj.tournament) === obj.tournament) && isWinner()){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                    else if((sortPlayerName(obj["runner-up"]) === obj["runner-up"]) && (sortTournament(obj.tournament) === obj.tournament) && isRunnerUp()){
                         addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                }
                else if(yearVerification()){
                        if((sortPlayerName(obj.winner) === obj.winner || sortPlayerName(obj["runner-up"])) && sortYear(obj.year) === obj.year){
                            addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                        }
                }
                else if(outcomeVerification()){
                    if((sortPlayerName(obj.winner) === obj.winner) && isWinner()){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                    else if((sortPlayerName(obj["runner-up"]) === obj["runner-up"]) && isRunnerUp()){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                }
                else {
                    if(sortPlayerName(obj.winner) === obj.winner || sortPlayerName(obj["runner-up"])){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                }
            });
        }
        else if(yearVerification()){
            $.each(value.result, function(id, obj){
                if(tournamentVerification()){
                    if(sortTournament(obj.tournament) === obj.tournament && sortYear(obj.year) == obj.year){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                }
                else{
                    if(sortYear(obj.year) == obj.year){
                        addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                    }
                }
            });
        }
        else{
            if(tournamentVerification()){
                $.each(value.result, function(id, obj){
                    if(sortTournament(obj.tournament) === obj.tournament)
                    addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                });
            }
            else{
               $.each(value.result, function(id, obj){
                    addRow(obj.year, obj.tournament, obj.winner, obj["runner-up"]);
                });
            }
        }
    });
}

function getDataType() {
    if (getTournamentTypeInput() === "none") {
        document.getElementById("gender").style.backgroundColor = "#ff0000";
        alert("Please choose a tournament.");
        message = true;
        return;
    }
    else if(nameVerificationMessage()){
            return;
    }
    else if(yearVerificationMessage()){
            return;
    }
    else{
         return getData();
    }
}

function nameVerificationMessage(){
    if(playerName === "" && nameCondition !== "none"){
        document.getElementById("name").style.backgroundColor = "#ff0000";
        document.getElementById("nameCondition").style.backgroundColor = "#ff0000";
        message = true;
        alert("Please enter a valid name or set condition to none!!!");
        return true;
    }
    else{
        return false;
    }
}

function yearVerificationMessage(){
    var compare = 2020
    if(yearInput !== ""){
        for(var i = 0; i < yearInput.length; i++){
            var char = yearInput.charAt(i);
            var parsedValue = parseInt(char);
            if(!Number.isInteger(parsedValue)){
                document.getElementById("year").style.backgroundColor = "#ff0000";
                message = true;
                alert("Year " + yearInput + " is not valid.Please enter a valid year !!!");
                return true;
            }
        }
        if(yearInput > compare){
            document.getElementById("year").style.backgroundColor = "#ff0000";
            message = true;
            alert("Year " + yearInput + " is not valid. Please enter a valid year !!!");
            return true;    
        }
    }
    else{
        return false;
    }
}

function nameVerification(){
    if(playerName === "" && nameCondition !== "none"){
        return false;
    }
    else if(playerName !== "" && nameCondition === "none"){
        return false;
    }
    else if(playerName === "" && nameCondition === "none"){
        return false;
    }
    else{
        return true;
    }
}

function yearVerification(){
    if(yearInput !== ""){
        return true;
    }
    else{
        return false;
    }
}

function outcomeVerification(){
    if(outcome === "either"){
        return false;
    }
    else{
        return true;
    }
}

function tournamentVerification(){
    return true;
}

function sortPlayerName(name){
    if(nameCondition === "none"){
        return name;
    }
    else if(nameCondition === "equal"){
        if(playerName === name){
            return name;
        }
    }
    else if(nameCondition === "contains"){
        if(name.indexOf(playerName) !== -1){
            return name;
        }
    }
}

function sortYear(year){
    if(yearCondition === "equals"){
        if(year == yearInput){
            return year;
        }
    }
    else if(yearCondition === "greater"){
        if(year > yearInput){
            return year;
        }
    }
    else if(yearCondition === "less"){
        if(year < yearInput){
            return year;
        }
    }
}

function isWinner(){
    if(outcome === "winner"){
        return true;
    }
    else{
        return false;
    }
}

function isRunnerUp(){
    if(outcome === "runnerUp"){
        return true;
    }
    else{
        return false;
    }
}

function sortTournament(tournament){
    if(tournamentCondition === tournament){
        return tournament;
    }
    else if(tournamentCondition === "any"){
        return tournament;
    }
}

function disableButton(btn) {
    document.getElementById("myButton").disabled = true;
    mainFunc();
}

function refreshButton(btn){
     window.location.reload();
}