$(document).ready(() => {
  $('.create-header').click(() => {
    const form = $('.thread-form');
    const header = $('.create-header');

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

  $('.filter-btn').click(() => {
    const filters = $('.filters');
    const filterForm = $('.filter-form input');
    const filter = filterForm.val();
    const elements = $(`.thread:not(:contains(${filter}))`);

    elements.addClass(filter);
    elements.addClass('hidden');

    if (filters.children().length < 1) filters.prepend('Filters:');

    const filterElement = $('<p>');
    const closeIcon = $('<img>');
    closeIcon.attr('src', '/Images/closeicon.png');
    filterElement.append(`${filter} `);
    filterElement.append(closeIcon);
    filters.append(filterElement);

    filterForm.val('');
  });

  $('.filters').on('click', 'p', () => {
    const filter = $(this).text().trim();
    const filters = $('.filters');

    $('.thread').each(() => {
      const thread = $(this);
      if (thread.hasClass(filter)) {
        thread.removeClass(filter);

        const classes = thread.attr('class').split(/\s+/);
        if (classes.length < 3) thread.removeClass('hidden');
      }
    });

    $(this).remove();
    if (filters.children().length < 1) filters.empty();
  });
});
