let formCancelBtn = document.getElementById('formCancelBtn'),
    form2 = document.getElementsByClassName('form2')[0],
    form1 = document.getElementsByClassName('form1')[0],
    form3 = document.getElementsByClassName('form3')[0],
    form2Options = document.getElementById('form2OptionsId'),
    form3Options = document.getElementById('form3OptionsId'),
    toform3Btn = document.getElementById('form2Next'),
    toForm2Btn = document.getElementById('form1Next'),
    submitBtn = document.getElementById('finalSubmit'),
    loaderWrapper = document.getElementsByClassName('loader-wrapper')[0];

document.getElementById('form1Next').addEventListener('click', function (e) {
  if (document.getElementById('storeName').value == '' || document.getElementById('input_location').value == '') {
    $('#missingInfoModel').modal('open');
  } else {
    formCancelBtn.style.display = 'none';
    toForm2Btn.style.display = 'none';
    loaderWrapper.fadeIn('fast');
    form1.style.display = 'none';
    form2.style.display = 'inline-block';
    form2Options.style.display = 'inline';
    toform3Btn.style.display = 'inline';
    loaderWrapper.fadeOut('slow');
  }
});
