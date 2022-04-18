import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Generator stopek 2022</h1>
<div>
   Na tej stronie znajdziesz informacje jak krok po kroku zainstalować piękną stopkę.
</div>
`;

function SelectText(element) {
  var doc = document;
  var text = doc.getElementById(element);
  if (doc.body.createTextRange) {
    // ms
    var range = doc.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection();
    range = doc.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

$(".controls > .select").click(function () {
  var signature_id = $($(this).parents(".controls")[0]).data("sig");
  SelectText($("#" + signature_id)[0]);
});

$(".controls > .save").click(function () {
  var link = $(this).siblings("a")[0];
  var sig_div = $(
    "#" + $(this).parents(".controls").data("sig") + "_container"
  );
  var sig_html = $(sig_div).html();
  $(link).attr("href", "data:text/html, " + sig_html);
  $(this).hide();
  $(link).show();
});

// update per inputs
$("#inputs input").keyup(function () {
  alert("Handler for .keyup() called.");
  var input = $(this).attr("id");
  var val = $(this).val();
  $("." + input).html(val);
  if (input == "email") {
    $(".email").attr("href", "mailto:" + val);
  }
  $(".controls > a").hide();
  $(".controls > .save").show();
});
