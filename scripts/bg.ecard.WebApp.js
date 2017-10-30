var bg = bg || new Object();
bg.ecard = bg.ecard || new Object();

bg.ecard.WebApp = new Object();

bg.ecard.WebApp.core = function (params) {
  console.log('new bg.ecard.WebApp.core()');
  this.params = params;
  this.viewPort = new bg.ecard.WebApp.ViewPort({}, this);


};