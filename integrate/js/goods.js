var cart={};
var count=0;
var total=0;


var
persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
function toEnglish(str){
  if(typeof str === 'string')
  {
    for(var i=0; i<10; i++)
    {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
}




function toPersian(){

  persian={0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};
function traverse(el){
  if(el.nodeType==3){
    var list=el.data.match(/[0-9]/g);
    if(list!=null && list.length!=0){
      for(var i=0;i<list.length;i++)
        el.data=el.data.replace(list[i],persian[list[i]]);
    }
  }
  for(var i=0;i<el.childNodes.length;i++){
    traverse(el.childNodes[i]);
  }
}
  traverse(document.body);
 
}




 function addgood(x){

  var minus="#remover"+x;
  var nameid="#goodname"+x;
  var priceid="#goodprice"+x;

  $(minus).css("display","block");
 
  if (cart[x]>0){
    
    cart[x]++;
    count++;
    $("#buycount").text('('+count+')');
    //document.getElementById("price"+x).remove(document.getElementById("no"+x));
    $("#no"+x).remove();
    var p=document.createElement("div");
    p.className="p5";
    p.setAttribute('id',"no"+x);
    var pno=document.createTextNode(cart[x]);
    p.appendChild(pno);
    document.getElementById("price"+x).after(p);
    total=total+parseInt(toEnglish($("#price"+x).text()));
    $("#mablagh").text(total);

    

  }else{

    cart[x]=1;
    count++;
    $("#buycount").text('('+count+')');
    var p1 = document.createElement("li");
    var pname = document.createTextNode($(nameid).text());
    p1.setAttribute('id',"name"+x);

    var p2=document.createElement("div");
    p2.className="p5";
    var pprice = document.createTextNode($(priceid).text());
    p2.setAttribute('id',"price"+x);

    var p3=document.createElement("div");
    p3.className="p5";
    var pno=document.createTextNode(cart[x]);
    p3.setAttribute('id',"no"+x);
    
    p1.appendChild(pname);
    p2.appendChild(pprice);
    p3.appendChild(pno);

    document.getElementById("list").appendChild(p1);
    document.getElementById("name"+x).appendChild(p2);
    document.getElementById("price"+x).after(p3);
    total=total+parseInt(toEnglish($("#price"+x).text()));
    $("#mablagh").text(total);
    

  }
 
  if (count>0){
    $("#buy").show();
  }
}


function removegood(x){
  var minus="#remover"+x;
  
  if (cart[x]>1){

    cart[x]--;
    count--;
    $("#buycount").text('('+count+')');
    //document.getElementById("price"+x).removeChild(document.getElementById("no"+x));
    $("#no"+x).remove();
    var p=document.createElement("div");
    p.className="p5";
    p.setAttribute('id',"no"+x);
    var pno=document.createTextNode(cart[x]);
    p.appendChild(pno);
    document.getElementById("price"+x).after(p);
    total=total-parseInt(toEnglish($("#price"+x).text()));
    $("#mablagh").text(total);


  }else{
    delete cart[x];
    count--;
    $("#buycount").text('('+count+')');
    $(minus).css("display","none");
   // document.getElementById("price"+x).removeChild(document.getElementById("no"+x));
   // document.getElementById("name"+x).removeChild(document.getElementById("price"+x));
   // document.getElementById("list").removeChild(document.getElementById("name"+x));
   total=total-parseInt(toEnglish($("#price"+x).text()));
   $("#mablagh").text(total);
   $("#no"+x).remove();
   $("#price"+x).remove();
   $("#name"+x).remove();

  }
  
  if (count<1){
    $("#buy").hide();
  }

}

$(document).ready(function(){



  

  $('#slideshow > div:gt(0)').hide();
  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  }, 5000);
  



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




});


/////////////reauest and get status and subcategories///////
function getStatus(){

  
  var xhttp = new XMLHttpRequest();
  var datas ="cat="+localStorage.getItem("cat-req")+"&shopID="+localStorage.getItem("shop-req")+"&radifeCustomer="+localStorage.getItem("radife-phone");
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      if(this.responseText=="-1"){
        getStatus();
      }else{


        var resp=this.responseText.split("$/$");
        var status=resp[0];
        var detail=resp[1];
        var subcats=resp[2];
        var defualtCat =resp[3]
        var favorit = resp[4]

       var statDiv = document.createElement("div");
       var subcatsDiv = document.createElement("div");
       
       subcatsDiv.className="catrow";
       subcatsDiv.setAttribute("id","catrow");
       statDiv.innerHTML=status;
       subcatsDiv.innerHTML=subcats;
       
       document.getElementById("statusrow").prepend(statDiv);
       $("#comments").after(detail);
       $("#comments").before(favorit);
       document.getElementById("catrowPlace").appendChild(subcatsDiv);
       changeSubCat(defualtCat);
      }

     
     
    }
  };

  xhttp.open("POST", "http://88.99.111.101:8081/shopStatus", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(datas);

}




////////request and get goods container
function changeSubCat(subcat){

  $('#splash').fadeIn(1);
  var xhttp = new XMLHttpRequest();
  var datas ="cat="+localStorage.getItem("cat-req")+"&shopID="+localStorage.getItem("shop-req")+"&subCat="+subcat;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      $("#goodsContainer").remove();
      var division = document.createElement("div");
      division.setAttribute("id","goodsContainer");
      division.innerHTML=this.responseText;
     document.getElementById("goods").appendChild(division);
     toPersian();
     $('#splash').fadeOut(1500);
     
    }
  };

  xhttp.open("POST", "http://88.99.111.101:8081/goods", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(datas);

}





$(window).on('load', function () {


  getStatus();
  
  //getGoods();
  


  
});





function gotomap(){

   var sending_cart;
   var customer=localStorage.getItem("radife-phone");
   var shop    =localStorage.getItem("shop-req");
   var x       =localStorage.getItem("radife-x");
   var y       =localStorage.getItem("radife-y");
   var add     =localStorage.getItem("radife-add");

  $.each(cart, function( index, value ) {
    
     sending_cart=value+"@"+index+"#"+sending_cart;

  });


  var data="customer="+customer+"&shop="+shop+"&x="+x+"&y="+y+"&add="+add+"&total="+total+"&cart="+sending_cart;
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

     if (this.responseText=="0"){
       alert("با عرض پوزش سفارش شما ثبت نشد");
       location.reload();
     }else{

        localStorage.setItem("radife-order",this.responseText);
        location.replace("./mappage.html");
     }
     
    }
  };

  xhttp.open("POST", "http://88.99.111.101:8081/cart", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(data);

  
}


function favorit(){

  var datas ="cat="+localStorage.getItem("cat-req")+"&shopID="+localStorage.getItem("shop-req")+"&radifeCustomer="+localStorage.getItem("radife-phone");
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

     if (this.responseText=="1"){

      $("#heart").removeClass("far fa-heart").addClass("fas fa-heart");
      $("#heart").css("color","red");
      $("#favorit").attr("onclick","nofavorit()");
     }else{
      
      alert("مجددا تلاش کنید");

    }
     
    }
  };

  xhttp.open("POST", "http://88.99.111.101:8081/follow", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(datas);

  //toggle on click
 
}

function nofavorit(){

  var datas ="cat="+localStorage.getItem("cat-req")+"&shopID="+localStorage.getItem("shop-req")+"&radifeCustomer="+localStorage.getItem("radife-phone");
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

   
  //toggle on click
 $("#heart").removeClass("fas fa-heart").addClass("far fa-heart");
 $("#heart").css("color","black");
 $("#favorit").attr("onclick","favorit()");
         


}
};

xhttp.open("POST", "http://88.99.111.101:8081/unfollow", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(datas);
}

function rate(n){
  switch (n){
    case 1:
    document.getElementById("star").innerHTML="<p8 onclick=\"rate(1)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(2)\"><i class=\"far fa-star\"></i></p8><p8 onclick=\"rate(3)\"><i class=\"far fa-star\"></i></p8><p8 onclick=\"rate(4)\"><i class=\"far fa-star\"></i></p8><p8 onclick=\"rate(5)\"><i class=\"far fa-star\"></i></p8>";
    break;
    case 2:
    document.getElementById("star").innerHTML="<p8 onclick=\"rate(1)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(2)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(3)\"><i class=\"far fa-star\"></i></p8><p8 onclick=\"rate(4)\"><i class=\"far fa-star\"></i></p8><p8 onclick=\"rate(5)\"><i class=\"far fa-star\"></i></p8>";
    break;
    case 3:
    document.getElementById("star").innerHTML="<p8 onclick=\"rate(1)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(2)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(3)\"  style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(4)\"><i class=\"far fa-star\"></i></p8><p8 onclick=\"rate(5)\"><i class=\"far fa-star\"></i></p8>";
    break;
    case 4:
    document.getElementById("star").innerHTML="<p8 onclick=\"rate(1)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(2)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(3)\"  style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(4)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(5)\"><i class=\"far fa-star\"></i></p8>";
    break;
    case 5:
    document.getElementById("star").innerHTML="<p8 onclick=\"rate(1)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(2)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(3)\"  style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(4)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8><p8 onclick=\"rate(5)\" style=\"color:goldenrod;\"><i class=\"fas fa-star\"></i></p8>";
    break;
    
  }
}

function closeComments(){
  $("#commentsPage").hide();
}
function showComments(){
  $("#commentsPage").show();
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



  
//███████╗███╗   ██╗ ██████╗ ██████╗    ███████╗ ██████╗ ██╗  ██╗██████╗  █████╗ ██╗     ██╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ ██╗██╗     
//██╔════╝████╗  ██║██╔════╝ ██╔══██╗   ██╔════╝██╔════╝ ██║  ██║██╔══██╗██╔══██╗██║     ██║██╔═══██╗██╔════╝ ████╗ ████║██╔══██╗██║██║     
//█████╗  ██╔██╗ ██║██║  ███╗██████╔╝   █████╗  ██║  ███╗███████║██████╔╝███████║██║     ██║██║██╗██║██║  ███╗██╔████╔██║███████║██║██║     
//██╔══╝  ██║╚██╗██║██║   ██║██╔══██╗   ██╔══╝  ██║   ██║██╔══██║██╔══██╗██╔══██║██║     ██║██║██║██║██║   ██║██║╚██╔╝██║██╔══██║██║██║     
//███████╗██║ ╚████║╚██████╔╝██║  ██║██╗███████╗╚██████╔╝██║  ██║██████╔╝██║  ██║███████╗██║╚█║████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║██║███████╗
//╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚╝╚═══╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                                                                                                                          