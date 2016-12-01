'use strict';

$(document).ready(function () {
  $('.create-header').click(function () {
    var form = $('.thread-form');
    var header = $('.create-header');

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

  $('.filter-btn').click(function () {
    var filters = $('.filters');
    var filterForm = $('.filter-form input');
    var filter = filterForm.val();
    var elements = $('.thread:not(:contains(' + filter + '))');

    elements.addClass(filter);
    elements.addClass('hidden');

    if (filters.children().length < 1) filters.prepend('Filters:');

    var filterElement = $('<p>');
    var closeIcon = $('<img>');
    closeIcon.attr('src', '/Images/closeicon.png');
    filterElement.append(filter + ' ');
    filterElement.append(closeIcon);
    filters.append(filterElement);

    filterForm.val('');
  });

  $('.filters').on('click', 'p', function () {
    var filter = $(undefined).text().trim();
    var filters = $('.filters');

    $('.thread').each(function () {
      var thread = $(undefined);
      if (thread.hasClass(filter)) {
        thread.removeClass(filter);

        var classes = thread.attr('class').split(/\s+/);
        if (classes.length < 3) thread.removeClass('hidden');
      }
    });

    $(undefined).remove();
    if (filters.children().length < 1) filters.empty();
  });
});