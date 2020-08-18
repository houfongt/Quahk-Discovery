(function () {

    let formPage2 = document.getElementsByClassName('form-page');

    var windowH = $(window).height(),
        docElem = $(document),
        formPage = $('.form-page'),
        contentPage = $('.app-bar-bottom'),
        animSpeed = 250,
        openBtn = $('#nav-btn'),
        closeBtn = $('.closeBtn'),
        closeBtnActions = $('.closeBtn_Actions');

    formPage.css({
        height: windowH + 'px',
        top: -windowH + 'px'
    });

    openBtn.on('click', function (e) {
        formPage.animate({ 'top': 0 }, animSpeed);
        contentPage.animate({ 'margin-top': windowH + 'px' }, animSpeed);
        e.preventDefault();
    });

    closeBtn.on('click', function (e) {
        $('#cancelModel').modal('open');

       /* formPage.animate({ 'top': -windowH + 'px' }, animSpeed);
        contentPage.animate({ 'margin-top': 0 }, animSpeed);
        e.preventDefault(); */
    });

    closeBtnActions.on('click', function (e) {
        // loader in and reset form
        $('.loader-wrapper').fadeIn('fast');
        formPage2[0].reset();

        // Form2&3 Buttons out
        $('#form2OptionsId').css('display', 'none');
        $('#form2Next').css('display', 'none');
        /*$('#form3OptionsId').css('display', 'none');
        $('#finalSubmit').css('display', 'none'); */
       
        // Form2&3 out
        $('.form2').css('display', 'none');
        //$('.form3').css('display', 'none');

        // Form1 all Elements In 
        $('.form1').css('display', 'inline-block');
        $('#formCancelBtn').css('display', 'inline');
        $('#form1Next').css('display', 'inline');
        
        // loader out and lift the whole form out
        $('.loader-wrapper').fadeOut('slow');
        formPage.animate({ 'top': -windowH + 'px' }, animSpeed);
        contentPage.animate({ 'margin-top': 0 }, animSpeed);
        e.preventDefault();
    });

})();