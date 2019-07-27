var send = document.querySelector('.sendBtn');
var inputHeight = document.querySelector('.inputHeight');
var inputWeight = document.querySelector('.inputWeight');

var data = JSON.parse(localStorage.getItem('BMIData')) || [];
var list = document.querySelector('.resultBar');


// 監聽
send.addEventListener('click', addData);
updateList(data);

//Function
function calculateBMI(){
    // 擷取身高體重
    var height = inputHeight.value;
    var weight = inputWeight.value;
    // 先將身高做處理
    var transferHeight = height*height/10000;
    // 計算BMI
    var resultBMI = weight / transferHeight;
    return resultBMI
}


// 這邊錯誤
function addData(e){
    //防止氣泡事件
    e.preventDefault();
    var rankMBI = evaluateRank()
    var todo = {
        content : rankMBI

    };
    // 更新data(更新localStorage內的key->陣列)
    data.push(todo);
    console.log(data);
    console.log("Iamhere")
    // 更新完成後需要重新update顯示的memo區域
    updateList(data);
    // 將資料轉回string，並存回localStorage
    localStorage.setItem('BMIData', JSON.stringify(data));
}

// 更新Memo
function updateList(itmes){
    str = '';
    var dataLen = itmes.length;

    //將資料依序存入localStorage的key中(以陣列)
    for (var i = 0; i < dataLen; i++){
        str += itmes[i].content;
    };
    // 使用innerHTML插入新標籤 補充：innerHTML會將元素全刪除再更新
    list.innerHTML = str;
}

function evaluateRank(){
    // 擷取身高體重
    var height = inputHeight.value;
    var weight = inputWeight.value;
    var temp = calculateBMI()
    // 過輕 2
    if (temp < 18.5){
        content = '<li><div class="resultColor2"></div><div class="resultShow"><div class="resultTemp2">過輕</div><div class="resultTemp2">Height '+ height +'cm</div><div class="resultTemp2">Weight '+ weight +'kg</div><div class="resultTemp2">BMI '+ temp +'</div></div></li>';
        return content;
    }
    // 理想 1
    else if (temp >= 18.5 && temp < 24){
        content = '<li><div class="resultColor1"></div><div class="resultShow"><div class="resultTemp1">理想</div><div class="resultTemp1">Height '+ height +'cm</div><div class="resultTemp1">Weight '+ weight +'kg</div><div class="resultTemp1">BMI '+ temp +'</div></div></li>';
        return content;
    }
    // 過重 3
    else if (temp >= 24 && temp < 27){
        content = '<li><div class="resultColor3"></div><div class="resultShow"><div class="resultTemp3">過重</div><div class="resultTemp3">Height '+ height +'cm</div><div class="resultTemp3">Weight '+ weight +'kg</div><div class="resultTemp3">BMI '+ temp +'</div></div></li>';
        return content;
    }
    // 輕度肥胖 4
    else if (temp >= 27 && temp < 30){
        content = '<li><div class="resultColor4"></div><div class="resultShow"><div class="resultTemp4">輕度肥胖</div><div class="resultTemp4">Height '+ height +'cm</div><div class="resultTemp4">Weight '+ weight +'kg</div><div class="resultTemp4">BMI '+ temp +'</div></div></li>';
        return content;
    }
    // 中度肥胖 5
    else if (temp >= 30 && temp < 35){
        content = '<li><div class="resultColor5"></div><div class="resultShow"><div class="resultTemp5">中度肥胖</div><div class="resultTemp5">Height '+ height +'cm</div><div class="resultTemp5">Weight '+ weight +'kg</div><div class="resultTemp5">BMI '+ temp +'</div></div></li>';
        return content;
    }
    // 重度肥胖 6
    else if (temp > 35){
        content = '<li><div class="resultColor6"></div><div class="resultShow"><div class="resultTemp6">重度肥胖</div><div class="resultTemp6">Height '+ height +'cm</div><div class="resultTemp6">Weight '+ weight +'kg</div><div class="resultTemp6">BMI '+ temp +'</div></div></li>';
        return content;
    };
}