import jQuery from "jquery";
import "./styles.css";

//document.getElementById("app").innerHTML = `

//`;

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

// Funkcja przycisku kopiuj
$(".controls > .select").click(function () {
  var signatureId = $(this).parent().data("sig");
  selectText(signatureId);
});

// Funkcja zapisz plik do HTML
$(".controls > .save").click(function () {
  var link = $(this).siblings("a")[0];

  var sig_div = $("#" + $(this).parents(".controls").data("sig"));
  var sig_html = $(sig_div).html();
  console.log(sig_div);
  //$(link).attr("href", "data:text/html, " + sig_html + ";charset=utf-8,");
  $(link).attr("href", "data:text/html,  " + encodeURIComponent(sig_html));
  $(this).hide();
  $(link).show();
});

// Funkcja łączenia stanowiska ze stanowiskiem po angielsku
$("#inputs select").click(function () {
  var select = $(this).attr("id");
  var val = $(this).val();
  $("." + select).html(val);
  if (select === "position") {
    var optionsPosition = document.getElementById("position");
    var selectPosition =
      optionsPosition.options[optionsPosition.selectedIndex].value;
    console.log(selectPosition);

    if (selectPosition === "Doradca ds. Innowacji") {
      $(".departament").each(function () {
        $(".departament").text(`Innovation Specialist`);

        // console.log($(".departament").text(`Doradca ds. Innoaaawacji`));
      });
    }
  }
});
// Odswiezanie wpisywania znaków
$("#inputs input").keyup(function () {
  var input = $(this).attr("id");
  var val = $(this).val();

  $("." + input).html(val);

  if (input === "name" || "surname") {
    const name = $("#name").val();
    const surname = $("#surname").val();
    let emailTemp = name + "." + surname;
    // var reg = new RegExp("[ąćężźłóń]+", "i");
    emailTemp = emailTemp.replace(/ą/i, "a");
    emailTemp = emailTemp.replace(/ć/i, "c");
    emailTemp = emailTemp.replace(/ę/i, "e");
    emailTemp = emailTemp.replace(/ż/i, "z");
    emailTemp = emailTemp.replace(/ź/i, "z");
    emailTemp = emailTemp.replace(/ł/i, "l");
    emailTemp = emailTemp.replace(/ó/i, "o");
    emailTemp = emailTemp.replace(/n/i, "n");

    const email = emailTemp.toLocaleLowerCase("en-US");
    // const email = `${name}.${surname}`.toLocaleLowerCase("en-US");

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
      console.log(selectPhoneCode);
      var phone = $("#phone").val();
      var PhoneTemp = phone;
      PhoneTemp = PhoneTemp.trim();
      PhoneTemp = PhoneTemp.replace(/\s/g, "");
      if (selectPhoneCode === "+48" && PhoneTemp.length >= 3) {
        let slicePL1 = PhoneTemp.substr(0, 3);
        let slicePL2 = PhoneTemp.substr(3, 3);
        let slicePL3 = PhoneTemp.substr(6, 3);
        let slicePL = slicePL1 + " " + slicePL2 + " " + slicePL3;

        PhoneTemp = slicePL;
        console.log(slicePL);
      }
      if (selectPhoneCode === "+38" && PhoneTemp.length >= 3) {
        let slicePL1 = PhoneTemp.substr(0, 3);
        let slicePL2 = PhoneTemp.substr(3, 3);
        let slicePL3 = PhoneTemp.substr(6, 2);
        let slicePL4 = PhoneTemp.substr(8, 2);
        let slicePL =
          slicePL1 + " " + slicePL2 + " " + slicePL3 + " " + slicePL4;

        PhoneTemp = slicePL;
        console.log(slicePL);
      }
      phone = PhoneTemp;
      let codePhone = selectPhoneCode + " " + phone;
      //console.log(codePhone);
      $(this).text(codePhone);
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

var data = {
  position: [
    {
      name: "China",
      childs: [
        {
          name: "Beijing"
        },
        {
          name: "Tianjin",
          childs: [{ name: "Guangzhou" }, { name: "Shanghai" }]
        }
      ]
    },
    {
      name: "India",
      childs: [
        {
          name: "Uttar",
          childs: [{ name: "Kanpur" }, { name: "Ghaziabad" }]
        },
        {
          name: "Maharashtra",
          childs: [{ name: "Mumbai" }, { name: "Pune" }]
        }
      ]
    },
    {
      name: "USA",
      childs: [
        {
          name: "Washington",
          childs: [{ name: "Washington" }, { name: "Seatle" }]
        },
        {
          name: "Florida",
          childs: [{ name: "Orlando" }, { name: "Miamy" }]
        }
      ]
    }
  ]
};

function buildSelect(name, data, childs) {
  var div = $("<div>");
  div.addClass("hidden autoSelect " + data.name + " " + name);
  var label = $("<label>");
  label.text(name);
  var select = $("<select>");
  var option = $("<option>");
  option.text("--");
  select.append(option);
  data.childs.forEach(function (child) {
    option = $("<option>");
    option.val(child.name);
    option.text(child.name);
    select.append(option);
  });
  if (childs) select.on("change", updateCities);
  label.append(select);
  div.append(label);
  $(".country").append(div);
}

function buildForms(data) {
  data.countries.forEach(function (country) {
    buildSelect("State", country, true);
    country.childs.forEach(function (state) {
      buildSelect("City", state);
    });
  });
}

function hideAutoSelect(name) {
  $("div.autoSelect." + name).addClass("hidden");
}

function updateStates() {
  var v = this.value;
  if (v) {
    hideAutoSelect("State");
    hideAutoSelect("City");
    var div = $("div.autoSelect." + v);
    div.removeClass("hidden");
    var select = $("select", div);
    if (select.val()) $("div.autoSelect." + select.val()).removeClass("hidden");
  }
}

function updateCities() {
  var v = $(this).val();
  if (v) {
    hideAutoSelect("City");
    $("div.autoSelect." + v).removeClass("hidden");
  }
}

$(document).on("ready", function () {
  buildForms(data);
  $("[name=country]").on("change", updateStates);
});
