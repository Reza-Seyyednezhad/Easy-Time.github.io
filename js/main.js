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
    $('.timer-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#thankSection').on('click', function (e) {
    $('.thanks-section').toggle('fast');
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.timer-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    e.preventDefault()
});
// user
$('.user').on('click', function (e) {
    $('.intro-section').show('fast');
    $('.todo-section').hide('fast');
    $('.timer-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#toDoSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').toggle('fast');
    $('.timer-section').hide('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#timerSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.timer-section').toggle('fast');
    $('.chart-section').hide('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#chartSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.timer-section').hide('fast');
    $('.chart-section').toggle('fast');
    $('.log-section').hide('fast');
    $('.thanks-section').hide('fast');
    e.preventDefault()
});
$('#logsSec').on('click', function (e) {
    $('.intro-section').hide('fast');
    $('.todo-section').hide('fast');
    $('.timer-section').hide('fast');
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
$('#todo-create').on('click', function(){
    $('.todo-section-create').show('slow')
    $('.todo-section-log').hide()
    $('.todo-section-chart').hide()
})
$('#todo-log').on('click', function(){
    $('.todo-section-create').hide()
    $('.todo-section-log').show('slow')
    $('.todo-section-chart').hide()
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
        let specialID = `${moment().second()}${moment().millisecond()}`;
        // alert(specialID)
        let addTask =
            `<div class="todoItem row" id=${specialID}>
            <div class="todoItemLeft col-12">
                <h2 class="todoItemID">ID: ${specialID}</h2>
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
// $('.deleteTask').on('click', function(){
//     try {
//         inputValue = $('#TaskRemove').val()
//         if(inputValue != ''){
//             swal({
//                 title: "Do you want to DELETE Task?",
//                 text: "Once deleted, you will not be able to recover this imaginary file!",
//                 icon: "warning",
//                 buttons: true,
//                 dangerMode: true,
//             })
//             .then((deleteSure) => {
//                 if(deleteSure){
//                     $(`.todoSectionHistory #${inputValue} + hr`).remove();
//                     $(`.todoSectionHistory #${inputValue}`).remove();
//                     $('#TaskRemove').val('')
//                 }else{
//                     swal({
//                         title: "DELETE Cancelled !",
//                         icon: "info"
//                     })
//                     $('#TaskRemove').val('')
//                 }
                
//             })
//         }else{
//             swal({
//                 // title: "INPUT ERROR!\n Enter Task Name and Task Time.",
//                 title: 'INPUT ERROR',
//                 icon: "error",
//                 text: `Please Enter Task ID.`
//             });
//             $('#TaskRemove').val('')
//         }        
//     } catch (error) {
//         swal({
//             // title: "INPUT ERROR!\n Enter Task Name and Task Time.",
//             title: 'INPUT ERROR',
//             icon: "error",
//             text: `Please Enter Task ID.`
//         });
//         $('#TaskRemove').val('')
//     }
    
// })
// alert(document.querySelector('.todoSectionHistory').textContent);
$('#todo-save-to-cookie').on('click', function (e) {
    if (document.querySelector('.todoSectionHistory').textContent != ' ' && document.querySelector('.todoSectionHistory').textContent != '' && document.querySelector('.todoSectionHistory').innerHTML != null) {
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
            title: "Save Task, Before!",
            icon: "error",
        });
    }

    e.preventDefault()
})
// timer Section (source code: https://dev.to/gspteck/create-a-timer-in-javascript-2mak#:~:text=var%20stoptime%20%3D%20true%3B%20we%20create,timer%20is%20running%20or%20not.&text=if%20(stoptime%20%3D%3D%20false)%20%7B%20verify,that%20the%20timer%20is%20on.&text=sec%20%3D%20sec%20%2B%201%3B%20add,and%20seconds%20becomes%200%20again.)
$('#timer-create').on('click', function(){
    $('.timer-section-create-content').show('slow')
    $('.timer-section-log-content').hide()
    $('.timer-section-chart-content').hide()
})
$('#timer-log').on('click', function(){
    $('.timer-section-log-content').show('slow')
    $('.timer-section-create-content').hide()
    $('.timer-section-chart-content').hide()
})
$('#timer-chart').on('click', function(){
    $('.timer-section-chart-content').show('slow')
    $('.timer-section-log-content').hide()
    $('.timer-section-create-content').hide()
})

tippy('#start', {
    content: 'START',
    placement: 'top',
});
tippy('#stop', {
    content: 'STOP',
    placement: 'top',
});
tippy('#reset', {
    content: 'RESET',
    placement: 'top',
});
tippy('#save', {
    content: 'SAVE',
    placement: 'top',
});
tippy('#saveLog', {
    content: 'SAVE IN BROWSER',
    placement: 'top',
});

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
    let timeritem;
    let timerValue = document.querySelector('.timer').innerHTML;
    let specialID = `${moment().second()}${moment().millisecond()}`;
    let inputValue = document.getElementById('timer-section-input').value;
    if (timerValue == '00:00:00') {
        swal({
            title: "Before, Set timer Name & Take Time For timer !!!",
            icon: "error",
        });
    } else {
        // alert(document.getElementById('timer-section-input').value.length)
        timeritem = {
            "timer-name": inputValue,
            "timer-time": timerValue
        }
        
        if(document.getElementById('timer-section-input').value.length == 0){
            timeritem["timer-name"] = `Test-${moment().second()}${moment().millisecond()}`;
        }
        timerData.push(timeritem)
        let txt = `
            <div class="timer-logs-list-item" id=${specialID}>
                <div class="timer-logs-list-item-id"># ${specialID}</div>
                <div class="timer-logs-list-item-name">${timeritem['timer-name']}</div>
                <div class="timer-logs-list-item-time">${timeritem['timer-time']}</div>
            </div>
            <hr> `;
        document.querySelector('.timer-logs-list').innerHTML += txt;
    }
    $('#timer-section-input').val('');
    resetTimer()
}
function saveLogTimer() {
    let data = getCookie("timerData");
    let timerdata = JSON.stringify(timerData);
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
                if (willUpdate && timerdata != "" && timerdata != null && timerdata != []) {
                    setCookie("timerData", timerdata, 365);
                    swal("Update it! Your timer times list is up to date...", {
                        icon: "success",
                    });
                } else {
                    swal("Update is FAILED.");
                }
            });
    } else {
        if (timerdata != "" && timerdata != null && timerdata != [] && timerdata != '[]')  {
            setCookie("timerData", timerdata, 365);
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
    document.querySelector('.todo-section-log-content-box-main').innerHTML = '';
    let cookieValueTasks = getCookie('taskData');
    if (cookieValueTasks != [] && cookieValueTasks != '' && cookieValueTasks != null) {
        // alert(cookieValueTasks)
        let taskdatas = JSON.parse(cookieValueTasks);
        for (let i in taskdatas) {
            // console.log(datas[i])
            let taskdata = taskdatas[i];
            let txt =
                `<div class="todo-section-log-content-box-main-item">
                <div class="todo-section-log-content-box-main-item-top">
                    <div class="todo-section-log-content-box-main-item-top-left">
                        <div class="todo-section-log-content-box-main-item-top-left-special-id">#${taskdata['special-id']}-</div>
                        <div class="todo-section-log-content-box-main-item-top-left-taskname">${taskdata['task-name']}</div>
                    </div>
                    <div class="todo-section-log-content-box-main-item-top-center">
                        <div class="todo-section-log-content-box-main-item-top-center-date-time">${taskdata['task-date']} - ${taskdata['task-time']}</div>
                    </div>
                    <div class="todo-section-log-content-box-main-item-top-right">
                        <div class="todo-section-log-content-box-main-item-top-right-status">${taskdata['task-status']}</div>
                    </div>
                </div>
                <span class="todo-divider"></span>
                <div class="todo-section-log-content-box-main-item-bottom">
                    <div class="todo-section-log-content-box-main-item-bottom-describe">${taskdata['task-describe']}</div>
                </div>
            </div>
            <hr>`;
            document.querySelector('.todo-section-log-content-box-main').innerHTML += txt;
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
    let cookieValuetimer = getCookie('timerData');
    document.querySelector('.log-section-main-timer-main').innerHTML = '';
    if (cookieValuetimer != [] && cookieValuetimer != '' && cookieValuetimer != null) {
        let timerdatas = JSON.parse(cookieValuetimer);
        for (let j in timerdatas) {
            console.log(timerdatas[j])
            let stpwatchdata = timerdatas[j];
            let stptxt =
                `<div class="timer-section-main-timer-main-item">
                        <div class="timer-section-main-timer-main-item-name"># ${stpwatchdata['timer-name']}</div>
                        <div class="timer-section-main-timer-main-item-time">${stpwatchdata['timer-time']}</div>
                    </div>
                    <hr> `;
            document.querySelector('.log-section-main-timer-main').innerHTML += stptxt;
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

// $('#timer-delete').on('click', function(){
//     try {
//         inputValue = $('#timer-section-delete-input').val()
//         if(inputValue != ''){
//             swal({
//                 title: "Do you want to DELETE TIMER?",
//                 text: "Once deleted, you will not be able to recover this imaginary file!",
//                 icon: "warning",
//                 buttons: true,
//                 dangerMode: true,
//             })
//             .then((deleteSure) => {
//                 if(deleteSure){
//                     $(`.timer-logs-list #${inputValue} + hr`).remove();
//                     $(`.timer-logs-list #${inputValue}`).remove();
//                     $('#timer-section-delete-input').val('')
//                 }else{
//                     swal({
//                         title: "DELETE Cancelled !",
//                         icon: "info"
//                     })
//                     $('#timer-section-delete-input').val('')
//                 }
                
//             })
//         }else{
//             swal({
//                 // title: "INPUT ERROR!\n Enter Task Name and Task Time.",
//                 title: 'INPUT ERROR',
//                 icon: "error",
//                 text: `Please Enter TIMER ID.`
//             });
//             $('#timer-section-delete-input').val('')
//         }        
//     } catch (error) {
//         swal({
//             // title: "INPUT ERROR!\n Enter Task Name and Task Time.",
//             title: 'INPUT ERROR',
//             icon: "error",
//             text: `Please Enter TIMER ID.`
//         });
//         $('#timer-section-delete-input').val('')
//     }
    
// })
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
//      name: cookie -> taskname in timer
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

$('#timerChart').on('click', function(){
    $('#myChart').remove(); // this is my <canvas> element
    $('#timer-section-main-chart').append('<canvas id="myChart"><canvas>');
    let timerNames = [];
    let timerTimers = [];
    let timerTimersConfig = [];
    let bgColors = [];
    let cookieValuetimer = getCookie('timerData');
    if (cookieValuetimer != [] && cookieValuetimer != '' && cookieValuetimer != null) {
        let timerdatas = JSON.parse(cookieValuetimer);
        for (let j in timerdatas) {
            // console.log(timerdatas[j])
            timerNames.push(timerdatas[j]["timer-name"])
            timerTimers.push(timerdatas[j]["timer-time"])

        }
        for (let x of timerTimers) {
            let t = x.split(':')
            let h2s = parseInt(t[0]) * 3600;
            let m2s = parseInt(t[1]) * 60;
            let s2s = parseInt(t[2]);
            let sumTime = h2s + m2s + s2s;
            timerTimersConfig.push(sumTime)
        }
        let dataLength = timerNames.length;
        var letters = '0123456789ABCDEF';

        for (let c = 0; c < dataLength; c++) {
            for (var i = 0; i < 6; i++) {
                let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                bgColors.push(color)
            }
        }
        // alert(dataLength)
        const data = {
            labels: timerNames,
            color: '#F1D00A',
            datasets: [{
                label: 'My First Dataset',
                data: timerTimersConfig,
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
})
// function DataConfig() {
//     let timerNames = [];
//     let timerTimers = [];
//     let timerTimersConfig = [];
//     let bgColors = [];
//     let cookieValuetimer = getCookie('timerData');
//     if (cookieValuetimer != [] && cookieValuetimer != '' && cookieValuetimer != null) {
//         let timerdatas = JSON.parse(cookieValuetimer);
//         for (let j in timerdatas) {
//             // console.log(timerdatas[j])
//             timerNames.push(timerdatas[j]["timer-name"])
//             timerTimers.push(timerdatas[j]["timer-time"])

//         }
//         for (let x of timerTimers) {
//             let t = x.split(':')
//             let h2s = parseInt(t[0]) * 3600;
//             let m2s = parseInt(t[1]) * 60;
//             let s2s = parseInt(t[2]);
//             let sumTime = h2s + m2s + s2s;
//             timerTimersConfig.push(sumTime)
//         }
//         let dataLength = timerNames.length;
//         var letters = '0123456789ABCDEF';

//         for (let c = 0; c < dataLength; c++) {
//             for (var i = 0; i < 6; i++) {
//                 let color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
//                 bgColors.push(color)
//             }
//         }
//         // alert(dataLength)
//         const data = {
//             labels: timerNames,
//             color: '#F1D00A',
//             datasets: [{
//                 label: 'My First Dataset',
//                 data: timerTimersConfig,
//                 backgroundColor: bgColors,
//                 hoverOffset: 4,

//             }]
//         };
//         const plugin = {
//             id: 'custom_canvas_background_color',
//             beforeDraw: (chart) => {
//               const ctx = chart.canvas.getContext('2d');
//               ctx.save();
//               ctx.globalCompositeOperation = 'destination-over';
//               ctx.fillStyle = 'lightGreen';
//               ctx.fillRect(0, 0, chart.width, chart.height);
//               ctx.restore();
//             }
//           };
//         const config = {
//             type: 'doughnut',
//             data: data,
//             plugins: [plugin],
//         };
//         const myChart = new Chart(
//             document.getElementById('myChart'),
//             config
//         );
        
//         swal({
//             title: "SUCCESSFUL.",
//             icon: "success",
//         });
//     } else {
//         swal({
//             title: "YOUR TIMER HISTORY IS EMPTY !!!",
//             icon: "info",
//         });
//     }

//     console.log(timerNames)
//     // console.log(timerTimers)
//     console.log(timerTimersConfig)
// }
// in timer:
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