function detectUserScreen() {
  var body = document.body,
    html = document.documentElement;
  var screenX = html.clientWidth;
  var screenY = html.clientHeight;
  console.log("visochina e " + screenY);
  console.log("shirinata e " + screenX);

  var imageOneDivHeight = screenY / 2;
  var imageOneDivWidth = screenX / 2;

  var imageTwoDivHeight = screenY / 2;
  var imageTwoDivWidth = screenX / 2;

  var imageThreeDivHeight = screenX / 3;
  var imageThreeDivWidth = screenY / 3;

  getDivsByClass();
  return;
  processingDivs({
    imageOneDivHeight: imageOneDivHeight, imageOneDivWidth: imageOneDivWidth, imageTwoDivHeight: imageTwoDivHeight,
    imageTwoDivWidth: imageTwoDivWidth, imageThreeDivWidth: imageThreeDivWidth, imageThreeDivHeight: imageThreeDivHeight
  });


}

function getDivsByClass() {

  var allDivs = document.getElementsByClassName('picture');

  loopingDivs(allDivs);
  var _this = this;
  document.addEventListener('scroll',function (event) {
    console.log(event);
    loopingDivs(allDivs)



  });

}
function loopingDivs(allDivs) {
  for (var i = 0; i < allDivs.length; i++) {

    if (isInViewport(allDivs[i]) === true) {
      allDivs[i].style.background = 'blue'
    }else{
      allDivs[i].style.background = null
    }

  }

}


function processingDivs(params) {
  console.log(params);
  var firstDiv = document.getElementById('first-div');
  var secondDiv = document.getElementById('second-div');
  var thirdDiv = document.getElementById('third-div');

  firstDiv.style.height = params.imageOneDivHeight + 'px';

  secondDiv.style.top = params.imageTwoDivHeight + 'px';
  secondDiv.style.height = params.imageTwoDivHeight + 'px';

  thirdDiv.style.top = (params.imageTwoDivHeight * 2) + 'px';
  thirdDiv.style.height = params.imageTwoDivHeight + 'px';


}

function isInViewport(element) {

  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  var userHasScrolled = false;
  var isInViewPort = false;


  if(rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)){
    isInViewPort = true

  }
 // console.log(isInViewPort);
  return isInViewPort;




}
