$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let length = $(this).val().length;
    $(this).parent().find("output").text(140 - length);
    if (length > 140) {
      $(this).parent().find("output").css({ "color": "red" });
      $(".longLength").show();
    } else {
      $(this).parent().find("output").css({ "color": "#545149" });
      $(".longLength").hide();
    }
  });
});

