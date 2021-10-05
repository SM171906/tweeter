$(document).ready(function () {
    $("#tweet-text").keyup(function () {
      let length = $(this).val().length;
      let max = 140;
      //$(".counter").val(length);
      $(this).parent().find("output").text(140 - length); 
     if(length > 140){
       //alert(length);
       $(this).parent().find("output").css({"color": "red"});
     }
    });
  });
  
