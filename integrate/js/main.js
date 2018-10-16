
jQuery(document).ready(function($){

  $('#market').on('click', function(){
    var flipResult = Math.random();
    $('#market').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#market').addClass('heads');
        console.log('it is head');
        localStorage.setItem("cat-req","market");
       
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
      else{
        $('#market').addClass('tails');
        console.log('it is tails');
        localStorage.setItem("cat-req","market");
      
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
    }, 100);
  });



  $('#medical').on('click', function(){
    var flipResult = Math.random();
    $('#medical').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#medical').addClass('heads');
        console.log('it is head');
        localStorage.setItem("cat-req","butcher");
      
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
      else{
        $('#medical').addClass('tails');
        console.log('it is tails');
        localStorage.setItem("cat-req","butcher");
      
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
    }, 100);
  });




  $('#miveh').on('click', function(){
    var flipResult = Math.random();
    $('#miveh').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#miveh').addClass('heads');
        console.log('it is head');
        localStorage.setItem("cat-req","greens");
       
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
      else{
        $('#miveh').addClass('tails');
        console.log('it is tails');
        localStorage.setItem("cat-req","greens");
      
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
    }, 100);
  });




  $('#naan').on('click', function(){
    var flipResult = Math.random();
    $('#naan').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#naan').addClass('heads');
        console.log('it is head');
        localStorage.setItem("cat-req","bakery");
        
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
      else{
        $('#naan').addClass('tails');
        console.log('it is tails');
        localStorage.setItem("cat-req","bakery");
       
        setTimeout(function(){window.location.href="./food.html";},1500);

      }
    }, 100);
  });




  $('#food').on('click', function(){
    var flipResult = Math.random();
    $('#food').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#food').addClass('heads');
        console.log('it is head');
        localStorage.setItem("cat-req","resturant");
        
        setTimeout(function(){window.location.href="./food.html";},1500);
        
      }
      else{
        $('#food').addClass('tails');
        console.log('it is tails');
        localStorage.setItem("cat-req","resturant");
       
        setTimeout(function(){window.location.href="./food.html";},1500);
      }
    }, 100);
  
    
    
  
  });




  $('#cake').on('click', function(){
    var flipResult = Math.random();
    $('#cake').removeClass();
    setTimeout(function(){
      if(flipResult <= 0.5){
        $('#cake').addClass('heads');
        console.log('it is head');
        localStorage.setItem("cat-req","confectionary");
        
       
        setTimeout(function(){window.location.href="./food.html";},1500);
        
      }
      else{
        $('#cake').addClass('tails');
        console.log('it is tails');
        localStorage.setItem("cat-req","confectionary");
       
       
        setTimeout(function(){window.location.href="./food.html";},1500);
       
        
      }
    }, 100);
  });


  setTimeout(function(){$('#splash').fadeOut(200);},1500);
  
});


function goTo(url){
  setTimeout(function(){window.location.replace(url);},200);
}
  
function logout(){


   
  var xhttp = new XMLHttpRequest();
  var datas ="phone="+localStorage.getItem("radife-phone")+"&key="+localStorage.getItem("radife-verify")
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      if(this.responseText=="1"){

        localStorage.setItem("radife-key","null");
        window.location.replace("./index.html");
        
      }else{
        alert("درخواست ناموفق")
      }
        
     
    }
  };

  xhttp.open("POST", "http://88.99.111.101:8081/logout", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(datas);


}



if (exports) {
  var fs = require('fs');
  var jsdom = require('jsdom').jsdom;
  var html = fs.readFileSync('../index.html', 'utf-8');
  var document = jsdom(html);
  window = document.defaultView;
  var Slideout = require('../js/');
  var assert = require('better-assert');
}

var doc = window.document;
var beforeopenEvent = false;
var openEvent = false;
var beforecloseEvent = false;
var closeEvent = false;
var slideout = new Slideout({
  'panel': doc.getElementById('panel'),
  'menu': doc.getElementById('menu')
});

slideout
  .on('beforeopen', function() {
    beforeopenEvent = true;
  })
  .on('open', function() {
    openEvent = true;
  })
  .on('beforeclose', function() {
    beforecloseEvent = true;
  })
  .on('close', function() {
    closeEvent = true;
  });

describe('Slideout', function () {

  it('should be defined.', function () {
    assert(Slideout !== undefined);
  });

  it('should be a function.', function () {
    assert(typeof Slideout === 'function');
  });

  it('should return a new instance.', function () {
    assert(slideout instanceof Slideout);
  });

  describe('should have the following methods:', function () {
    var methods = [
      'open',
      'close',
      'toggle',
      'isOpen',
      '_initTouchEvents',
      '_translateXTo',
      '_setTransition',
      'on',
      'once',
      'off',
      'emit'
    ];
    var i = 0;
    var len = methods.length;
    for (i; i < len; i += 1) {
      (function (i) {
        it('.' + methods[i] + '()', function (done) {
          assert(typeof slideout[methods[i]] === 'function');
          done()
        });
      }(i));
    }
  });

  describe('should define the following properties:', function () {
    var properties = [
      'panel',
      'menu',
      '_startOffsetX',
      '_currentOffsetX',
      '_opening',
      '_moved',
      '_opened',
      '_fx',
      '_duration',
      '_tolerance',
      '_padding',
      '_touch',
      '_side'
    ];
    var i = 0;
    var len = properties.length;
    for (i; i < len; i += 1) {
      (function (i) {
        it('.' + properties[i] + '()', function (done) {
          assert(slideout[properties[i]] !== undefined);
          done()
        });
      }(i));
    }
  });

  it('should add classnames to panel and menu DOM elements.', function () {
    assert(slideout.panel.className.search('slideout-panel') !== -1);
    assert(slideout.panel.className.search('slideout-panel-left') !== -1);
    assert(slideout.menu.className.search('slideout-menu') !== -1);
    assert(slideout.menu.className.search('slideout-menu-left') !== -1);
  });

  describe('.open()', function () {
    it('should add "slideout-open" classname to HTML.', function () {
      assert(doc.documentElement.className.search('slideout-open') === -1);
      slideout.open();
      assert(doc.documentElement.className.search('slideout-open') !== -1);
    });

    it('should translateX the panel to the given padding.', function () {
      assert(slideout.panel.style.transform === 'translateX(256px)');
      assert(slideout.panel.style.transition.search(/transform 300ms ease/) !== -1);
    });

    it('should set _opened to true.', function () {
      assert(slideout._opened === true);
    });

    it('should emit "beforeopen" event.', function () {
      assert(beforeopenEvent === true);
    });

    it('should emit "open" event.', function (done) {
      setTimeout(function(){
        assert(openEvent === true);
        done();
      }, 400);

    });
  });

  describe('.isOpen()', function () {
    it('should return true if the slideout is opened.', function () {
      assert(slideout.isOpen());
    });
  });

  describe('.close()', function () {
    it('should remove "slideout-open" classname to HTML.', function (done) {
      assert(doc.documentElement.className.search('slideout-open') !== -1);
      slideout.close();
      setTimeout(function(){
        assert(doc.documentElement.className.search('slideout-open') === -1);
        done();
      }, 350);

    });

    it('should translateX the panel to 0.', function () {
      assert(slideout.panel.style.transform === '');
      assert(slideout.panel.style.transition === '');
    });

    it('should set _opened to false.', function () {
      assert(slideout._opened === false);
    });

    it('should emit "beforeclose" event.', function () {
      assert(beforecloseEvent === true);
    });

    it('should emit "close" event.', function () {
      assert(closeEvent === true);
    });
  });

  describe('.toggle()', function () {
    it('should show the slideout if it is not opened.', function (done) {
      assert(doc.documentElement.className.search('slideout-open') === -1);
      slideout.toggle();
      assert(doc.documentElement.className.search('slideout-open') !== -1);
      slideout.toggle();
      setTimeout(function(){
        assert(doc.documentElement.className.search('slideout-open') === -1);
        done();
      }, 350);
    });
  });

  describe('.destroy()', function() {
    it('should destroy the instance internals allowing a new one to be created in it\'s place.', function(){
      slideout.destroy();
      slideout = new Slideout({
        'panel': doc.getElementById('panel'),
        'menu': doc.getElementById('menu')
      });
      slideout.open();
      setTimeout(function(){ slideout.close(); }, 750);
    });
  });
});



/*
window.onscroll = function() {myFunction()};
  
var header = document.getElementById("head");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

*/



//███████╗███╗   ██╗ ██████╗ ██████╗    ███████╗ ██████╗ ██╗  ██╗██████╗  █████╗ ██╗     ██╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ ██╗██╗     
//██╔════╝████╗  ██║██╔════╝ ██╔══██╗   ██╔════╝██╔════╝ ██║  ██║██╔══██╗██╔══██╗██║     ██║██╔═══██╗██╔════╝ ████╗ ████║██╔══██╗██║██║     
//█████╗  ██╔██╗ ██║██║  ███╗██████╔╝   █████╗  ██║  ███╗███████║██████╔╝███████║██║     ██║██║██╗██║██║  ███╗██╔████╔██║███████║██║██║     
//██╔══╝  ██║╚██╗██║██║   ██║██╔══██╗   ██╔══╝  ██║   ██║██╔══██║██╔══██╗██╔══██║██║     ██║██║██║██║██║   ██║██║╚██╔╝██║██╔══██║██║██║     
//███████╗██║ ╚████║╚██████╔╝██║  ██║██╗███████╗╚██████╔╝██║  ██║██████╔╝██║  ██║███████╗██║╚█║████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║██║███████╗
//╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚╝╚═══╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                                                                                                                          