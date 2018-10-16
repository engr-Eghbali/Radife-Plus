
var current_add;
//var newX,newY;
var marker;
//** */
var pos={lat:31.834672,lng:54.373387};











function coordinates_to_address(lat, lng) {

  var geocoder = new google.maps.Geocoder;
  var latlng = new google.maps.LatLng(lat, lng);

  geocoder.geocode({'latLng': latlng}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
          if(results[0]) {
             
              pos.lat=lat;
              pos.lng=lng;
              if(!current_add){
                setMap();
              }
              current_add= results[0].formatted_address;
              document.getElementById("address").removeChild(document.getElementById("address").childNodes[1]);
              var pnode=document.createElement("p");
              var textadd=document.createTextNode(current_add);
              pnode.appendChild(textadd);
              document.getElementById("address").appendChild(pnode);

          } else {
            current_add= "آدرستون ردیف نیست!";
            document.getElementById("address").removeChild(document.getElementById("address").childNodes[1]);
            var pnode=document.createElement("p");
            var textadd=document.createTextNode(current_add);
            pnode.appendChild(textadd);
            document.getElementById("address").appendChild(pnode);

          }
      } else {
          // alert('Geocoder failed due to: ' + status);
          current_add= "اول مکان یاب گوشیتون رو ردیف کنید!";
          document.getElementById("address").removeChild(document.getElementById("address").childNodes[1]);
          var pnode=document.createElement("p");
          var textadd=document.createTextNode(current_add);
          pnode.appendChild(textadd);
          document.getElementById("address").appendChild(pnode);

      }
  });
}




function setMap(){

  var map,x,y,add;
  x=pos.lat;
  y=pos.lng;
  add=current_add;
  
  var pnode=document.createElement("p");
  var textadd=document.createTextNode(add);
  pnode.appendChild(textadd);
  document.getElementById("address").appendChild(pnode);
  





function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parseFloat(x), lng: parseFloat(y)},
    zoom: 15
  });

 

     

  google.maps.event.addListener(map, 'drag', function(event) {
    coordinates_to_address(event.latLng.lat(), event.latLng.lng());      
    placeMarker(map, event.latLng);
  });    

  google.maps.event.addListener(map, 'click', function(event) {
    coordinates_to_address(event.latLng.lat(),event.latLng.lng());      
    placeMarker(map, event.latLng);
  });    



  var image = {
    url: './css/img/home.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(64, 64),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 48)
  };

  var beachMarker = new google.maps.Marker({
    position: {lat: parseFloat(x), lng: parseFloat(y)},
    map: map,
    icon: image
  });

  setTimeout(function(){$('#splash').fadeOut(500);},1500);
}


initMap();


}

$(window).on('load', function () {
  
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
       lat: position.coords.latitude,
       lng: position.coords.longitude
     };

     setTimeout(function(){coordinates_to_address(pos.lat, pos.lng);},500);
              
     
   });

   
 } else {
   // Browser doesn't support Geolocation
   alert("مکان یاب گوشی خود را روشن کنید");
   setTimeout(function(){$('#splash').fadeOut(500);},1500);
 }

 
});


  function placeMarker(map, location) {
  
      if(marker !=null){
        marker.setMap(null);
      }
      marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        icon: "./css/img/add.png"
      });


      
    
  }

//** */





function getadd(){

  var add=current_add;
  var phoneNo=localStorage.getItem("radife-phone");

  if(add.length>10){

    localStorage.setItem("radife-add", add);
    localStorage.setItem("radife-x", pos.lat);
    localStorage.setItem("radife-y", pos.lng);
    

    var data="phone="+phoneNo+"&add="+add+"&x="+pos.lat+"&y="+pos.lng;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {

            if (this.responseText=="1"){

              /// set lenght to the verification code/////
              if (localStorage.getItem("radife-key").length>0){

                localStorage.setItem("radife-key",localStorage.getItem("radife-key")+"&add=1");
                window.location.replace("./main.html");
              }
             
            }
            
           
          }
        };

        xhttp.open("POST", "http://88.99.111.101:8081/setAddress", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);

       // window.location.replace("./main.html");

  }else{
    alert("آدرس خود را کامل وارد کنید.");
  }
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





  
//███████╗███╗   ██╗ ██████╗ ██████╗    ███████╗ ██████╗ ██╗  ██╗██████╗  █████╗ ██╗     ██╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ ██╗██╗     
//██╔════╝████╗  ██║██╔════╝ ██╔══██╗   ██╔════╝██╔════╝ ██║  ██║██╔══██╗██╔══██╗██║     ██║██╔═══██╗██╔════╝ ████╗ ████║██╔══██╗██║██║     
//█████╗  ██╔██╗ ██║██║  ███╗██████╔╝   █████╗  ██║  ███╗███████║██████╔╝███████║██║     ██║██║██╗██║██║  ███╗██╔████╔██║███████║██║██║     
//██╔══╝  ██║╚██╗██║██║   ██║██╔══██╗   ██╔══╝  ██║   ██║██╔══██║██╔══██╗██╔══██║██║     ██║██║██║██║██║   ██║██║╚██╔╝██║██╔══██║██║██║     
//███████╗██║ ╚████║╚██████╔╝██║  ██║██╗███████╗╚██████╔╝██║  ██║██████╔╝██║  ██║███████╗██║╚█║████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║██║███████╗
//╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚╝╚═══╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                                                                                                                          