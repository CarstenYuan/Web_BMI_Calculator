// DOM元素
var send = document.querySelector('.sendData'); // 按下按鈕
var inputHeight = document.querySelector('.inputHeight'); //輸入身高處
var inputWeight = document.querySelector('.inputWeight'); //輸入體重處

var data = JSON.parse(localStorage.getItem('BMIData')) || []; // 獲取localStorage的資料
var list = document.querySelector('.resultBar'); // 用於更新list中的資料

var changeBtn = document.querySelector('.sendData'); // 用於更換按鈕樣式

// 監聽
send.addEventListener('click', addData); // list新增資料
send.addEventListener('click', updateBTN); // button換樣式
list.addEventListener('click', DeleteData); // list刪除資料
updateList(data);


// 新增資料至localStorage
function addData(e){
    //防止氣泡事件
    e.preventDefault();

    // 計算BMI
    var height = inputHeight.value;
    var weight = inputWeight.value;
    var BMI = calculateBMI();
    var time = getTime();

    // 若有小數點，則身高、體重取至小數點第一位
    if (height % 1 != 0){
        height = parseFloat(height).toFixed(1);
    }
    if (weight % 1 != 0){
        weight = parseFloat(weight).toFixed(1);
    }

    var BMIArr = {
        height: height,
        weight: weight,
        BMIvalue: BMI,
        currenttime: time
    };
    // 更新data(更新localStorage內的key->陣列)
    data.push(BMIArr);
    // 更新完成後需要重新update顯示的memo區域
    updateList(data);
    // 將資料轉回string，並存回localStorage
    localStorage.setItem('BMIData', JSON.stringify(data));
}

// 更新列表
function updateList(itmes){
    str = '';
    content = '';
    var dataLen = itmes.length;

    //將資料依序存入localStorage的key中(以陣列)
    for (var i = 0; i < dataLen; i++){
        var temp = data[i].BMIvalue;
        var height = data[i].height;
        var weight = data[i].weight;
        var currentDateTime = data[i].currenttime;

        // 過輕 2
        if (temp < 18.5){
            content = '<li><div class="resultColor2"></div><div class="resultShow"><div class="resultTitle2">過輕</div><div class="resultHeight2"><div class="resultUnit2">Height</div><div class="resultFigure2">' + height +'cm</div></div><div class="resultWeight2"><div class="resultUnit2">Weight</div><div class="resultFigure2">' + weight + 'kg</div></div><div class="resultBMI2"><div class="resultUnit2">BMI</div><div class="resultFigure2">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div><div class="deleteBtn"><a data-num="'+ i +'">X</a></div></div></li>';
        }
        // 理想 1
        else if (temp >= 18.5 && temp < 24){
            content = '<li><div class="resultColor1"></div><div class="resultShow"><div class="resultTitle1">理想</div><div class="resultHeight1"><div class="resultUnit1">Height</div><div class="resultFigure1">' + height +'cm</div></div><div class="resultWeight1"><div class="resultUnit1">Weight</div><div class="resultFigure1">' + weight + 'kg</div></div><div class="resultBMI1"><div class="resultUnit1">BMI</div><div class="resultFigure1">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div><div class="deleteBtn"><a data-num="'+ i +'">X</a></div></div></li>';
        }
        // 過重 3
        else if (temp >= 24 && temp < 27){
            content = '<li><div class="resultColor3"></div><div class="resultShow"><div class="resultTitle3">過重</div><div class="resultHeight3"><div class="resultUnit3">Height</div><div class="resultFigure3">' + height +'cm</div></div><div class="resultWeight3"><div class="resultUnit3">Weight</div><div class="resultFigure3">' + weight + 'kg</div></div><div class="resultBMI3"><div class="resultUnit3">BMI</div><div class="resultFigure3">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div><div class="deleteBtn"><a data-num="'+ i +'">X</a></div></div></li>';
        }
        // 輕度肥胖 4
        else if (temp >= 27 && temp < 30){
            content = '<li><div class="resultColor4"></div><div class="resultShow"><div class="resultTitle4">輕度肥胖</div><div class="resultHeight4"><div class="resultUnit4">Height</div><div class="resultFigure4">' + height +'cm</div></div><div class="resultWeight4"><div class="resultUnit4">Weight</div><div class="resultFigure4">' + weight + 'kg</div></div><div class="resultBMI4"><div class="resultUnit4">BMI</div><div class="resultFigure4">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div><div class="deleteBtn"><a data-num="'+ i +'">X</a></div></div></li>';
        }
        // 中度肥胖 5
        else if (temp >= 30 && temp < 35){
            content = '<li><div class="resultColor5"></div><div class="resultShow"><div class="resultTitle5">中度肥胖</div><div class="resultHeight5"><div class="resultUnit5">Height</div><div class="resultFigure5">' + height +'cm</div></div><div class="resultWeight5"><div class="resultUnit5">Weight</div><div class="resultFigure5">' + weight + 'kg</div></div><div class="resultBMI5"><div class="resultUnit5">BMI</div><div class="resultFigure5">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div><div class="deleteBtn"><a data-num="'+ i +'">X</a></div></div></li>';
        }
        // 重度肥胖 6
        else if (temp > 35){
            content = '<li><div class="resultColor6"></div><div class="resultShow"><div class="resultTitle6">重度肥胖</div><div class="resultHeight6"><div class="resultUnit6">Height</div><div class="resultFigure6">' + height +'cm</div></div><div class="resultWeight6"><div class="resultUnit6">Weight</div><div class="resultFigure6">' + weight + 'kg</div></div><div class="resultBMI6"><div class="resultUnit6">BMI</div><div class="resultFigure6">' + temp + '</div></div><div class="currentTime">' + currentDateTime + '</div><div class="deleteBtn"><a data-num="'+ i +'">X</a></div></div></li>';
        };

        str += content;
    };
    // 使用innerHTML插入新標籤 補充：innerHTML會將元素全刪除再更新
    list.innerHTML = str;
}

// 刪除列表資料
function DeleteData(e){
    e.preventDefault();
    if (e.target.nodeName !== 'A'){return}; //點選A連結才有用
    var index = e.target.dataset.num;
    data.splice(index, 1);
    localStorage.setItem('BMIData', JSON.stringify(data));
    updateList(data);
}


// 按鈕依照BMI值變更樣式
function updateBTN(){

    str = '';
    var BMI = calculateBMI();

        // 判斷BMI值
        if (!BMI){return};
        // 過輕 2
        if (BMI < 18.5){
            str = '<div class="sendBtn2"><div class="sendBtnBMI2">'+ BMI +'</div><div class="sendBtnText2">BMI</div><div class="sendBtnImg2" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation2">過輕</div>'
        }
        // 理想 1
        else if (BMI >= 18.5 && BMI < 24){
            str = '<div class="sendBtn1"><div class="sendBtnBMI1">'+ BMI +'</div><div class="sendBtnText1">BMI</div><div class="sendBtnImg1" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation1">理想</div>'
        }
        // 過重 3
        else if (BMI >= 24 && BMI < 27){
            str = '<div class="sendBtn3"><div class="sendBtnBMI3">'+ BMI +'</div><div class="sendBtnText3">BMI</div><div class="sendBtnImg3" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation3">過重</div>'
        }
        // 輕度肥胖 4
        else if (BMI >= 27 && BMI < 30){
            str = '<div class="sendBtn4"><div class="sendBtnBMI4">'+ BMI +'</div><div class="sendBtnText4">BMI</div><div class="sendBtnImg4" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation4">輕度肥胖</div>'
        }
        // 中度肥胖 5
        else if (BMI >= 30 && BMI < 35){
            str = '<div class="sendBtn5"><div class="sendBtnBMI5">'+ BMI +'</div><div class="sendBtnText5">BMI</div><div class="sendBtnImg5" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation5">中度肥胖</div>'
        }
        // 重度肥胖 6
        else if (BMI > 35){
            str = '<div class="sendBtn6"><div class="sendBtnBMI6">'+ BMI +'</div><div class="sendBtnText6">BMI</div><div class="sendBtnImg6" ><img src="icons_loop.png"></div></div><div class="fixBtnlocation6">重度肥胖</div>'
        };

    changeBtn.innerHTML = str;
}

// 計算BMI
function calculateBMI(){
    // 擷取身高體重
    var height = inputHeight.value;
    var weight = inputWeight.value;

    // 如果height、weight為空，即直接return，避免 Nah、undefined 狀況發生
    if (!height || !weight){return};

    // 計算BMI，並取至小數點第二位
    var resultBMI = (weight / (height * height / 10000)).toFixed(2);
    return resultBMI
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

// 僅能輸入數字、小數點
function decimalPoint(obj){ // 值允許輸入一個小數點和數字 

    obj.value = obj.value.replace(/[^\d.]/g,""); //先把非數字的都替換掉，除了數字和. 
    obj.value = obj.value.replace(/^\./g,"" ); //必須保證第一個為數字而不是. 
    obj.value = obj.value.replace(/\.{2,}/g,"."); //保證只有出現一個.而沒有多個. 
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); //保證.只出現一次，而不能出現兩次以上

    obj.value = obj.value.substr(0,12)}; // 只能輸入12位數(加上.)
