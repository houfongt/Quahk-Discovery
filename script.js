

(function () {
    
    var windowH = $(window).height(),
        docElem = $(document),
        formPage = $('.form-page'),
        contentPage = $('.app-bar-bottom'),
        animSpeed = 250,
        openBtn = $('#nav-btn'),
        closeBtn = $('.close_btn');

        formPage.css({
            height: windowH + 'px',
            top: -windowH + 'px'
        });

        openBtn.on('click', function (e) {
           formPage.animate({'top': 0}, animSpeed);
           contentPage.animate({'margin-top': windowH + 'px'}, animSpeed);
           e.preventDefault();
        });

        closeBtn.on('click', function (e) {
           formPage.animate({'top': -windowH + 'px'}, animSpeed);
           contentPage.animate({'margin-top': 0}, animSpeed); 
           e.preventDefault();
        });

})();