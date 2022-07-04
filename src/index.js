import jQuery from "jquery";
import "./styles.css";
// **********************************************************************************
//        ARRAYS
// Aray with all postitions in polish
const array_position = [
  {
    text: "Doradca ds. Innowacji",
    value: "Doradca ds. Innowacji"
  },
  {
    text: "Koordynator",
    value: "Koordynator"
  },
  { text: "Kierownik Biura", value: "Kierownik Biura" },
  {
    text: "Starszy Kierownik ds. Floty i Transportu ",
    value: "Starszy Kierownik ds. Floty i Transportu "
  },
  {
    text: "Kierownik ds. Zakwaterowania ",
    value: "Kierownik ds. Zakwaterowania "
  },
  {
    text: "Starszy Specjalista ds. Zakwaterowania ",
    value: "Starszy Specjalista ds. Zakwaterowania "
  },
  {
    text: "Specjalista ds. Administracji Personalnej ",
    value: "Specjalista ds. Administracji Personalnej "
  },
  {
    text: "Kierownik Działu Administracji Personalnej ",
    value: "Kierownik Działu Administracji Personalnej "
  },
  { text: "Recepcjonista ", value: "Recepcjonista " },
  {
    text: "Specjalista ds. Controllingu ",
    value: "Specjalista ds. Controllingu "
  },
  { text: "Kierownik ds. Finansów ", value: "Kierownik ds. Finansów " },
  {
    text: "Kierownik ds. Rozwoju Biznesu ",
    value: "Kierownik ds. Rozwoju Biznesu "
  },
  { text: "Kierownik ds. Innowacji ", value: "Kierownik ds. Innowacji " },
  {
    text: "Młodszy Specjalista ds. Innowacji ",
    value: "Młodszy Specjalista ds. Innowacji "
  },
  { text: "Specjalista ds. IT ", value: "Specjalista ds. IT " },

  { text: "Starszy Programista ", value: "Starszy Programista " },
  {
    text: "Specjalista ds. Kadr i Płac ",
    value: "Specjalista ds. Kadr i Płac "
  },
  {
    text: "Starszy Specjalista ds. Kadr i Płac ",
    value: "Starszy Specjalista ds. Kadr i Płac "
  },
  {
    text: "Kierownik Działu Kadr i Płac ",
    value: "Kierownik Działu Kadr i Płac "
  },
  {
    text: "Specjalista ds. Zatrudnienia ",
    value: "Specjalista ds. Zatrudnienia "
  },
  {
    text: "Specjalista ds. Legalizacji ",
    value: "Specjalista ds. Legalizacji "
  },
  {
    text: "Starszy Specjalista ds. Legalizacji ",
    value: "Starszy Specjalista ds. Legalizacji "
  },
  {
    text: "Koordynator Personelu ",
    value: "Koordynator Personelu "
  },
  {
    text: "Starszy Koordynator Personelu ",
    value: "Starszy Koordynator Personelu "
  },
  {
    text: "Starszy Kierownik Operacyjny ",
    value: "Starszy Kierownik Operacyjny "
  },
  { text: "Specjalista ds. Rekrutacji ", value: "Specjalista ds. Rekrutacji " },
  {
    text: "Starszy Specjalista ds. Rekrutacji ",
    value: "Starszy Specjalista ds. Rekrutacji "
  },
  {
    text: "Starszy Koordynator Personelu ",
    value: "Starszy Koordynator Personelu "
  },
  { text: "Analityk Czasu Pracy ", value: "Analityk Czasu Pracy " },
  { text: "Analityk Danych ", value: "Analityk Danych " },
  {
    text: "Starszy Prawnik | Specjalista ds. zgodności ",
    value: "Starszy Prawnik | Specjalista ds. zgodności "
  },
  { text: "Kierownik ds. Rekrutacji ", value: "Kierownik ds. Rekrutacji " },

  { text: "Specjalista ds. Rekrutacji ", value: "Specjalista ds. Rekrutacji " },
  {
    text: "Starszy Specjalista ds. Rekrutacji ",
    value: "Starszy Specjalista ds. Rekrutacji "
  },
  {
    text: "Specjalista ds. Marketingu Rekrutacyjnego ",
    value: "Specjalista ds. Marketingu Rekrutacyjnego "
  },
  {
    text: "Kierownik ds. Organizacji i Administracji ",
    value: "Kierownik ds. Organizacji i Administracji "
  },
  { text: "HR Generalista ", value: "HR Generalista " },
  { text: "Kierownik Projektu ", value: "Kierownik Projektu " },
  { text: "Prezes Zarządu ", value: "Prezes Zarządu " },
  { text: "Dyrektor Zarządzający ", value: "Dyrektor Zarządzający " }
];

// Aray with all postitions in english, should match array_position 1to1
const array_positionENG = [
  "Inovation Advisor",
  "Staff Coordinator",
  "Office Manager",
  "Senior Fleet & Logistics Manager",
  "Accommodation Manager",
  "Senior Accommodation Specialist",
  "Personnel Administration Specialist",
  "Personnel Administration Manager",
  "Front Desk Receptionist",
  "Controlling Specialist",
  "Finance Manager",
  "Business Development Manager",
  "Innovation Manager",
  "Junior Innovation Specialist",
  "IT Specialist",
  "Senior Software Developer",
  "HR & Payroll Specialist",
  "Senior HR & Payroll Specialist",
  "HR & Payroll Manager",
  "Employment Specialist",
  "Legalization Specialist",
  "Senior Legalization Specialist",
  "Staff Coordinator",
  "Senior Staff Coordinator",
  "Senior Operations Manager",
  "Recruitment Specialist",
  "Senior Recruitment Specialist",
  "Senior Staff Coordinator",
  "Working Time Analyst",
  "Database Analyst",
  "Senior Lawyer | Compliance Officer",
  "Recruitment Manager",
  "Recruitment Specialist",
  "Senior Recruitment Specialist",
  "Recruitment Marketing Specialist",
  "Organization and Administration Manager",
  "HR Generalist",
  "Project Manager",
  "Chief Executive Officer",
  "Managing Director"
];

const $ = jQuery;

// **********************************************************************************
//        REGEX
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

// **********************************************************************************
//                           FUNCTIONS

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

  //New funciton for join positions in ENG

  $("#inputs select").click(function () {
    $(".position").text($(this).val());

    var searchtext = this.options[this.selectedIndex].value;
    var indexPositionSelect = indexMatchingText(array_position, searchtext);

    $(".departament").each(function () {
      $(".departament").text(array_positionENG[indexPositionSelect]);
    });
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

  //Generate option list form Array of positions
  const selectBox = document.querySelector("select");

  for (const o of array_position) {
    const { text, value, selected } = o;
    selectBox.options.add(new Option(text, value, selected, selected));
  }
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
// Find what index select position have

function indexMatchingText(ele, text) {
  const result3 = ele.length;

  for (var i = 0; i < result3; i++) {
    console.log(ele[i]);
    if (ele[i].text === text) {
      console.log(text);
      return i;
    }
  }
  return undefined;
}
