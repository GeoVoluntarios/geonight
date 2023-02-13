function initPage() {
  /*!
   * Start Bootstrap - Freelancer v6.0.5 (https://startbootstrap.com/theme/freelancer)
   * Copyright 2013-2020 Start Bootstrap
   * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
   */
  (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    // Scroll to top button appear
    $(document).scroll(function () {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });

    // Collapse Navbar
    var navbarCollapse = function () {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Floating label headings for the contact form
    $(function () {
      $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });

    window.startSponsorGrid = function () {
      $('.sponsor-grid__logo').on('click', function () {
        if ($(this).next('.sponsor-grid__expander').hasClass("active")) {
          //closes other open items
          $('.sponsor-grid__expander').removeClass('active');
          $('.sponsor-grid__item').css("margin-bottom", 0);
          $('.icon').removeClass('rotate-arrow');
          $('.sponsor-grid__logo').removeClass('sponsor-background--color');
        } else {
          $('.sponsor-grid__logo').removeClass('sponsor-background--color');
          $(this).addClass('sponsor-background--color');
          //delays playing animation while another item is closing
          if ($('.sponsor-grid__expander').hasClass('active')) {
            $(this).parent().addClass('delay');
            $(this).next('.sponsor-grid__expander').addClass('delay');
          }
          $('.sponsor-grid__expander').removeClass('active');
          $('.icon').removeClass('rotate-arrow');
          $('.icon', this).addClass('rotate-arrow');
          $('.sponsor-grid__item').css("margin-bottom", 0);
          //checks if the animation has ended and removes the delay
          $(this).next('.sponsor-grid__expander').addClass('active').one("transitionend", function () {
            $('.sponsor-grid__expander').removeClass('delay');
          });

          var $height = $(this).next('.sponsor-grid__expander').height();
          //pushes down the row below and removes delay class
          $(this).parent().css("margin-bottom", $height).one("transitionend", function () {
            $('.sponsor-grid__item').removeClass('delay');
          });;

        }
      });
    }
  })(jQuery); // End of use strict



}