
$(document).ready(function() {

  $('.toggle-form').click(function() {
      const form = document.querySelector('.post-form');
      const formContainer = document.querySelector('.form-container');

      if (form.classList.contains('hidden')) {
          form.classList.remove('hidden');
          formContainer.classList.remove('dropdown');
          formContainer.classList.add('dropup');
      } else {
          form.classList.add('hidden');
          formContainer.classList.remove('dropup');
          formContainer.classList.add('dropdown');
      };
  });

  // eslint-disable-next-line prefer-arrow-callback
  $('.panel-group').on('click', '.panel-heading', function() {
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
