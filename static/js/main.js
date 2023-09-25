let shade_guide = ["#D6EAF8", "#AED6F1", "#85C1E9", "#5DADE2", "#3498DB"];
var iLoad = 0;
var scroll_var = 0;
var start_scroll = false;
const json_data = [
  {
    REGION: "CAR",
    "TOTAL HOUSEHOLDS ASSESSED": "268141",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "46702",
    id: "r140000000",
    name: "CORDILLERA ADMINISTRATIVE REGION (CAR)",
  },
  {
    REGION: "NCR",
    "TOTAL HOUSEHOLDS ASSESSED": "711703",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "112107",
    id: "r130000000",
    name: "NATIONAL CAPITAL REGION (NCR)",
  },
  {
    REGION: "I",
    "TOTAL HOUSEHOLDS ASSESSED": "973255",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "184263",
    id: "r010000000",
    name: "REGION I - ILOCOS REGION",
  },
  {
    REGION: "II",
    "TOTAL HOUSEHOLDS ASSESSED": "693984",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "148140",
    id: "r020000000",
    name: "REGION II - CAGAYAN VALLEY",
  },
  {
    REGION: "III",
    "TOTAL HOUSEHOLDS ASSESSED": "1512928",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "270456",
    id: "r030000000",
    name: "REGION III - CENTRAL LUZON",
  },
  {
    REGION: "CALABARZON",
    "TOTAL HOUSEHOLDS ASSESSED": "1568137",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "410196",
    id: "r040000000",
    name: "REGION IV-A - CALABARZON",
  },
  {
    REGION: "MIMAROPA",
    "TOTAL HOUSEHOLDS ASSESSED": "651884",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "193467",
    id: "r170000000",
    name: "MIMAROPA REGION",
  },
  {
    REGION: "V",
    "TOTAL HOUSEHOLDS ASSESSED": "1162476",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "541137",
    id: "r050000000",
    name: "REGION V - BICOL REGION",
  },
  {
    REGION: "VI",
    "TOTAL HOUSEHOLDS ASSESSED": "1394251",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "536829",
    id: "r060000000",
    name: "REGION VI - WESTERN VISAYAS",
  },
  {
    REGION: "VII",
    "TOTAL HOUSEHOLDS ASSESSED": "1078079",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "453961",
    id: "r070000000",
    name: "REGION VII - CENTRAL VISAYAS",
  },
  {
    REGION: "VIII",
    "TOTAL HOUSEHOLDS ASSESSED": "848662",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "365086",
    id: "r080000000",
    name: "REGION VIII - EASTERN VISAYAS",
  },
  {
    REGION: "IX",
    "TOTAL HOUSEHOLDS ASSESSED": "706844",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "375070",
    id: "r090000000",
    name: "REGION IX - ZAMBOANGA PENINSULA",
  },
  {
    REGION: "X",
    "TOTAL HOUSEHOLDS ASSESSED": "899290",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "385293",
    id: "r100000000",
    name: "REGION X - NORTHERN MINDANAO",
  },
  {
    REGION: "XI",
    "TOTAL HOUSEHOLDS ASSESSED": "900379",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "332300",
    id: "r110000000",
    name: "REGION XI - DAVAO REGION",
  },
  {
    REGION: "XII",
    "TOTAL HOUSEHOLDS ASSESSED": "867465",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "467653",
    id: "r120000000",
    name: "REGION XII - SOCCSKSARGEN",
  },
  {
    REGION: "Caraga",
    "TOTAL HOUSEHOLDS ASSESSED": "536836",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "267096",
    id: "r160000000",
    name: "REGION XIII - CARAGA",
  },
  // {
  //   REGION: "ARMM BST",
  //   "TOTAL HOUSEHOLDS ASSESSED": "326618",
  //   "TOTAL IDENTIFIED POOR HOUSEHOLDS": "226057",
  //   id: "r210000000",
  //   name: "ARMM - BaSulTa",
  // },
  // {
  //   REGION: "ARMM LaMa",
  //   "TOTAL HOUSEHOLDS ASSESSED": "386723",
  //   "TOTAL IDENTIFIED POOR HOUSEHOLDS": "283278",
  //   id: "r200000000",
  //   name: "ARMM - LaMa",
  // },
  {
    REGION: "BARMM",
    "TOTAL HOUSEHOLDS ASSESSED": "713341",
    "TOTAL IDENTIFIED POOR HOUSEHOLDS": "509335",
    id: "r150000000",
    name: "BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO (BARMM)",
  },
];

// window.onbeforeunload = function () {
//   $("html, body").animate({ scrollTop: 0 }, "fast");
// };

$(function () {
  // scroll_var = 0;

  $("#svg-geo path").css("stroke-dashoffset", "100000");
  $("#svg-geo path").css("stroke", "#566573");
  $("#svg-geo path").css("fill-opacity", "0");
  run_number();

  let run_now_again = false;
  let visible_span_poor_count = false;
  let is_page_loaded = false;
  let is_scroll_top = false;
  let is_visible_span = true;
});

$(document.body).on("click", "#span-urb-rural", function () {
  load_urb_rural_chart();
  $("#modal-urb-rural").show();
});

$(document.body).on("click", "#span-reg-breakdown", function () {
  $("#modal-reg-breakdown").show();
  let sorted_data = sort_json_data_desc(json_data, "TOTAL HOUSEHOLDS ASSESSED");
  load_reg_breakdown_chart(sorted_data, "data-all");

  // "TOTAL HOUSEHOLDS ASSESSED"
});

$(document.body).on("click", ".btn-close-modal", function () {
  $(".modal").hide();
});

$(document.body).on("click", "#div-assessed-btn", function () {
  let sorted_data = sort_json_data_desc(json_data, "TOTAL HOUSEHOLDS ASSESSED");
  load_reg_breakdown_chart(sorted_data, "assessed-only");
});

$(document.body).on("click", "#div-poor-btn", function () {
  let sorted_data = sort_json_data_desc(
    json_data,
    "TOTAL IDENTIFIED POOR HOUSEHOLDS"
  );
  load_reg_breakdown_chart(sorted_data, "poor-only");
});

$(document.body).on("click", "#div-total-btn", function () {
  let sorted_data = sort_json_data_desc(json_data, "TOTAL HOUSEHOLDS ASSESSED");
  load_reg_breakdown_chart(sorted_data, "data-all");
});

// const dougnutColors = [
//   "#2c4d87",
//   "#335899",
//   "#3e65ab",
//   "#3f6ab7",
//   "#4472c4",
//   "#7991ce",
//   "#9aaad7",
//   "#b3bedf",
//   "#c9d0e7",
// ];

const dougnutColors = ["#4472c4", "#5dade2"];
const barColor = ["#161f6e", "#d30023"];

function load_urb_rural_chart() {
  let iUrban = 0;
  let i = 0;
  urb = setInterval(function () {
    iUrban = iUrban + 82978;

    if (iUrban > 1659568) {
      $("#span-urban-poor").html(numberWithCommas("1,659,568"));
      clearInterval(urb);
    } else {
      $("#span-urban-poor").html(numberWithCommas(iUrban));
    }
  }, 50);

  let iRural = 0;
  rur = setInterval(function () {
    iRural = iRural + 228492;

    if (iRural > 3939523) {
      $("#span-rural-poor").html(numberWithCommas("3,939,523"));
      clearInterval(rur);
    } else {
      $("#span-rural-poor").html(numberWithCommas(iRural));
    }
  }, 50);

  $("#cv-urb-rural").remove(); // this is my <canvas> element
  $("#cont-urb-rural").append('<canvas id="cv-urb-rural"></canvas>');
  var dataLabels = ["RURAL AREAS", "URBAN AREAS"];
  var dataCounts = [4018209, 1232985];

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: "URBAN POOR VS. RURAL POOR",
        data: dataCounts,
        backgroundColor: dougnutColors,
        hoverOffset: 0,
        datalabels: {
          display: false,
          color: "#f3f3f3",
          backgroundColor: "#4d4d4d",
          padding: 1,
          //   formatter: function (value, context) {
          //     return value + "%";
          //   },
          alignment: "center",
          clamp: true,
        },
      },
    ],
  };

  var canvas = document.getElementById("cv-urb-rural");
  var ctx = canvas.getContext("2d");

  new Chart("cv-urb-rural", {
    responsive: true,
    type: "doughnut",
    data: data,
    options: {
      cutout: "50%",
      plugins: {
        legend: {
          display: false,
          position: "bottom",
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

function sort_json_data_asc(_data, _sortby) {
  _data.sort(function (a, b) {
    return a[_sortby] - b[_sortby];
  });
  return _data;
}

function sort_json_data_desc(_data, _sortby) {
  _data.sort(function (a, b) {
    return b[_sortby] - a[_sortby];
  });
  return _data;
}

function load_reg_breakdown_chart(_data, _data_show) {
  $("#cv-reg-breakdown").remove(); // this is my <canvas> element
  $("#cont-reg-breakdown").append('<canvas id="cv-reg-breakdown"></canvas>');
  var dataLabels = [];
  var arr_poor_hh = [];
  var arr_assessed_hh = [];

  // let allpoor = 0;
  // let allassessed = 0;

  _data.forEach((el) => {
    poor_hh = parseInt(el["TOTAL IDENTIFIED POOR HOUSEHOLDS"].replace(",", ""));
    assessed_hh = parseInt(el["TOTAL HOUSEHOLDS ASSESSED"].replace(",", ""));
    arr_poor_hh.push(poor_hh);
    arr_assessed_hh.push(assessed_hh);
    dataLabels.push(el["REGION"]);
    // allpoor += poor_hh;
    // allassessed += assessed_hh;
  });
  // console.log(allpoor);
  // console.log(allassessed);

  let datasets = [
    {
      label: "Assessed",
      data: arr_assessed_hh,
      borderColor: dougnutColors[0],
      backgroundColor: dougnutColors[0],
      datalabels: {
        color: dougnutColors[0],
        align: "end",
        clamp: true,
        anchor: "end",
        padding: 2,
        font: { size: "12px" },
        formatter: function (value, context) {
          return value.toLocaleString();
        },
      },
    },
    {
      label: "Poor",
      data: arr_poor_hh,
      borderColor: dougnutColors[1],
      backgroundColor: dougnutColors[1],
      datalabels: {
        color: dougnutColors[1],
        align: "end",
        clamp: true,
        anchor: "end",
        padding: 2,
        font: { size: "12px" },
        formatter: function (value, context) {
          return value.toLocaleString();
        },
      },
    },
  ];
  if (_data_show == "assessed-only") {
    datasets = [datasets[0]];
  } else if (_data_show == "poor-only") {
    datasets = [datasets[1]];
  }

  let data = {
    labels: dataLabels,
    datasets: datasets,
  };

  var canvas = document.getElementById("cv-reg-breakdown");
  var ctx = canvas.getContext("2d");

  // new Chart("cv-reg-breakdown", {
  new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 0,

          ticks: {
            precision: 0,
            font: {
              size: 15,
              weight: "bold",
            },
          },
          grid: {
            display: false,
          },
        },
        x: {
          ticks: {
            precision: 0,
            padding: 20,
          },
          grid: {
            display: false,
          },
        },
      },

      plugins: {
        legend: {
          display: false,
          position: "bottom",
        },
      },
      layout: {
        padding: 20,
      },
    },
    plugins: [ChartDataLabels],
  });
}

$(document.body).on("mouseover click", "#svg-geo path", function () {
  $("#svg-geo path").css("opacity", "1");
  selectedId = this.id;
  //   console.log(selectedId);

  $("#" + selectedId).css("opacity", ".3");
  var selected_data = [];
  var selectedRegionName = "";
  json_data.forEach((el) => {
    if (el["id"] == selectedId) {
      selected_data = el;
      selectedRegionName = selected_data["REGION"];
      el.poor_hh = parseInt(
        el["TOTAL IDENTIFIED POOR HOUSEHOLDS"].replace(",", "")
      );
      el.assessed_hh = parseInt(
        el["TOTAL HOUSEHOLDS ASSESSED"].replace(",", "")
      );
    }
  });
  // createTippy(this.id, selectedRegionName, selected_data);
  createSvgLegend(selected_data);
});

$(document.body).on("mouseleave", "#svg-geo path", function () {
  $("#svg-geo path").css("opacity", "1");
  $(".div-svg-tooltip").hide();
});

function createTippy(id, label, data) {
  var initialTippy = tippy(document.querySelector("#svg-geo2 #" + id));

  // content = "<i>" + content + "</i>";
  var content =
    '<div class="div-table-tooltip text-center m-1 p-1">' +
    '<div class="d-flex align-items-center justify-content-center p-1">' +
    '<span class="span-tooltip-header">' +
    data.name +
    "</span>" +
    "</div><hr style='margin: 4px; color: black;'>" +
    "</div>" +
    "<div class='d-flex flex-row justify-content-center align-items-center px-1 pt-1'>" +
    "<div><img src='static/img/icon-2.png' class='img img-icon'/></div>" +
    "<div class='text-start span-l3-blue' style='width:240px'>" +
    "<span>&nbsp;&nbsp;ASSESSED HOUSEHOLDS:</span>" +
    "</div>" +
    "<div class='text-center span-l3-blue' style='width:100px'>" +
    numberWithCommas(data["TOTAL HOUSEHOLDS ASSESSED"]) +
    "</div>" +
    "</div>" +
    "<div class='d-flex flex-row justify-content-center align-items-center p-1'>" +
    "<div><img src='static/img/icon-1.png' class='img-icon'/></div>" +
    "<div class='text-start' style='width:240px'>" +
    "<span>&nbsp;&nbsp;POOR HOUSEHOLDS:</span>" +
    "</div>" +
    "<div class='text-center' style='width:100px' >" +
    numberWithCommas(data["TOTAL IDENTIFIED POOR HOUSEHOLDS"]) +
    "</div>" +
    "</div>" +
    "</div>";
  initialTippy.setProps({
    content: content,
    allowHTML: true,
    arrow: false,
    placement: "auto",
    followCursor: true,
    hideOnClick: false,
    animateFill: false,
    delay: 0,
    theme: "listahanan",
    maxWidth: "500",
  });
}

function createSvgLegend(data) {
  $(".span-tooltip-header-2").html("NATIONAL");
  $(".span-tooltip-header-2").html(data.name);
  $("#span-tooltip-assessed").html(
    numberWithCommas(data["TOTAL HOUSEHOLDS ASSESSED"])
  );
  $("#span-tooltip-poor").html(
    numberWithCommas(data["TOTAL IDENTIFIED POOR HOUSEHOLDS"])
  );
  $(".div-svg-tooltip").show();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var shaded = false;
function run_number() {
  $("#span-poor-count").html(numberWithCommas("0"));
  $("#span-assessed-count").html(numberWithCommas("0"));

  $("#svg-geo path").css("animation", "none");
  $("#svg-geo2 path").css("animation", "none");
  // shaded = false;
  const poorHouseholds = 5599091;
  const assessedHouseholds = 11599091;
  const timerDividend = 15;
  iLoad = 0;
  y = setInterval(function () {
    iLoad = iLoad + poorHouseholds / timerDividend;

    if (iLoad > poorHouseholds) {
      // console.log(5599091);

      $("#span-poor-count").html(numberWithCommas(poorHouseholds));
      // if (!shaded) {
      shade_geo();
      // }
      // clearInterval(y);
    } else {
      $("#span-poor-count").html(numberWithCommas(parseInt(iLoad)));
    }
  }, 100);

  iLoad2 = 0;
  x = setInterval(function () {
    iLoad2 = iLoad2 + assessedHouseholds / timerDividend;
    if (iLoad2 > assessedHouseholds) {
      $("#span-assessed-count").html(numberWithCommas(11599091));
    } else {
      $("#span-assessed-count").html(numberWithCommas(parseInt(iLoad2)));
    }
  }, 100);
}

function shade_geo() {
  $("#svg-geo path").css("animation", "pathAnimate2 .5s linear forwards");
  $("#svg-geo2 path").css("animation", "pathAnimate2 .5s linear forwards");
  // shaded = true;
}
function checkVisible(elm, evalType) {
  evalType = evalType || "visible";

  var vpH = $(window).height(), // Viewport Height
    st = $(window).scrollTop(), // Scroll Top
    y = $(elm).offset().top,
    elementHeight = $(elm).height();

  if (evalType === "visible") return y < vpH + st && y > st - elementHeight;
  if (evalType === "above") return y < vpH + st;
}

function isOnScreen(element) {
  var curPos = element.offset();
  var curTop = curPos.top;
  var screenHeight = $(window).height();
  return curTop > screenHeight ? false : true;
}

$(document.body).on("mouseover click", "#svg-geo2 path", function () {
  $("#svg-geo2 path").css("opacity", "1");
  selectedId = this.id;
  // console.log(selectedId);

  $("#" + selectedId).css("opacity", ".3");
  var selected_data = [];
  var selectedRegionName = "";
  json_data.forEach((el) => {
    if (el["id"].substring(1) == selectedId.substring(1)) {
      selected_data = el;
      selectedRegionName = selected_data["REGION"];
      el.poor_hh = parseInt(
        el["TOTAL IDENTIFIED POOR HOUSEHOLDS"].replace(",", "")
      );
      el.assessed_hh = parseInt(
        el["TOTAL HOUSEHOLDS ASSESSED"].replace(",", "")
      );
    }
  });
  // console.log(this.id);
  // console.log(selectedRegionName);
  // console.log(selected_data);
  createTippy(this.id, selectedRegionName, selected_data);
});

$(document.body).on("mouseleave", "#svg-geo2 path", function () {
  $("#svg-geo2 path").css("opacity", "1");
});
