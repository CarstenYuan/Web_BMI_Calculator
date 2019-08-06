// DOM元素
var send = document.querySelector('.send'); // 按下按鈕
var inputHeight = document.querySelector('.inputHeight'); //輸入身高處
var inputWeight = document.querySelector('.inputWeight'); //輸入體重處

var data = JSON.parse(localStorage.getItem('BMIData')) || []; // 獲取localStorage的資料
var list = document.querySelector('.resultBar'); // 用於更新list中的資料

var changeBtn = document.querySelector('.send'); // 用於更換按鈕樣式

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

    console.log(height);
    console.log(weight);

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
            content = '<li style="border-color: #31BAF9;"><div>過輕</div><div><p>BMI </p><h2>'+ temp +'</h2></div><div><p>Height</p><h2>'+ height +'cm</h2></div><div><p>Weight</p><h2>'+ weight +'kg</h2></div><div style="font-size: 0.75rem">'+ currentDateTime +'</div><a class="delBtn">Delete</a></li>'
        }
        // 理想 1
        else if (temp >= 18.5 && temp < 24){
            content = '<li style="border-color: #86D73F;"><div>理想</div><div><p>BMI</p><h2>'+ temp +'</h2></div><div><p>Height</p><h2>'+ height +'cm</h2></div><div><p>Weight</p><h2>'+ weight +'kg</h2></div><div style="font-size: 0.75rem">'+ currentDateTime +'</div><a class="delBtn">Delete</a></li>'
        }
        // 過重 3
        else if (temp >= 24 && temp < 27){
            content = '<li style="border-color: #FF982D;"><div>過重</div><div><p>BMI</p><h2>'+ temp +'</h2></div><div><p>Height</p><h2>'+ height +'cm</h2></div><div><p>Weight</p><h2>'+ weight +'kg</h2></div><div style="font-size: 0.75rem">'+ currentDateTime +'</div><a class="delBtn">Delete</a></li>'
        }
        // 輕度肥胖 4
        else if (temp >= 27 && temp < 30){
            content = '<li style="border-color: #FF6C03;"><div>輕度肥胖</div><div><p>BMI</p><h2>'+ temp +'</h2></div><div><p>Height</p><h2>'+ height +'cm</h2></div><div><p>Weight</p><h2>'+ weight +'kg</h2></div><div style="font-size: 0.75rem">'+ currentDateTime +'</div><a class="delBtn">Delete</a></li>'
        }
        // 中度肥胖 5
        else if (temp >= 30 && temp < 35){
            content = '<li style="border-color: #FF6C03;"><div>中度肥胖</div><div><p>BMI</p><h2>'+ temp +'</h2></div><div><p>Height</p><h2>'+ height +'cm</h2></div><div><p>Weight</p><h2>'+ weight +'kg</h2></div><div style="font-size: 0.75rem">'+ currentDateTime +'</div><a class="delBtn">Delete</a></li>'
        }
        // 重度肥胖 6
        else if (temp > 35){
            content = '<li style="border-color: #FF1200;"><div>重度肥胖</div><div><p>BMI</p><h2>'+ temp +'</h2></div><div><p>Height</p><h2>'+ height +'kg</h2></div><div><p>Height</p><h2>'+ weight +'cm</h2></div><div style="font-size: 0.75rem">'+ currentDateTime +'</div><a class="delBtn">Delete</a></li>'
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
            str = '<div class="result1"><h1>過輕</h1><h1 class="resultBMI">'+ BMI +'</h1><div class="loop" ><img src="./img/icons_loop.png"></div></div>'
        }
        // 理想 1
        else if (BMI >= 18.5 && BMI < 24){
            str = '<div class="result2"><h1>理想</h1><h1 class="resultBMI">'+ BMI +'</h1><div class="loop" ><img src="./img/icons_loop.png"></div></div>'
        }
        // 過重 3
        else if (BMI >= 24 && BMI < 27){
            str = '<div class="result3"><h1>過重</h1><h1 class="resultBMI">'+ BMI +'</h1><div class="loop" ><img src="./img/icons_loop.png"></div></div>'
        }
        // 輕度肥胖 4
        else if (BMI >= 27 && BMI < 30){
            str = '<div class="result4"><h1>輕度肥胖</h1><h1 class="resultBMI">'+ BMI +'</h1><div class="loop" ><img src="./img/icons_loop.png"></div></div>'
        }
        // 中度肥胖 5
        else if (BMI >= 30 && BMI < 35){
            str = '<div class="result5"><h1>中度肥胖</h1><h1 class="resultBMI">'+ BMI +'</h1><div class="loop" ><img src="./img/icons_loop.png"></div></div>'
        }
        // 重度肥胖 6
        else if (BMI > 35){
            str = '<div class="result6"><h1>重度肥胖</h1><h1 class="resultBMI">'+ BMI +'</h1><div class="loop" ><img src="./img/icons_loop.png"></div></div>'
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
