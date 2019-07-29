var send = document.querySelector('.sendBtn');
var inputHeight = document.querySelector('.inputHeight');
var inputWeight = document.querySelector('.inputWeight');

var data = JSON.parse(localStorage.getItem('BMIData')) || [];
var list = document.querySelector('.resultBar');

var changeBtn = document.querySelector('.sendData');

// 監聽
send.addEventListener('click', addData);
send.addEventListener('click', updateBTN);
updateList(data);


// Function
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
    var height = parseFloat(inputHeight.value);
    var weight = parseFloat(inputWeight.value);
    var temp = calculateBMI()

    // 若有小數點，則身高、體重取至小數點第一位
    if (height % 1 != 0){
        height = height.toFixed(1);
    }
    if (weight % 1 != 0){
        weight = weight.toFixed(1);
    }

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

// 身高、體重有可能為小數點
// 讓身高體重輸入處除了整數外，還可輸入小數點
function decimalPoint(obj){ // 值允許輸入一個小數點和數字 
    obj.value = obj.value.replace(/[^\d.]/g,"" ); //先把非數字的都替換掉，除了數字和. 
    obj.value = obj.value.replace(/^\./g,"" ); //必須保證第一個為數字而不是. 
    obj.value = obj.value.replace(/\.{2,}/g,"."); //保證只有出現一個.而沒有多個. 
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); //保證.只出現一次，而不能出現兩次以上
}

// 按下按鈕後依照BMI結果變更樣式
function updateBTN(){

    str = '';
    var BMI = calculateBMI();

        // 判斷BMI值
        if (!BMI){return};
        // 過輕 2
        if (BMI < 18.5){
            str = '<div class="sendBtn2"><div class="sendBtnBMI2">'+ BMI +'</div><div class="sendBtnText2">BMI</div><div class="sendBtnImg2 refreshBtn" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation2">過輕</div>'
        }
        // 理想 1
        else if (BMI >= 18.5 && BMI < 24){
            str = '<div class="sendBtn1"><div class="sendBtnBMI1">'+ BMI +'</div><div class="sendBtnText1">BMI</div><div class="sendBtnImg1 refreshBtn" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation1">理想</div>'
        }
        // 過重 3
        else if (BMI >= 24 && BMI < 27){
            str = '<div class="sendBtn3"><div class="sendBtnBMI3">'+ BMI +'</div><div class="sendBtnText3">BMI</div><div class="sendBtnImg3 refreshBtn" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation3">過重</div>'
        }
        // 輕度肥胖 4
        else if (BMI >= 27 && BMI < 30){
            str = '<div class="sendBtn4"><div class="sendBtnBMI4">'+ BMI +'</div><div class="sendBtnText4">BMI</div><div class="sendBtnImg4 refreshBtn" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation4">輕度肥胖</div>'
        }
        // 中度肥胖 5
        else if (BMI >= 30 && BMI < 35){
            str = '<div class="sendBtn5"><div class="sendBtnBMI5">'+ BMI +'</div><div class="sendBtnText5">BMI</div><div class="sendBtnImg5 refreshBtn" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation5">中度肥胖</div>'
        }
        // 重度肥胖 6
        else if (BMI > 35){
            str = '<div class="sendBtn6"><div class="sendBtnBMI6">'+ BMI +'</div><div class="sendBtnText6">BMI</div><div class="sendBtnImg6 refreshBtn" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation6">重度肥胖</div>'
        };

    changeBtn.innerHTML = str;
    
    // 返回計算按鈕的樣式
    var refreshBtn = document.querySelector('.refreshBtn');
    refreshBtn.addEventListener('click', refreshPage);
}

// 變更樣式的右下角有返回按鈕，返回至計算結果按鈕的樣式
function refreshPage(){
    str = '<div class="sendBtn"><span class="sendBtnText">看結果</span></div><div class="fixBtnlocation"></div>'
    changeBtn.innerHTML = str;
}