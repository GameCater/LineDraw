// src/myOpenDataContext/index.js

let sharedCanvas = wx.getSharedCanvas();
let context = sharedCanvas.getContext('2d');
let myopid = "";
let TopOrother = false; //false代表不为排第一个  true代表排第一个
let allYE = 1; //设置多少页
let nowYE = 0; //设置当前也
var alldata = null;//所有数据 优先在打开排行榜获取 InitDraw 
var DrwaConfig = {};
var CallDate = {}; //由于获取排行榜回调延迟 导致绘制前无法获取数据 特定延迟调用 此为调用集 目前只有排行 清除 超越命令 不同命令只会以最后调用为准，不会重复调用
wx.onMessage(data => {
  if (data.type == "InitDraw") { //初始化开放域
    if(!alldata){//没有数据再重新获取
      wx.getFriendCloudStorage({
        keyList: ['score'],
        success: res => {
          console.log(res.data);
          console.log("排序前")
          alldata = res.data;
          var max;
          for (var a = 0; a < alldata.length - 1; a++) { //排序
            for (var b = a + 1; b < alldata.length; b++) {
              if (parseInt(alldata[a].KVDataList[0].value) < parseInt(alldata[b].KVDataList[0].value)) {
                max = alldata[b]
                alldata[b] = alldata[a];
                alldata[a] = max;
              }
            }
          }
          allYE = Math.ceil(alldata.length / 4);
          if (Object.keys(CallDate).length) {
            for (var js in CallDate) {
              CallDate[js](CallDate[js].CS);
              delete CallDate[js];
            }
          }
        },
        fail: err => {
          console.log(err);
        },
      });
    }
    myopid = data.opid;
    
  } else if (data.type == "GetRank") { //绘制常规排行榜
    DrwaConfig = data.other;
    if (alldata) {
      drawRankList(0);
    } else {
      CallDate.drawRank = drawRankList;
      CallDate.drawRank.CS = 0;
    }

  } else if (data.type == "getnext") { //下一页
    if (nowYE + 1 != allYE) {
      nowYE++;
      if (alldata) {
        drawRankList(nowYE);
      } else {
        CallDate.drawRank = drawRankList;
        CallDate.drawRank.CS = nowYE;
      }
    }
  } else if (data.type == "getlast") { //上一页
    if (nowYE - 1 != -1) {
      nowYE--;
      if (alldata) {
        drawRankList(nowYE);
      } else {
        CallDate.drawRank = drawRankList;
        CallDate.drawRank.CS = nowYE;
      }
    }

  } else if (data.type == "clear") { //清除页面
    if (alldata) {
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    } else {
      CallDate.Clear = function () {
        context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      };
      CallDate.Clear.CS = null;
    }

  } else if (data.type == "DrawAny") { //绘制任意
    DrwaConfig = data.other;
    if (alldata) {
      DrawAny(0);
    } else {
      CallDate.drawRank = DrawAny;
      CallDate.drawRank.CS = 0;
    }
  }
})



function drawRankList(index) { //整体绘制单独排行榜
  var DrawDate = []; //拿到需要绘制的对象
  var ps = 0;
  for (var a = nowYE * DrwaConfig.MaxbyOne; a < alldata.length; a++) {
    DrawDate[ps] = alldata[a];
    ps++;
  }
  // DrawDate[1]=DrawDate[0];
  // DrawDate[2]=DrawDate[0];
  // DrawDate[3]=DrawDate[0];
  // DrawDate[4]=DrawDate[0];
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height); //清除
  if (DrwaConfig.OpenDraw.DrawYe) { //是否开启绘制页面数量
    context.fillStyle = DrwaConfig.DrawYe.color;
    context.font = DrwaConfig.DrawYe.scale + 'px Arial';
    context.textAlign = 'center';
    context.fillText(nowYE + 1 + "/" + allYE, DrwaConfig.DrawYe.x, DrwaConfig.DrawYe.y);
  }
  if (DrwaConfig.OpenDraw.head) { //是否开启绘制头像
    for (var a = 0; a < DrawDate.length; a++) {
      var avatar = wx.createImage();
      avatar.src = DrawDate[a].avatarUrl;
      avatar.x = DrwaConfig.Pos.head.x;
      avatar.y = DrwaConfig.Pos.head.y + DrwaConfig.DrawJianJu * a;
      avatar.scale = DrwaConfig.Size.head;
      avatar.onload = function (res) {
        context.drawImage(res.target, res.target.x, res.target.y, res.target.scale, res.target.scale);
      }
    }
  }
  if (DrwaConfig.OpenDraw.name) { //是否开启绘制姓名
    context.fillStyle = DrwaConfig.Color.name;
    context.font = DrwaConfig.Size.name + 'px Arial';
    context.textAlign = 'left';
    for (var a = 0; a < DrawDate.length; a++) {
      var name = DrawDate[a].nickname.split('');
      if (ischina(DrawDate[a].nickname)) {
        if (name.length > 3)
          name.splice(3, name.length - 3);
        var nametext = name.join('');
      } else {
        if (name.length > 5)
          name.splice(5, name.length - 5);
        var nametext = name.join('');
      }
      context.fillText(nametext, DrwaConfig.Pos.name.x, DrwaConfig.Pos.name.y + DrwaConfig.DrawJianJu * a);
    }
  }
  if (DrwaConfig.OpenDraw.Pm) { //是否开启绘制排名
    context.fillStyle = DrwaConfig.Color.Pm;
    context.font = DrwaConfig.Size.Pm + 'px Arial';
    context.textAlign = 'center';
    for (var a = 0; a < DrawDate.length; a++) {
      context.fillText(a + 1 + DrwaConfig.MaxbyOne * nowYE, DrwaConfig.Pos.Pm.x, DrwaConfig.Pos.Pm.y + DrwaConfig.DrawJianJu * a);
    }
  }
  if (DrwaConfig.OpenDraw.Score) { //是否开启绘制分数
    context.font = DrwaConfig.Size.Score + 'px Arial';
    context.fillStyle = DrwaConfig.Color.Score;
    context.textAlign = 'left';
    for (var a = 0; a < DrawDate.length; a++) {
      context.fillText(parseInt(DrawDate[a].KVDataList[0].value), DrwaConfig.Pos.Score.x, DrwaConfig.Pos.Score.y + DrwaConfig.DrawJianJu * a);
    }
  }
  if (DrwaConfig.DrawMyCore.open) { //是否开启绘制个人排名
    //绘制头像 姓名等
  }
}

function DrawAny() {//绘制任意
  console.log(sharedCanvas.width)
  console.log(sharedCanvas.height)
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height); //清除
  var Myindex = 0;
  if (DrwaConfig.ISCY) {//是否需要找出自己位置
    for (var a = 0; a < alldata.length; a++) {//先找出自己在哪里
      if (alldata[a].openid == myopid) {
        Myindex = a;
        break;
      }
    }
  }

  for (var a = 0; a < DrwaConfig.DrawArr.length; a++) {
    var data = DrwaConfig.DrawArr[a];
    var DrawID;
    if (data.indexType == "MR") {//默认
      DrawID = 0;
    } else if (data.indexType == "CY") {//超越
      DrawID = Myindex;
    }
    var DrawDate = alldata[DrawID + data.index];
    if (DrawDate) {//如果有这个数据
     
      if (data.OpenDraw.head) { //是否开启绘制头像
        var avatar = wx.createImage();
        avatar.src = DrawDate.avatarUrl;
        avatar.x = data.Pos.head.x;
        avatar.y = data.Pos.head.y;
        avatar.scale = data.Size.head;
        avatar.onload = function (res) {
          context.drawImage(res.target, res.target.x, res.target.y, res.target.scale, res.target.scale);
        }
      }
      if (data.OpenDraw.name) { //是否开启绘制姓名
        context.fillStyle = data.Color.name;
        context.font = data.Size.name + 'px Arial';
        context.textAlign = data.Pos.name.type;
        var name =DrawDate.nickname.split('');
          if (ischina(DrawDate.nickname)) {
            if (name.length > 3)
              name.splice(3, name.length - 3);
            var nametext = name.join('');
          } else {
            if (name.length > 5)
              name.splice(5, name.length - 5);
            var nametext = name.join('');
          }
          context.fillText(nametext, data.Pos.name.x, data.Pos.name.y );
      }
      if (data.OpenDraw.Pm) { //是否开启绘制排名
        context.fillStyle = data.Color.Pm;
        context.font = data.Size.Pm + 'px Arial';
        context.textAlign = data.Pos.Pm.type;
        context.fillText((DrawID + data.index+1), data.Pos.Pm.x, data.Pos.Pm.y );
      }
      if (data.OpenDraw.Score) { //是否开启绘制分数
        context.font = data.Size.Score + 'px Arial';
        context.fillStyle = data.Color.Score;
        context.textAlign = data.Pos.Score.type;
        context.fillText(parseInt(DrawDate.KVDataList[0].value), data.Pos.Score.x, data.Pos.Score.y );
      }
    } else {
      console.log("DrawAny不存在这个数据:" + (DrawID + data.index));
    }
  }

}
/*校验是否y有中文组成 */
function ischina(str) {
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g"); /*定义验证表达式*/
  return reg.test(str); /*进行验证*/
}