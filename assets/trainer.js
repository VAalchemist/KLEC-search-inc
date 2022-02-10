var formEl = document.querySelector(".pokename");
var trainerName = document.querySelector(".trainer");
var train = [];

formEl.addEventListener("submit", function(event) {
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
var letsStart = document.querySelector(".start");
letsStart.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector(".start").click();
    }
});
// document.querySelector(".start").addEventListener("keyup", function(event){
//     if(event.key == "Enter") {
//         event.preventDefault
//         console.log(event.key);
      
       
//     }

// });