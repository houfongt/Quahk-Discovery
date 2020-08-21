// define all the elements
let backForm1Btn = $("#backForm1Btn"),
  loaderWrapper = $(".loader-wrapper"),
  form2Options = document.getElementById("form2OptionsId"),
  toform3Btn = document.getElementById("form2Next"),
  toForm2Btn = document.getElementById("form1Next"),
  form2 = document.getElementsByClassName("form2")[0],
  form1 = document.getElementsByClassName("form1")[0],
  formCancelBtn = document.getElementById("formCancelBtn");

// back to form 1
backForm1Btn.on("click", function (e) {
  form2Options.style.display = "none";
  toform3Btn.style.display = "none";
  loaderWrapper.fadeIn("fast");
  form2.style.display = "none";
  form1.style.display = "inline-block";
  formCancelBtn.style.display = "inline";
  toForm2Btn.style.display = "inline";
  loaderWrapper.fadeOut("slow");
});

// go to form 2
$("#form1Next").on("click", function (e) {
  if (
    //document.getElementById("store_name").value == "" ||
    document.getElementById("input_location").value !== ""
  ) {
    $("#missingInfoModel").modal("open");
  } else {
    formCancelBtn.style.display = "none";
    toForm2Btn.style.display = "none";
    loaderWrapper.fadeIn("fast");
    form1.style.display = "none";
    form2.style.display = "inline-block";
    form2Options.style.display = "inline";
    toform3Btn.style.display = "inline";
    loaderWrapper.fadeOut("slow");
  }
});
