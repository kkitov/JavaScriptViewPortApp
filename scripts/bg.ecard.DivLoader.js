'use strict';
bg.ecard.WebApp.ViewPort = function (params, parent) {
  this.parent = parent;
  this.params = params;

  this.counter = 0;
  this.offsetTopStrip = 200;
  this.offsetBotStrip = 200;

  var body = document.body,
    html = document.documentElement;
  var screenX = html.clientWidth;
  var screenY = html.clientHeight;
  console.log("visochina e " + screenY);
  console.log("shirinata e " + screenX);

  this.imageOneDivHeight = screenY / 2;
  this.imageOneDivWidth = screenX / 2;

  var imageTwoDivHeight = screenY / 2;
  var imageTwoDivWidth = screenX / 2;

  var imageThreeDivHeight = screenX / 3;
  var imageThreeDivWidth = screenY / 3;

  this.strips = document.getElementById('bot-top-strips');
  this.strips.style.top = this.offsetTopStrip + 'px';
  this.strips.style.bottom = this.offsetBotStrip + 'px';
  //console.log(parseInt('200px'));


  this.getDivsByClass();
  return;
  this.processingDivs({
    imageOneDivHeight: imageOneDivHeight, imageOneDivWidth: imageOneDivWidth, imageTwoDivHeight: imageTwoDivHeight,
    imageTwoDivWidth: imageTwoDivWidth, imageThreeDivWidth: imageThreeDivWidth, imageThreeDivHeight: imageThreeDivHeight
  });


}

bg.ecard.WebApp.ViewPort.prototype.getDivsByClass = function () {
  this.allDivs = document.getElementsByClassName('picture');


  this.divsArr = this.getDivsParamsInArr(this.allDivs);
  this.loopingDivs(this.divsArr);
  var _this = this;
  var iScrollPos = 0;
  this.divsArrLenght = this.divsArr.length;
 // console.log(this.divsArrLenght);
  var scroll = function () {
    _this.loopingDivs(_this.divsArr)
  };
  var waiting = false;
  document.addEventListener('scroll',function () {
    
    if (waiting) {
      return;
    }
    waiting = true;
    clearTimeout(endScrollHandle);
    scroll();
    setTimeout(function () {
      waiting = false;
    }, 250);
    var endScrollHandle = setTimeout(function () {
      scroll();
    },200)


   // var iCurScrollPos = $(this).scrollTop();


    // if (iCurScrollPos > iScrollPos) {
    //  // console.log('Scroll down');
    //    _this.downScrollPressed();
    //  // _this.checkView();
    // } else {
    //   _this.upScrollPressed();
    //  // console.log('Scroll up');
    // }
    //
    // iScrollPos = iCurScrollPos;


  });

  var resizeTimeout;
  window.onresize = function(){
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function(){
     // console.log('resizeddd');
      _this.getDivsParamsInArr(_this.allDivs);
      _this.loopingDivs(_this.divsArr);
    }, 500);
  };



};
bg.ecard.WebApp.ViewPort.prototype.upScrollPressed = function () {
  if (this.lastHidedPos < this.l - 1) {
    if (this.lastHidedPos < 0) {
      this.lastHidedPos = 0;

    }

    if (this.isInViewport(this.divsArr[this.lastHidedPos], this.html)) {
      //console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
      this.divsArr[this.lastHidedPos].DOMElement.style.background = 'blue';
      this.lastHidedPos--;
      this.counter = this.lastHidedPos;
      if (this.counter && this.lastHidedPos < 0) {
        this.counter = 0;
        this.lastHidedPos = 0;
      }
      //console.log("countera e " + this.counter)
    }
    else if (!this.isInViewport(this.divsArr[this.lastShowedCurPositon], this.html)) {
      this.divsArr[this.lastShowedCurPositon].DOMElement.style.background = null;
      this.lastShowedCurPositon--;


    }
  }


};
bg.ecard.WebApp.ViewPort.prototype.downScrollPressed = function () { //Има проблем първата проверка като стигне <thiс.l - 1 не скрива един див.

  if (this.lastShowedCurPositon < this.l - 1) {
    if (this.isInViewport(this.divsArr[this.lastShowedCurPositon + 1])) {
     // console.log(this.lastShowedCurPositon);
      this.lastShowedCurPositon++;
      this.divsArr[this.lastShowedCurPositon].DOMElement.style.background = 'blue';
    }
    else if (!this.isInViewport(this.divsArr[this.counter])) {
      this.divsArr[this.counter].DOMElement.style.background = null;
      this.lastHidedPos = this.counter;
     // console.log(this.counter);
      this.counter++;


    }

  }

};

bg.ecard.WebApp.ViewPort.prototype.loopingDivs = function (divsArr) {
  this.html = document.documentElement;
  this.l = divsArr.length;

  //console.log(divsArr);

  for (var i = 0; i < this.l; i++) {
    if (this.isInViewport(divsArr[i], this.html) === true) {
     // console.log('poziciq ' + i )
      divsArr[i].DOMElement.style.background = 'blue';
      this.lastShowedDiv = divsArr[i].DOMElement;
      this.lastShowedCurPositon = i;

    } else {

      divsArr[i].DOMElement.style.background = 'black'
    }

  }

};
bg.ecard.WebApp.ViewPort.prototype.getDivsParamsInArr = function (allDivs) {
  this.divsObj = [];

  for (var i = 0; i < allDivs.length; i++) {
    this.div = allDivs[i].getBoundingClientRect();
    this.divsObj[i] = {
      position: i,
      DOMElement: allDivs[i],
      topPos: Math.ceil(this.div.top),
      leftPos: Math.ceil(this.div.left),
      botPos: Math.ceil(this.div.bottom),
      rightPos: Math.ceil(this.div.right),
      elementHeight: Math.ceil(this.div.height)
    };
  }
  return this.divsObj;
};


bg.ecard.WebApp.ViewPort.prototype.processingDivs = function (params) {
  //console.log(params);
  var firstDiv = document.getElementById('first-div');
  var secondDiv = document.getElementById('second-div');
  var thirdDiv = document.getElementById('third-div');

  firstDiv.style.height = params.imageOneDivHeight + 'px';

  secondDiv.style.top = params.imageTwoDivHeight + 'px';
  secondDiv.style.height = params.imageTwoDivHeight + 'px';

  thirdDiv.style.top = (params.imageTwoDivHeight * 2) + 'px';
  thirdDiv.style.height = params.imageTwoDivHeight + 'px';


};

bg.ecard.WebApp.ViewPort.prototype.isInViewport = function (elem) {

  console.log(elem.elementHeight);
  var docViewTop = window.pageYOffset;
  var docViewBottom = Math.ceil(docViewTop + $(window).height());

  var elemTop = Math.ceil(elem.DOMElement.offsetTop);
  var elemBottom = elemTop + elem.elementHeight;
  // console.log("element nomer " + elem.position);
  // console.log("gorna chast na ekrana " + docViewTop);
  // console.log("dolna chast na ekrana " + docViewBottom);
  // console.log("gorniq krai na elementa" + elem.topPos);
  // console.log("dolniq krai na lementa" + elem.botPos);
  // if((elemTop  <= docViewBottom + (elem.elementHeight) ) && (elemBottom - docViewTop>= this.offsetTopStrip - elem.elementHeight )){
  //   return true;
  // }
  if(docViewBottom - this.offsetTopStrip/2>elemTop  && docViewTop <elemBottom - elem.elementHeight/2){
    return true;
  }






  // //this.rect = element.getBoundingClientRect();
  // console.log( this.rect);
  // this.appearOffset = this.rect.height;
  //
  // var isInViewPort = false;
  //
  //
  // if (this.rect.top <= (window.innerHeight - this.offsetBotStrip + this.appearOffset || (html.clientHeight - this.offsetBotStrip) + this.appearOffset) &&
  //   this.rect.left >= 0 &&
  //   this.rect.bottom >= this.offsetTopStrip - this.appearOffset &&
  //   this.rect.right <= (window.innerWidth || html.clientWidth)) {
  //   isInViewPort = true
  //
  // }
  //
  // return isInViewPort;


};





