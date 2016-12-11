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

  function countThreads() {
    const spanLoc = $('.count');
    const threads = $('.thread:visible');
    spanLoc.empty();
    spanLoc.prepend(`Showing ${threads.length} threads`);
  }

  $('.filter-btn').click(() => {
    const filters = $('.filters');
    const filterForm = $('.filter-form input');
    const filter = filterForm.val();
    const elements = $(`.thread:not(:contains(${filter}))`);
    const filterClass = `${filter}-filter`;

    elements.addClass(filterClass);
    elements.addClass('hidden');

    if (filters.children().length < 1) filters.prepend('Filters:');

    const filterElement = $('<p>');
    const closeIcon = $('<img>');
    closeIcon.attr('src', '/images/closeicon.png');
    filterElement.append(`${filter} `);
    filterElement.append(closeIcon);
    filters.append(filterElement);

    filterForm.val('');
    countThreads();
  });

  $('.filters').on('click', 'p', (e) => {
    const filter = $(e.target).text().trim();
    const filters = $('.filters');

    $('.thread').each((i, elem) => {
      const thread = $(elem);
      if (thread.hasClass(`${filter}-filter`)) {
        thread.removeClass(`${filter}-filter`);

        const classes = thread.attr('class').split(/\s+/);
        if (classes.length < 3) thread.removeClass('hidden');
      }
    });

    $(e.target).remove();
    if (filters.children().length < 1) filters.empty();
    countThreads();
  });

  countThreads();
});
