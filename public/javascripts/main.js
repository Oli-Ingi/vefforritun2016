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

  function countThreads() {
    var spanLoc = $('.count');
    var threads = $('.thread:visible');
    spanLoc.empty();
    spanLoc.prepend('Showing ' + threads.length + ' threads');
  }

  $('.filter-btn').click(function () {
    var filters = $('.filters');
    var filterForm = $('.filter-form input');
    var filter = filterForm.val();
    var elements = $('.thread:not(:contains(' + filter + '))');
    var filterClass = filter + '-filter';

    elements.addClass(filterClass);
    elements.addClass('hidden');

    if (filters.children().length < 1) filters.prepend('Filters:');

    var filterElement = $('<p>');
    var closeIcon = $('<img>');
    closeIcon.attr('src', '/images/closeicon.png');
    filterElement.append(filter + ' ');
    filterElement.append(closeIcon);
    filters.append(filterElement);

    filterForm.val('');
    countThreads();
  });

  // eslint-disable-next-line prefer-arrow-callback
  $('.filters').on('click', 'p', function filterHandler() {
    var filter = $(this).text().trim();
    var filters = $('.filters');

    // eslint-disable-next-line prefer-arrow-callback
    $('.thread').each(function callback() {
      var thread = $(this);
      if (thread.hasClass(filter + '-filter')) {
        thread.removeClass(filter + '-filter');

        var classes = thread.attr('class').split(/\s+/);
        if (classes.length < 3) thread.removeClass('hidden');
      }
    });

    $(this).remove();
    if (filters.children().length < 1) filters.empty();
    countThreads();
  });

  countThreads();
});