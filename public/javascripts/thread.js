'use strict';

$(document).ready(function () {

  $('.toggle-form').click(function () {
    var form = $('.rant-form');
    var header = $('.toggle-form');

    if (form.is(':visible')) {
      form.slideUp('slow');
      header.css('border-radius', '5px');
      header.removeClass('dropup');
      header.addClass('dropdown');
    } else {
      form.slideDown('slow');
      header.css('border-radius', '5px 5px 0 0');
      header.removeClass('dropdown');
      header.addClass('dropup');
    }
  });
});