var send = document.querySelector('.sendBtn');
var inputHeight = document.querySelector('.inputHeight');
var inputWeight = document.querySelector('.inputWeight');

var data = JSON.parse(localStorage.getItem('BMIData')) || [];
var list = document.querySelector('.resultBar');


// 監聽
send.addEventListener('click', addData);
updateList(data);

//Function
// 計算BMI
function calculateBMI(){
    // 擷取身高體重
    var height = inputHeight.value;
    var weight = inputWeight.value;
    // 如果height、weight為空，即直接return
    //避免 Nah、undefined 狀況發生
    if (!height || !weight){return};
    // 先將身高做處理
    var transferHeight = height*height/10000;
    // 計算BMI
    var resultBMI = weight / transferHeight;
    // 取至小數點第二位
    resultBMI = resultBMI.toFixed(2);
    return resultBMI
}


// 新增資料至localStorage
function addData(e){
    //防止氣泡事件
    e.preventDefault();
    var rankMBI = evaluateRank()
    if (!rankMBI){return};
    var todo = {
        content : rankMBI

    };
    // 更新data(更新localStorage內的key->陣列)
    data.push(todo);
    // 更新完成後需要重新update顯示的memo區域
    updateList(data);
    // 將資料轉回string，並存回localStorage
    localStorage.setItem('BMIData', JSON.stringify(data));
}

// 更新列表
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

// 獲取當下時間
function getTime(){
    var today=new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var hour = today.getHours();
    var min = today.getMinutes();
    
    // 處理字串
    if (month < 10){
        month = '0' + month
    };
    if (date < 10){
        date = '0' + date
    };
    if (hour < 10){
        hour = '0' + hour
    };
    if (min < 10){
        min = '0' + min
    };

    // return 日期
    var currentDateTime = year + '-' + month + '-' + date + ' ' + hour + ':' + min;
    return currentDateTime;
}

// 評級後新增li
function evaluateRank(){
    // 擷取身高體重
    var height = inputHeight.value;
    var weight = inputWeight.value;
    var temp = calculateBMI()
    // 取得時間
    var currentDateTime = getTime()
    
    // 判斷BMI值
    if (!temp){return};
    // 過輕 2
    if (temp < 18.5){
        content = '<li><div class="resultColor2"></div><div class="resultShow"><div class="resultTitle2">過輕</div><div class="resultHeight2"><div class="resultUnit2">Height</div><div class="resultFigure2">' + height +'cm</div></div><div class="resultWeight2"><div class="resultUnit2">Weight</div><div class="resultFigure2">' + weight + 'kg</div></div><div class="resultBMI2"><div class="resultUnit2">BMI</div><div class="resultFigure2">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div></div></div></li>';
        return content;
    }
    // 理想 1
    else if (temp >= 18.5 && temp < 24){
        content = '<li><div class="resultColor1"></div><div class="resultShow"><div class="resultTitle1">理想</div><div class="resultHeight1"><div class="resultUnit1">Height</div><div class="resultFigure1">' + height +'cm</div></div><div class="resultWeight1"><div class="resultUnit1">Weight</div><div class="resultFigure1">' + weight + 'kg</div></div><div class="resultBMI1"><div class="resultUnit1">BMI</div><div class="resultFigure1">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div></div></div></li>';
        return content;
    }
    // 過重 3
    else if (temp >= 24 && temp < 27){
        content = '<li><div class="resultColor3"></div><div class="resultShow"><div class="resultTitle3">過重</div><div class="resultHeight3"><div class="resultUnit3">Height</div><div class="resultFigure3">' + height +'cm</div></div><div class="resultWeight3"><div class="resultUnit3">Weight</div><div class="resultFigure3">' + weight + 'kg</div></div><div class="resultBMI3"><div class="resultUnit3">BMI</div><div class="resultFigure3">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div></div></div></li>';
        return content;
    }
    // 輕度肥胖 4
    else if (temp >= 27 && temp < 30){
        content = '<li><div class="resultColor4"></div><div class="resultShow"><div class="resultTitle4">輕度肥胖</div><div class="resultHeight4"><div class="resultUnit4">Height</div><div class="resultFigure4">' + height +'cm</div></div><div class="resultWeight4"><div class="resultUnit4">Weight</div><div class="resultFigure4">' + weight + 'kg</div></div><div class="resultBMI4"><div class="resultUnit4">BMI</div><div class="resultFigure4">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div></div></div></li>';
        return content;
    }
    // 中度肥胖 5
    else if (temp >= 30 && temp < 35){
        content = '<li><div class="resultColor5"></div><div class="resultShow"><div class="resultTitle5">中度肥胖</div><div class="resultHeight5"><div class="resultUnit5">Height</div><div class="resultFigure5">' + height +'cm</div></div><div class="resultWeight5"><div class="resultUnit5">Weight</div><div class="resultFigure5">' + weight + 'kg</div></div><div class="resultBMI5"><div class="resultUnit5">BMI</div><div class="resultFigure5">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div></div></div></li>';
        return content;
    }
    // 重度肥胖 6
    else if (temp > 35){
        content = '<li><div class="resultColor6"></div><div class="resultShow"><div class="resultTitle6">重度肥胖</div><div class="resultHeight6"><div class="resultUnit6">Height</div><div class="resultFigure6">' + height +'cm</div></div><div class="resultWeight6"><div class="resultUnit6">Weight</div><div class="resultFigure6">' + weight + 'kg</div></div><div class="resultBMI6"><div class="resultUnit6">BMI</div><div class="resultFigure6">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div></div></div></li>';
        return content;
    };
}