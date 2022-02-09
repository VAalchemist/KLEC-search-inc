var letsGo = document.querySelector(".start");
var trainerName = document.querySelector(".trainer");
var train = [];

letsGo.addEventListener("click", function(event) {
    event.preventDefault();
   
    var trainer = trainerName.value.trim();
    if (trainer.length > 10) {
        trainerName.setAttribute("placeholder", "less than 10 characters");
        trainerName.value = "";  
    } 
       else if (trainer.length === 0) {
           trainerName.setAttribute("placeholder", "please insert name");
       }     
    else {

    if (!(localStorage.getItem("trainer") === null)){
        train = JSON.parse(localStorage.getItem("trainer"));
        train.push(trainer);
    } else {
        train.push(trainer);
    }
    
    localStorage.setItem("train", JSON.stringify(train));
    location.href="index.html";

    }

    

});