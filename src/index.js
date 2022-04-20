import jQuery from "jquery";
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Generator stopek 2022</h1>
<div>
   Na tej stronie znajdziesz informacje jak krok po kroku zainstalować piękną stopkę.
</div>
`;

const $ = jQuery;

function selectText(elementId) {
  const node = document.getElementById(elementId);
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  var ok = document.execCommand("copy");
  if (ok) {
    $(`.select.${elementId}`).text("Skopiowano");
    // $(`.select.${elementId}`).style.background = "#3BC14A";
    selection.removeAllRanges();
  }
}

$(".controls > .select").click(function () {
  var signatureId = $(this).parent().data("sig");
  selectText(signatureId);
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
  var input = $(this).attr("id");
  var val = $(this).val();
  $("." + input).html(val);

  if (input === "name" || "surname") {
    const name = $("#name").val();
    const surname = $("#surname").val();
    const email = `${name}.${surname}`.toLocaleLowerCase("en");

    $(".email").each(function () {
      const domain = $(this).data("domain") || "";
      $(this).text(`${email}@${domain}`);
      $(this).attr("href", `mailto:${email}@${domain}`);
    });
  }
  $(".controls > a").hide();
  $(".controls > .save").show();
});

$(document).ready(function () {
  $("#inputs input").keyup(function () {
    $(this).attr("size", $(this).val().length);
  });
});
