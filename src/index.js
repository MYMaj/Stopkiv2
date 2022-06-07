import jQuery from "jquery";
import "./styles.css";

const $ = jQuery;
var tagBody = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*";

var tagOrComment = new RegExp(
  "<(?:" +
    // Comment body.
    "!--(?:(?:-*[^->])*--+|-?)" +
    // Special "raw text" elements whose content should be elided.
    "|script\\b" +
    tagBody +
    ">[\\s\\S]*?</script\\s*" +
    "|style\\b" +
    tagBody +
    ">[\\s\\S]*?</style\\s*" +
    // Regular name
    "|/?[a-z]" +
    tagBody +
    ")>",
  "gi"
);

var invalidChars = [
  "+",
  ".",
  ",",
  "!",
  " ",
  "?",
  "(",
  ")",
  ";",
  "}",
  "{",
  ";",
  ":",
  "@",
  "$",
  "%",
  "&",
  "'",
  "=",
  "$"
];

// Fucntion to select ranges and copy signature by button
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

    $(`.select.${elementId}`).css("background", "green");
    selection.removeAllRanges();
  }
}

// Main Fucntion to wait until page is loaded
$(document).ready(function () {
  // Fucntion button Copy to clipboard
  $(".controls > .select").click(function () {
    var signatureId = $(this).parent().data("sig");
    selectText(signatureId);
  });

  // Fucntion button Save HTML
  $(".controls > .save").click(function () {
    var link = $(this).siblings("a")[0];

    var sig_div = $("#" + $(this).parents(".controls").data("sig"));
    var sig_html = $(sig_div).html();

    //$(link).attr("href", "data:text/html, " + sig_html + ";charset=utf-8,");
    $(link).attr("href", "data:text/html,  " + encodeURIComponent(sig_html));
    $(this).hide();
    $(link).show();
  });

  // Function of selected position to value
  $("#inputs select").click(function () {
    $(".position").text($(this).val());
    var optionsPosition = $(this).val();

    if (optionsPosition === "Doradca ds. Innowacji") {
      $(".departament").each(function () {
        $(".departament").text(`Innovation Specialist`);
      });
    }
  });

  // Main function with assignig input to values
  //Checking, regex,
  $("#inputs input").keyup(function (e) {
    var input = $(this).attr("id");
    var val = $(this).val();

    // safe function, sanitization of tags
    val = removeTags(val);

    //Checking for erros in inputs
    if (!isNaN($("#name").val()) || !isNaN($("#surname").val())) {
      errorMessage("Imię/Nazwisko nie może zawierać cyfr");
      e.preventDefault();
    } else {
      errorMessage("");
    }
    if ($(this).val().length >= 25) {
      errorMessage("Za długi ciąg znaków");
      e.preventDefault();
    } else {
      errorMessage("");
    }
    $("." + input).html(val);

    if (input === "name" || "surname") {
      const name = $("#name").val();
      const surname = $("#surname").val();
      let emailTemp = name + "." + surname;
      // Delete polish dialect from email
      emailTemp = emailTemp.replace(/ą/i, "a");
      emailTemp = emailTemp.replace(/ć/i, "c");
      emailTemp = emailTemp.replace(/ę/i, "e");
      emailTemp = emailTemp.replace(/ż/i, "z");
      emailTemp = emailTemp.replace(/ź/i, "z");
      emailTemp = emailTemp.replace(/ł/i, "l");
      emailTemp = emailTemp.replace(/ó/i, "o");
      emailTemp = emailTemp.replace(/n/i, "n");

      const email = emailTemp.toLocaleLowerCase("en-US");

      $(".email").each(function () {
        const domain = $(this).data("domain") || "";
        $(this).text(`${email}@${domain}`);
        $(this).attr("href", `mailto:${email}@${domain}`);
      });
    }

    if (input === "phone") {
      $(".phone").each(function () {
        var optionsPhoneCode = document.getElementById("code");
        var selectPhoneCode =
          optionsPhoneCode.options[optionsPhoneCode.selectedIndex].value;

        var phone = $("#phone").val();
        if (isNaN($("#phone").val())) {
          // Changing content and color of content
          errorMessage("Usuń znaki inne niż cyfry");
        }
        var PhoneTemp = phone;
        PhoneTemp = PhoneTemp.trim();
        PhoneTemp = PhoneTemp.replace(/\s/g, "");

        if (selectPhoneCode === "+48" && PhoneTemp.length >= 3) {
          let slicePL1 = PhoneTemp.substr(0, 3);
          let slicePL2 = PhoneTemp.substr(3, 3);
          let slicePL3 = PhoneTemp.substr(6, 3);
          let slicePL = slicePL1 + " " + slicePL2 + " " + slicePL3;

          PhoneTemp = slicePL;
        }
        if (selectPhoneCode === "+38" && PhoneTemp.length >= 3) {
          let slicePL1 = PhoneTemp.substr(0, 3);
          let slicePL2 = PhoneTemp.substr(3, 3);
          let slicePL3 = PhoneTemp.substr(6, 2);
          let slicePL4 = PhoneTemp.substr(8, 2);
          let slicePL =
            slicePL1 + " " + slicePL2 + " " + slicePL3 + " " + slicePL4;

          PhoneTemp = slicePL;
        }
        phone = PhoneTemp;
        let codePhone = selectPhoneCode + " " + phone;
        //console.log(codePhone);
        $(this).prop("href", "tel:" + codePhone);
        $(this).text(codePhone);
      });
    }

    $(".controls > a").hide();
    $(".controls > .save").show();
  });
  /*// Function to resize unput width 
  $("#inputs input").keyup(function () {
    $(this).attr("size", $(this).val().length);
  });
*/
});
// Function to check for html tags in input
function removeTags(html) {
  var oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, "");
  } while (html !== oldHtml);
  return html.replace(/</g, "&lt;");
}

// Function to display error massage set by place
function errorMessage(messageERR) {
  var errorEN = document.getElementById("error1");
  errorEN.textContent = messageERR;
  errorEN.style.color = "red";
}
// Function to block invalid chars in input
$("#inputs input").keydown(function (e) {
  //Chceck for input invalid chars

  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  } else {
  }
});
// Not Worknig. Function to sanitize paste event

$("#name").bind("paste", function () {
  //var input = $(this).attr("id");

  setTimeout(function () {
    //get the value of the input text
    var val = $("#name").val();
    console.log(val);
    //replace the special characters to ''
    var dataFull = val.replace(/[\d\\()"'.,/#@$% ]/gi, "");

    //set the new value of the input text without special characters
    $("#name").val(dataFull);
  });
});

$("#surname").bind("paste", function () {
  //var input = $(this).attr("id");

  setTimeout(function () {
    //get the value of the input text
    var val = $("#surname").val();
    console.log(val);
    //replace the special characters to ''
    var dataFull = val.replace(/[\d\\()"'.,/#@$% ]/gi, "");

    //set the new value of the input text without special characters
    $("#surname").val(dataFull);
  });
});

$("#phone").bind("paste", function () {
  //var input = $(this).attr("id");

  setTimeout(function () {
    //get the value of the input text
    var val = $("#phone").val();
    console.log(val);
    //replace the special characters to ''
    var dataFull = val.replace(/[\D]/gi, "");

    //set the new value of the input text without special characters
    $("#phone").val(dataFull);
  });
});
