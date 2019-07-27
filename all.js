var send = document.querySelector('.sendBtn');
var inputHeight = document.querySelector('.inputHeight');
var inputWeight = document.querySelector('.inputWeight');



send.addEventListener('click', function(){
    
    var height = inputHeight.value;
    var weight = inputWeight.value;
    var transferHeight = height*height/10000;
    var resultBMI = weight / transferHeight
    console.log(resultBMI)

})