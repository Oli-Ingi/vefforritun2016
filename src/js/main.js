$(document).ready(function() {

  $('.create-header').click(function() {
    const form = $('.thread-form');
    const header = $('.create-header');

    if(form.is(':visible')){
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
