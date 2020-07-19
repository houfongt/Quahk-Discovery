(function () {
    
    var windowH = $(window).height(),
        docElem = $(document),
        formPage = $('.form-page'),
        contentPage = $('.app-bar-bottom'),
        animSpeed = 500,
        openBtn = $('#nav-btn'),
        closeBtn = $('.close_btn');

        formPage.css({
            height: windowH + 'px',
            top: -windowH + 'px'
        });

        openBtn.on('click', function (e) {
           formPage.animate({'top': 0}, animSpeed);
           contentPage.animate({'margin-top': windowH + 'px'}, animSpeed);
        });

})();