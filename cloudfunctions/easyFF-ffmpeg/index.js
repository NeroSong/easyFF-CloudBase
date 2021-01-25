"use strict"

const shell = require("shelljs")
const tcb = require("@cloudbase/node-sdk")
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
})
const db = app.database()
const co = db.collection("easyFF-record")
const strRandom = require("string-random")
const fs = require("fs")
const utils = require("./utils")

// - 指定位置截图 / 截取片段
// - 短视频转换为 GIF 动图
// - 添加水印文字 / logo 图片
// - 视频消音 / 添加bgm / 提取背景音乐
// - 音乐转换为带封面视频

const getPic = async (path, point) => {
  let p = { ret: "0", msg: "" }

  await app.downloadFile({
    // fileID: "cloud://nero-lib-1gxdadxufcb31d0b.6e65-nero-lib-1gxdadxufcb31d0b-1258215298/easyFF/miao.MP4",
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  // 遇到错误即使catch了也会直接返回错误，无法继续处理。暂时放弃监控
  // .catch((e) => {
  //     p.ret = "3"
  //     p.msg = "错误：" + e
  //     console.log(e)
  //     return p
  //   })

  if (point == undefined) {
    point = 5
  }
  const picId = "pic-" + strRandom(6) + ".jpg"

  // 执行本身不会报错，正常运行也会返回stderr，故这里无法监控，只能从上下文件着手
  let bk = shell.exec(
    "/tmp/ffmpeg -i /tmp/vd.mp4 -ss " +
      utils.changeTimeBySecond(point) +
      " -t 1 -r 1 -q:v 2 -f image2 /tmp/" +
      picId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + picId,
    fileContent: fs.createReadStream("/tmp/" + picId),
  })
  console.log(result.fileID)

  p.msg = result.fileID

  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1001",
    type: "视频指定位置截图",
    path: result.fileID,
  })

  return p
}

const getRange = async (path, from, len) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  if (from == undefined) {
    from = 0
  }
  if (len == undefined) {
    len = 10
  }
  const vdId = "vd-" + strRandom(6) + ".mp4"
  let bk = shell.exec(
    "/tmp/ffmpeg -i /tmp/vd.mp4 -ss " +
      utils.changeTimeBySecond(from) +
      " -t " +
      len +
      " -c copy /tmp/" +
      vdId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID

  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1002",
    type: "视频截取片段",
    path: result.fileID,
  })

  return p
}

const trun2Gif = async (path) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })

  const vdId = "vd-" + strRandom(6) + ".gif"
  let bk = shell.exec("/tmp/ffmpeg -i /tmp/vd.mp4 " + "/tmp/" + vdId)
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID
  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1003",
    type: "短视频转为Gif图",
    path: result.fileID,
  })
  return p
}

const addText = async (path, s) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  if (s == undefined) {
    s = "水印"
  }
  const vdId = "vd-" + strRandom(6) + ".mp4"
  let bk = shell.exec(
    `/tmp/ffmpeg -i /tmp/vd.mp4 -vf "drawtext=text='` +
      s +
      `':x=10:y=10"` +
      " /tmp/" +
      vdId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID

  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1004",
    type: "视频添加文字水印",
    path: result.fileID,
  })

  return p
}

const addPic = async (path, p2) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  await app.downloadFile({
    fileID: p2,
    tempFilePath: "/tmp/pic.jpg",
  })
  const vdId = "vd-" + strRandom(6) + ".mp4"
  let bk = shell.exec(
    `/tmp/ffmpeg -i /tmp/vd.mp4 -acodec copy -vf "movie=/tmp/pic.jpg[watermark];[in][watermark]overlay=20:20"` +
      " /tmp/" +
      vdId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID

  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1005",
    type: "视频添加图片水印",
    path: result.fileID,
  })

  return p
}

const rmBgm = async (path) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  const vdId = "vd-" + strRandom(6) + ".mp4"
  let bk = shell.exec(
    "/tmp/ffmpeg -i /tmp/vd.mp4 -vcodec copy -an " + "/tmp/" + vdId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID
  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1006",
    type: "视频消音",
    path: result.fileID,
  })
  return p
}

const addBgm = async (path, p2) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  await app.downloadFile({
    fileID: p2,
    tempFilePath: "/tmp/ad.mp3",
  })
  const vdId = "vd-" + strRandom(6) + ".mp4"
  let bk = shell.exec(
    "/tmp/ffmpeg -i /tmp/ad.mp3 -i /tmp/vd.mp4 –vcodec copy –acodec copy" +
      " /tmp/" +
      vdId +
      " -y"
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID
  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1007",
    type: "视频添加Bgm",
    path: result.fileID,
  })

  return p
}

const getBgm = async (path) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/vd.mp4",
  })
  const vdId = "vd-" + strRandom(6) + ".mp3"
  let bk = shell.exec(
    "/tmp/ffmpeg -i /tmp/vd.mp4 -acodec copy -vn " + "/tmp/" + vdId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID
  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1008",
    type: "获取视频Bgm",
    path: result.fileID,
  })

  return p
}

const turn2Vd = async (path, p2) => {
  let p = { ret: "0", msg: "" }
  await app.downloadFile({
    fileID: path,
    tempFilePath: "/tmp/ad.mp3",
  })
  await app.downloadFile({
    fileID: p2,
    tempFilePath: "/tmp/pic.jpg",
  })
  const vdId = "vd-" + strRandom(6) + ".mp4"
  let bk = shell.exec(
    "/tmp/ffmpeg -loop 1 -i /tmp/pic.jpg -i /tmp/ad.mp3 -pix_fmt yuvj420p -y -shortest " +
      " /tmp/" +
      vdId
  )
  console.log(bk)

  let result = await app.uploadFile({
    cloudPath: "easyFF/" + vdId,
    fileContent: fs.createReadStream("/tmp/" + vdId),
  })
  console.log(result.fileID)

  p.msg = result.fileID
  await co.add({
    no: "record",
    date: utils.timetrans(parseInt(Date.now() / 1000) + 28800),
    result: "成功",
    pid: "1009",
    type: "音乐转为封面视频",
    path: result.fileID,
  })

  return p
}

exports.main = async (event, context) => {
  let res = { ret: "1", msg: "pid错误，不在规则列表中" }
  const pid = event.pid
  const path = event.path
  const p2 = event.p2
  const t = event.t
  const len = event.len
  const s = event.s

  // 层只有只读权限，且不知为啥无法复制到其他目录
  // console.log(shell.cp("-R", "/opt/ffmpeg", "/tmp/"));
  shell.exec("cp ./ffmpeg /tmp/ffmpeg")
  shell.exec("chmod 755 /tmp/ffmpeg")

  switch (pid) {
    case 1001:
      res = await getPic(path, t)
      break
    case 1002:
      res = await getRange(path, t, len)
      break
    case 1003:
      res = await trun2Gif(path)
      break
    case 1004:
      res = await addText(path, s)
      break
    case 1005:
      res = await addPic(path, p2)
      break
    case 1006:
      res = await rmBgm(path)
      break
    case 1007:
      res = await addBgm(path, p2)
      break
    case 1008:
      res = await getBgm(path)
      break
    case 1009:
      res = await turn2Vd(path, p2)
      break

    default:
      break
  }

  return res
}
