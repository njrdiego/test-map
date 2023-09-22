const request_type = ["NDA", "DSA"];
const request_type_category = [
  "LGUs",
  "NGAs",
  "GOCC",
  "Academe",
  "OBSUs",
  "TOTAL",
];

const REGION_LIST = ["REGION I", "REGION II"];

$(function () {
  populate_dashboard(sample_data);
});

function populate_dashboard(_data) {
  populate_table_header(_data);
  populate_table_body(_data);
}

function populate_table_header(_data) {
  $("#table-dashboard-regional > thead").html("");
  const request_type_length = request_type.length;
  const request_type_cat_length = request_type_category.length;

  let thead_append_type_default = "";
  request_type.forEach((el) => {
    thead_append_type_default +=
      "<th colspan='" +
      request_type_cat_length +
      "' class='text-center'>" +
      el +
      "</th>";
  });
  thead_append_type_default += "";

  let thead_append_type_cat_default = "";
  request_type_category.forEach((el) => {
    const hidden_class = el != "TOTAL" ? "hidden_class" : "";
    thead_append_type_cat_default +=
      "<th class='" + hidden_class + "'>" + el + "</th>";
  });
  thead_append_type_cat_default += "";

  let thead_append_year = "<tr>";
  let thead_append_month = "<tr>";
  let thead_append_type = "<tr>";
  let thead_append_type_cat = "<tr>";

  // FOR REGION HEADER
  thead_append_year +=
    "<th rowspan='4' colspan='1' class='text-center align-middle'> REGION</th>";

  for (const [key, value] of Object.entries(_data)) {
    // console.log(key, value);
    const colspan_count =
      value.length * request_type_length * request_type_cat_length;
    value.forEach((el) => {
      // POPULATE 2ND ROW HEADER
      thead_append_month +=
        "<th colspan=" +
        request_type_length * request_type_cat_length +
        " class='text-center'>" +
        el.month +
        "</th>";
      // POPULATE 3RD ROW HEADER
      thead_append_type += thead_append_type_default;
      // POPULATE 4TH ROW HEADER
      request_type.forEach((el) => {
        thead_append_type_cat += thead_append_type_cat_default;
      });
    });
    // POPULATE 1ST ROW HEADER
    thead_append_year +=
      "<th colspan=" + colspan_count + " class='text-center'>" + key + "</th>";
  }
  thead_append_year += "</tr>";
  thead_append_month += "</tr>";
  thead_append_type += "</tr>";
  thead_append_type_cat += "</tr>";
  $("#table-dashboard-regional > thead").append(thead_append_year);
  $("#table-dashboard-regional > thead").append(thead_append_month);
  $("#table-dashboard-regional > thead").append(thead_append_type);
  $("#table-dashboard-regional > thead").append(thead_append_type_cat);
}

function populate_table_body(_data) {
  $("#table-dashboard-regional > tbody").html("");

  let tbody_append_arr = [];

  REGION_LIST.forEach((el) => {
    tbody_append_arr[el] = "<tr><td>" + el + "</td>";
  });

  for (const [key, value] of Object.entries(_data)) {
    console.log(key, value);

    value.forEach((el) => {
      el.data.forEach((el_month) => {
        // console.log(el_month.region);

        // el_month.nda.forEach((nda_data) => {
        //   console.log(nda_data);
        // });
        for (const [k, v] of Object.entries(el_month.nda)) {
          console.log("NDA", k, v);
          const hidden_class = k != "total" ? "hidden_class" : "";
          tbody_append_arr[el_month.region] +=
            "<td class='" + hidden_class + "'>" + v + "</td>";
        }

        for (const [k, v] of Object.entries(el_month.dsa)) {
          console.log("DSA", k, v);
          const hidden_class = k != "total" ? "hidden_class" : "";
          tbody_append_arr[el_month.region] +=
            "<td class='" + hidden_class + "'>" + v + "</td>";
        }
      });
    });
  }
  for (const [k, v] of Object.entries(tbody_append_arr)) {
    // console.log(v);
    const for_append_row = v + "</tr>";
    $("#table-dashboard-regional > tbody").append(for_append_row);
  }
  // console.log(tbody_append_arr);
}
