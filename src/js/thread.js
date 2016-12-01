$(document).ready(() => {
  $('.toggle-form').click(() => {
    const form = $('.rant-form');
    const header = $('.toggle-form');

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


  $('.panel-group').on('click', '.panel-heading', () => {
    const post = $(this);
    const postID = post.attr('id');
    const replies = post.parent().find('.replies');

    if (replies.is(':visible')) {
      replies.slideUp('slow', () => {
        replies.empty();
      });
      return;
    }

    $.ajax({
      url: `/thread/replies/${postID}`,
      type: 'GET',
      async: false,
      success: (data) => {
        replies.append(data);
        if (replies.children().length < 1) {
          const msg = $('<p>');
          msg.append('No replies yet. Leave a reply below!');
          replies.append(msg);
        }
        replies.slideDown('slow');
      },
      error: (error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      },
    });
  });
});
