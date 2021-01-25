function addZero(time) {
  let str = time
  if (time < 10) {
    str = "0" + time
  }
  return str
}

function changeTimeBySecond(second) {
  var hourTime = 0
  var minuteTime = 0
  var secondTime = 0
  if (second > 60) {
    //如果秒数大于60
    minuteTime = Math.floor(second / 60)
    secondTime = Math.floor(second % 60)
    if (minuteTime >= 60) {
      //如果分钟大于60
      hourTime = Math.floor(minuteTime / 60)
      minuteTime = Math.floor(minuteTime % 60)
    } else {
      hourTime = 0
    }
  } else {
    hourTime = 0
    minuteTime = 0
    if (second == 60) {
      //如果秒数等于60
      minuteTime = 1
      secondTime = 0
    } else {
      secondTime = second
    }
  }
  var timeResult =
    addZero(hourTime) + ":" + addZero(minuteTime) + ":" + addZero(secondTime)
  return timeResult
}

function timetrans(date) {
    var date = new Date(date * 1000); //如果date为10位不需要乘1000
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
    var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}

module.exports = {
  changeTimeBySecond,
  timetrans
}
