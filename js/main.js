let todoData = [];
let now = ``;
let timerData = [];

// save data in cookie 
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let data = getCookie("taskData");
    if (data != "") {
        alert("your  " + data);
    } else {
        data = prompt("Please enter your name:", "");
        if (data != "" && data != null) {
            setCookie("taskData", data, 365);
        }
    }
}
// Main Section
tippy('#toolsBtn-tooltips', {
    content: 'TOOLS',
    placement: 'right',
});
$('#Home').on('click', function (e) {
    $('.intro-section').show('fast');
    $('.todo-section').hide('fast');
    $('.stopwatch-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#thankSection').on('click', function (e) {
    $('.thanks-section').toggle('fast');
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.stopwatch-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    e.preventDefault()
});
// user
$('.user').on('click', function (e) {
    $('.intro-section').show('fast');
    $('.todo-section').hide('fast');
    $('.stopwatch-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#toDoSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').toggle('fast');
    $('.stopwatch-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#stopwatchSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.stopwatch-section').toggle('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#chartSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.stopwatch-section').hide('fast');
    $('.chart-section').toggle('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#logsSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.stopwatch-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').toggle('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});

// thanks-section
// intro-section
// To Do Section
// setInterval(function(){
//     let taskState = $('.check-class').val()
//     console.log(taskState)
// }, 5000)
$('#newTaskCollapse').on('click', function(){
    $('.todo-section-main-left-body').toggle('fast')
})

$('#todo-submit').on('click', function (e) {
    let taskName = $('#toDoSubject').val();
    let taskTime = $('#toDoTime').val();
    let taskDate = $('#toDoDate').val();
    let taskStatus = $('#taskStatus').val()
    let taskDescribe = $('#toDoSecTextArea').val();
    if (taskName === '') {
        // alert('Enter Task Name and Task Time.');
        swal({
            title: "INPUT ERROR!\n Enter Task Name and Task Time.",
            icon: "error",
        });
    } else {
        // let txt = `task name: ${taskName}\ntask time: ${taskTime}\ntaskdescribe: ${taskDescribe}`;
        // alert(txt)
        let specialID = `${moment().minute()}-${moment().second()}-${moment().millisecond()}`;
        // alert(specialID)
        let addTask =
            `<div class="todoItem row">
            <div class="todoItemLeft col-12">
                <h2>${taskName} (${taskStatus})</h2>
                <h5 class="TaskTimeSec" id="time-test-${specialID}">${taskDate} - ${taskTime}</h5>
            </div>
            <span class="todo-divider"></span>
            <div class="todoItemRight col-12">
                <p class="col-12">${taskDescribe}</p>
            </div>
        </div><hr>`;
        let dataTask = {
            "special-id": specialID,
            "task-name": taskName,
            "task-status": taskStatus,
            "task-date": taskDate,
            "task-time": taskTime,
            "task-describe": taskDescribe,
        }
        todoData.push(dataTask);
        document.querySelector('.todoSectionHistory').innerHTML += addTask;
        $('#toDoSubject').val('');
        $('#toDoTime').val('');
        $('#toDoSecTextArea').val('');
    }
    e.preventDefault()
});
// alert(document.querySelector('.todoSectionHistory').textContent);
$('#todo-save-to-cookie').on('click', function (e) {
    if (document.querySelector('.todoSectionHistory').textContent != ' ' && document.querySelector('.todoSectionHistory').innerHTML != null) {
        let data = getCookie("taskData");
        let taskdata = JSON.stringify(todoData);
        // alert(taskdata)
        if (data != "" && data != [] && data != null) {
            swal({
                title: "Do you want to UPDATE data?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willUpdate) => {
                    if (willUpdate && taskdata != "" && taskdata != null && taskdata != []) {
                        setCookie("taskData", taskdata, 365);
                        swal("Update it! Your tasks is up to date...", {
                            icon: "success",
                        });
                    } else {
                        swal("Update is FAILED.");
                    }
                });
        } else {
            if (taskdata != "" && taskdata != null && taskdata != []) {
                setCookie("taskData", taskdata, 365);
                swal({
                    title: "SUCCESSFUL.",
                    icon: "success",
                });
            } else {
                swal({
                    title: "DATA AVAILABLE ERROR! DATA IS NOT AVAILABLE.",
                    icon: "error",
                });
            }
        }
    } else {
        swal({
            title: "Save in History, Before!",
            icon: "error",
        });
    }

    e.preventDefault()
})
// Stopwatch Section (source code: https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak#:~:text=var%20stoptime%20%3D%20true%3B%20we%20create,stopwatch%20is%20running%20or%20not.&text=if%20(stoptime%20%3D%3D%20false)%20%7B%20verify,that%20the%20stopwatch%20is%20on.&text=sec%20%3D%20sec%20%2B%201%3B%20add,and%20seconds%20becomes%200%20again.)
const timer = document.querySelector('.timer');
var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;
function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }

        timer.innerHTML = hr + ':' + min + ':' + sec;

        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
    hr = 0;
    min = 0;
    sec = 0
}
// let specialID = `${moment().minute()}-${moment().second()}-${moment().millisecond()}`;
function saveTimer() {
    stopTimer();
    let stopwatchitem;
    let stopwatchValue = document.querySelector('.timer').innerHTML;
    let inputValue = document.getElementById('stopwatch-section-input').value;
    if (stopwatchValue == '00:00:00') {
        swal({
            title: "Before, Set Stopwatch Name & Take Time For Stopwatch !!!",
            icon: "error",
        });
    } else {
        // alert(document.getElementById('stopwatch-section-input').value.length)
        stopwatchitem = {
            "stopwatch-name": inputValue,
            "stopwatch-time": stopwatchValue
        }
        
        if(document.getElementById('stopwatch-section-input').value.length == 0){
            stopwatchitem["stopwatch-name"] = `Test-${moment().second()}${moment().millisecond()}`;
        }
        timerData.push(stopwatchitem)
        let txt = `
            <div class="logs-list-item">
                <h3 class="logs-list-item-time"># ${stopwatchitem['stopwatch-name']}</h3>
                <h3 class="logs-list-item-timer">${stopwatchitem['stopwatch-time']}</h3>
            </div>
            <hr> `;
        document.querySelector('.logs-list').innerHTML += txt;
    }
    $('#stopwatch-section-input').val('');
    resetTimer()
}
function saveLogTimer() {
    let data = getCookie("stopwatchData");
    let stopwatchdata = JSON.stringify(timerData);
    // alert(taskdata)
    if (data != "" && data != [] && data != null && data != '[]') {
        swal({
            title: "Do you want to UPDATE data?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willUpdate) => {
                if (willUpdate && stopwatchdata != "" && stopwatchdata != null && stopwatchdata != []) {
                    setCookie("stopwatchData", stopwatchdata, 365);
                    swal("Update it! Your Stopwatch times list is up to date...", {
                        icon: "success",
                    });
                } else {
                    swal("Update is FAILED.");
                }
            });
    } else {
        if (stopwatchdata != "" && stopwatchdata != null && stopwatchdata != [] && stopwatchdata != '[]')  {
            setCookie("stopwatchData", stopwatchdata, 365);
            swal({
                title: "SUCCESSFUL.",
                icon: "success",
            });
        } else {
            swal({
                title: "DATA AVAILABLE ERROR! DATA IS NOT AVAILABLE.",
                icon: "error",
            });
        }
    }
}
// Chart section (chart.js)

// Logs(History)

function GetTaskData() {
    document.querySelector('.log-section-main-task-main').innerHTML = '';
    let cookieValueTasks = getCookie('taskData');
    if (cookieValueTasks != [] && cookieValueTasks != '' && cookieValueTasks != null) {
        // alert(cookieValueTasks)
        let taskdatas = JSON.parse(cookieValueTasks);
        for (let i in taskdatas) {
            // console.log(datas[i])
            let taskdata = taskdatas[i];
            let txt =
                `<div class="log-section-main-task-main-item">
                <div class="log-section-main-task-main-item-top">
                    <div class="log-section-main-task-main-item-top-left">
                        <h3 class="log-section-main-task-main-item-top-left-special-id">#${taskdata['special-id']}-</h3>
                        <h2 class="log-section-main-task-main-item-top-left-taskname">${taskdata['task-name']}</h2>
                    </div>
                    <div class="log-section-main-task-main-item-top-center">
                        <h3 class="log-section-main-task-main-item-top-center-date-time">${taskdata['task-date']} - ${taskdata['task-time']}</h3>
                    </div>
                    <div class="log-section-main-task-main-item-top-right">
                        <h3 class="log-section-main-task-main-item-top-right-status">${taskdata['task-status']}</h3>
                    </div>
                </div>
                <span class="todo-divider"></span>
                <div class="log-section-main-task-main-item-bottom">
                    <h4 class="log-section-main-task-main-item-bottom-describe">${taskdata['task-describe']}</h4>
                </div>
            </div>
            <hr>`;
            document.querySelector('.log-section-main-task-main').innerHTML += txt;
        }
        swal({
            title: "SUCCESSFUL.",
            icon: "success",
        });
    } else {
        swal({
            title: "YOUR TASK HISTORY IS EMPTY !!!",
            icon: "info",
        });
    }
}
function GetTimerData() {
    let cookieValueStopwatch = getCookie('stopwatchData');
    document.querySelector('.log-section-main-stopwatch-main').innerHTML = '';
    if (cookieValueStopwatch != [] && cookieValueStopwatch != '' && cookieValueStopwatch != null) {
        let stopwatchdatas = JSON.parse(cookieValueStopwatch);
        for (let j in stopwatchdatas) {
            console.log(stopwatchdatas[j])
            let stpwatchdata = stopwatchdatas[j];
            let stptxt =
                `<div class="log-section-main-stopwatch-main-item">
                        <h3 class="log-section-main-stopwatch-main-item-time"># ${stpwatchdata['stopwatch-name']}</h3>
                        <h3 class="log-section-main-stopwatch-main-item-timer">${stpwatchdata['stopwatch-time']}</h3>
                    </div>
                    <hr> `;
            document.querySelector('.log-section-main-stopwatch-main').innerHTML += stptxt;
        }
        swal({
            title: "SUCCESSFUL.",
            icon: "success",
        });
    } else {
        swal({
            title: "YOUR TIMER HISTORY IS EMPTY !!!",
            icon: "info",
        });
    }
}
setInterval(function () {
    document.querySelector('.timeDisplay').innerHTML = moment().format('LTS');
}, 1000)
document.querySelector('.dateDisplay').innerHTML = moment().format('ll');
// setInterval(function(){
//     console.log(todoData)
// }, 10000)


// setInterval(function(){
//     getVal = $('#taskStatus').val()
//     alert(getVal)
// }, 5000)
// window.addEventListener('click', function(e){
//     e.preventDefault()de
//     console.log(e.target)
// })
//


// !!!!!!!!!!!!!!!!!!!!!!!  Will be Done !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// chart(pie):
//      name: cookie -> taskname in stopwatch
//      value: time save
// conver HH:MM:SS to :
//          t = 'HH:MM:SS'.split(':')
//          hs = parseInt(t[0]) * 3600
//          ms = parseInt(t[1]) * 60
//          sum = parseInt(t[2]) + ms + hs
//          totalSecond = sum
//          totalMinute = sum / 60
//          totalHour = sum / 3600
//          ! totals___ are use in result section
function DataConfig() {
    let stopwatchNames = [];
    let stopwatchTimers = [];
    let stopwatchTimersConfig = [];
    let bgColors = [];
    let cookieValueStopwatch = getCookie('stopwatchData');
    if (cookieValueStopwatch != [] && cookieValueStopwatch != '' && cookieValueStopwatch != null) {
        let stopwatchdatas = JSON.parse(cookieValueStopwatch);
        for (let j in stopwatchdatas) {
            // console.log(stopwatchdatas[j])
            stopwatchNames.push(stopwatchdatas[j]["stopwatch-name"])
            stopwatchTimers.push(stopwatchdatas[j]["stopwatch-time"])

        }
        for (let x of stopwatchTimers) {
            let t = x.split(':')
            let h2s = parseInt(t[0]) * 3600;
            let m2s = parseInt(t[1]) * 60;
            let s2s = parseInt(t[2]);
            let sumTime = h2s + m2s + s2s;
            stopwatchTimersConfig.push(sumTime)
        }
        let dataLength = stopwatchNames.length;
        var letters = '0123456789ABCDEF';

        for (let c = 0; c < dataLength; c++) {
            for (var i = 0; i < 6; i++) {
                let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                bgColors.push(color)
            }
        }
        // alert(dataLength)
        const data = {
            labels: stopwatchNames,
            color: '#F1D00A',
            datasets: [{
                label: 'My First Dataset',
                data: stopwatchTimersConfig,
                backgroundColor: bgColors,
                hoverOffset: 4,

            }]
        };
        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = 'lightGreen';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            }
          };
        const config = {
            type: 'doughnut',
            data: data,
            plugins: [plugin],
        };
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
        swal({
            title: "SUCCESSFUL.",
            icon: "success",
        });
    } else {
        swal({
            title: "YOUR TIMER HISTORY IS EMPTY !!!",
            icon: "info",
        });
    }

    console.log(stopwatchNames)
    // console.log(stopwatchTimers)
    console.log(stopwatchTimersConfig)
}
// in stopwatch:
//      add taskname input
//      in end: taskname : timeSave
//                  btn -> click -> save input value and stop timer (stopTimer()) and save time.innerHtml
//      create div and in div: write taskname: timeSave
//                  in the end: add result section to sidebar and in result section write:
//                              your total second is:
//                              your total minute is:
//                              your total hour is:
//                              --------------------
//                              task1: 45%
//                              task2: 10%
//                              task3: 25%
//                              task4: 20%
//                              !!! tasks can based on seconds or minutes or hours !!!