let star1 = $('#star1'),
    star2 = $('#star2'),
    star3 = $('#star3'),
    star4 = $('#star4'),
    star5 = $('#star5'),
    finalSubmit = $('#finalSubmit'),
    rating = 0;

star1.on('click', function(e) {
    e.preventDefault();
    star1.html('<i class="material-icons">star</i>');
    star2.html('<i class="material-icons">star_border</i>');
    star3.html('<i class="material-icons">star_border</i>');
    star4.html('<i class="material-icons">star_border</i>');
    star5.html('<i class="material-icons">star_border</i>');
    rating = 1;
});

star2.on('click', function(e) {
    e.preventDefault();
    star1.html('<i class="material-icons">star</i>');
    star2.html('<i class="material-icons">star</i>');
    star3.html('<i class="material-icons">star_border</i>');
    star4.html('<i class="material-icons">star_border</i>');
    star5.html('<i class="material-icons">star_border</i>');
    rating = 2;
});

star3.on('click', function(e) {
    e.preventDefault();
    star1.html('<i class="material-icons">star</i>');
    star2.html('<i class="material-icons">star</i>');
    star3.html('<i class="material-icons">star</i>');
    star4.html('<i class="material-icons">star_border</i>');
    star5.html('<i class="material-icons">star_border</i>');
    rating = 3;
});

star4.on('click', function(e) {
    e.preventDefault();
    star1.html('<i class="material-icons">star</i>');
    star2.html('<i class="material-icons">star</i>');
    star3.html('<i class="material-icons">star</i>');
    star4.html('<i class="material-icons">star</i>');
    star5.html('<i class="material-icons">star_border</i>');
    rating = 4;
});

star5.on('click', function(e) {
    e.preventDefault();
    star1.html('<i class="material-icons">star</i>');
    star2.html('<i class="material-icons">star</i>');
    star3.html('<i class="material-icons">star</i>');
    star4.html('<i class="material-icons">star</i>');
    star5.html('<i class="material-icons">star</i>');
    rating = 5;
});

finalSubmit.on('click', function(e) {
    e.preventDefault();
    let docName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    //let docRef = firebase.firebase();
})
