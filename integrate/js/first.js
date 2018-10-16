$(document).ready(function(){



    setTimeout(function(){$('#splash').fadeOut(500);},1000);
  
});  
   

 var key=localStorage.getItem("radife-key");


 //intial app key+version+hiidens here...remove this after done!
if(key=="key=radife22&add=1"){
    window.location.replace("./main.html");
}else{
    if(key=="key=radife22")
    window.location.replace("./third.html");
}



function getphone(){

    var phone=$("#phoneno").val();
    if(phone.length==11){


        localStorage.setItem("radife-phone",phone);
        var data="phone="+phone+"&code=1";
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
           
            if (this.responseText =="0"){
                alert("شماره تلفن شما قبلا ثبت شده است");
                
            }else{

                if (this.responseText =="-1"){
                    alert("خطای سیستم،مجددا تلاش کنید");
                    location.reload();
                }else{
                    localStorage.setItem("radife-verify",this.responseText);
                    window.location.replace("./second.html");
                }
               
            }
           
          }
        };

       // for (i=0;i<2;i++){ 
        xhttp.open("POST", "http://88.99.111.101:8081/submit", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);

        
    }else{
        alert("شماره تلفن خود را صحیح وارد کنید.");
    }
}

//███████╗███╗   ██╗ ██████╗ ██████╗    ███████╗ ██████╗ ██╗  ██╗██████╗  █████╗ ██╗     ██╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ ██╗██╗     
//██╔════╝████╗  ██║██╔════╝ ██╔══██╗   ██╔════╝██╔════╝ ██║  ██║██╔══██╗██╔══██╗██║     ██║██╔═══██╗██╔════╝ ████╗ ████║██╔══██╗██║██║     
//█████╗  ██╔██╗ ██║██║  ███╗██████╔╝   █████╗  ██║  ███╗███████║██████╔╝███████║██║     ██║██║██╗██║██║  ███╗██╔████╔██║███████║██║██║     
//██╔══╝  ██║╚██╗██║██║   ██║██╔══██╗   ██╔══╝  ██║   ██║██╔══██║██╔══██╗██╔══██║██║     ██║██║██║██║██║   ██║██║╚██╔╝██║██╔══██║██║██║     
//███████╗██║ ╚████║╚██████╔╝██║  ██║██╗███████╗╚██████╔╝██║  ██║██████╔╝██║  ██║███████╗██║╚█║████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║██║███████╗
//╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚╝╚═══╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                                                                                                                          