
$(document).ready(function (){


    document.getElementById("phoneno").addEventListener("input", change);
    var code=localStorage.getItem("radife-verify");

function change(){
    
    if ($("#phoneno").val()==code){
        localStorage.setItem("radife-key","key=radife22");
        window.location.replace("./third.html");
    }
}

$('#splash').fadeOut(1500);

});

//███████╗███╗   ██╗ ██████╗ ██████╗    ███████╗ ██████╗ ██╗  ██╗██████╗  █████╗ ██╗     ██╗ ██████╗  ██████╗ ███╗   ███╗ █████╗ ██╗██╗     
//██╔════╝████╗  ██║██╔════╝ ██╔══██╗   ██╔════╝██╔════╝ ██║  ██║██╔══██╗██╔══██╗██║     ██║██╔═══██╗██╔════╝ ████╗ ████║██╔══██╗██║██║     
//█████╗  ██╔██╗ ██║██║  ███╗██████╔╝   █████╗  ██║  ███╗███████║██████╔╝███████║██║     ██║██║██╗██║██║  ███╗██╔████╔██║███████║██║██║     
//██╔══╝  ██║╚██╗██║██║   ██║██╔══██╗   ██╔══╝  ██║   ██║██╔══██║██╔══██╗██╔══██║██║     ██║██║██║██║██║   ██║██║╚██╔╝██║██╔══██║██║██║     
//███████╗██║ ╚████║╚██████╔╝██║  ██║██╗███████╗╚██████╔╝██║  ██║██████╔╝██║  ██║███████╗██║╚█║████╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██║██║███████╗
//╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚╝╚═══╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                                                                                                                          