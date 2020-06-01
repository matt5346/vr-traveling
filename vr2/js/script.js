// $(document).ready(function () {
//     $('.service-icon').on('click', function () {
//         $(this).toggleClass("-selected");
//         var e = $(this).siblings('.servicedescription');
//         if (!e.hasClass("-selected")) {
//             e.addClass("-selected");
//             // $('.service-icon.-gym').attr('src', 'img/icon-success.svg');
//         }
//         else {
//             e.removeClass("-selected");
//         }
//     })

// });

// $(document).ready(function () {
//     $('.promo-slides').owlCarousel({
//         items: 1,
//         loop: true,
//         nav: true,
//         dots: false,
//         autoWidth: false,
//         margin: 30,
//         navContainer: ".promo-buttons",
//         navText: ["", ""],
//         navClass: ["prev", "next"],
//         responsive:{
//             0:{
//                 items:1,
//                 dots: true,
//                 responsiveRefreshRate: 50,
//             },
//             600:{
//                 items:2,
//                 dots: true,
//                 responsiveRefreshRate: 50,
//             },
//             986:{
//                 items:3,
//                 dots: false,
//                 responsiveRefreshRate: 50,
//             },
//         }
//     });
// });

// $(document).ready(function () {
//     $('.fitnessclub-slides').owlCarousel({
//         loop: true,
//         items: 3,
//         autoWidth: false,
//         margin: 20,
//         dots: false,
//         navContainer: ".fitnessclub-buttons",
//         navText: ["<img src=\"img/promo-arrow-prev.svg\">", "<img src=\"img/promo-arrow-next.svg\">"],
//         navClass: ["prev", "next"],
//         responsive:{
//             0:{
//                 items:2,
//                 dots: true,
//                 responsiveRefreshRate: 50,
//                 margin: 10
//             },
//             600:{
//                 items:2,
//                 dots: true,
//                 responsiveRefreshRate: 50,
//             },
//             986:{
//                 items:3,
//                 dots: true,
//                 responsiveRefreshRate: 50,
//             },
//             1200:{
//                 items:3,
//                 dots: false,
//                 responsiveRefreshRate: 50,
//             },
//         }
//     });
// });

// $(document).ready(function () {
//     $('.price').on('click', function () {
//         if (!$(this).hasClass('-selected') && !$(this).hasClass('-dash') && (!$('.price').hasClass('-selected'))) {
//             $(this).addClass('-selected');
//         }

//         else {
//             $(this).removeClass('-selected');
//         }
//     })
// });

// $(document).ready(function () {
//     $('#application_phone').mask("+7 (999) 999 99 99")
// });

// document.addEventListener("DOMContentLoaded", function () {
//     tail.select('.city-list', {
//         search: true,
//         multiContainer: '.information-section.-dropdown'
//     })
// });

// $(document).ready(function(){
//     $('#location_submit').on('click', function(){
//         $('.city-list option:selected').text()
//         $('.information-section.-dropdown').html($('.city-list option:selected').text() + ' ' + '<img class=\"icon\" src=\"img/icon-arrow-down.svg\">');
//     })
// })

// $(document).ready(function(){
//     $('.show_more_gyms').on('click', function(){

//         $(this).toggleClass('active');
//         $(this).siblings('.searchcatalog-durations').toggleClass('active');
        
//     })
// })
$(function() {
  $('#watch_btn').magnificPopup({
      items: {
             src: 'https://www.youtube.com/watch?v=PIA6MMOKz24'
         },
      type: 'iframe',
      iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '</div>', 
            patterns: {
                youtube: {
                      index: 'youtube.com/', 
                      id: 'v=', 
                      src: 'https://www.youtube.com/embed/%id%?autoplay=1' 
                    }
                 },
                 srcAction: 'iframe_src', 
         }
    });
  $(".select").select2({
      allowClear: false
  });
  
  $('.card_box .main_btn').on('click', function() {
      $('.popup_box').slideToggle('400', function() {
          if($(this).is(':visible'))
              $(this).css('display', 'flex')
      });
      $('body').toggleClass('active')
  })
  $('.close_btn').on('click', function() {
      $('.popup_box').slideToggle('400', function() {
          if($(this).is(':visible'))
              $(this).css('display', 'flex')
      });
      $('body').toggleClass('active')
  })

  $('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
  });
  
  
  $('[data-scroll]').on('click', function(event) {
      event.preventDefault();
  
      let $this = $(this),
      blockId = $this.data('scroll'),
      blockOfSet = $(blockId).offset().top;
  
      $('nav a').removeClass('active');
      $this.addClass('active');
  
      $('html, body').animate({
          scrollTop: blockOfSet
      }, 1000)
  });
  
  $('.form').submit(function() {
      var thisForm = $(this);
      console.log('FORM SUBMITED')
      // we stoped it
      event.preventDefault();
      var formMessage = thisForm.find('[name="msg_text"]').val(),
        formName = thisForm.find('[name="form_name"]').val(),
        formEmail = thisForm.find('[name="form_email"]').val();
      // needs for recaptacha ready
      grecaptcha.ready(function() {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha.execute('6LeNifQUAAAAAORq9i4VjHyjFxwMvtqsa68XUHeQ', {action: 'create_comment'}).then(function(token) {
          // add token to form
          thisForm.prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
          $.post("form.php",{fMessage: formMessage,fName: formName,fEmail: formEmail, token: token}, function(result) {
            console.log(result)
            if(result.success) {
                  $('.js-val').val('');
            } else {
              alert('You have not been tested for a robot, if you are not a robot try to send a request from another browser.')
            }
          });
        });;
      });
    });
});