
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
      async: true,
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

  $('.panel-group').on('click', '.reply-btn', function() {
    const form = $(this).closest('form');
    const addr = form.attr('action');

    $.ajax({
      url: addr,
      type: 'POST',
      async: true,
      data: {
        author: form.find('input[name="replier-name"]').val(),
        text: form.find('textarea[name="replier-reply"]').val()
      },
      success: (data) => {
        alert(data);
        $('.replies-container').append(data);
        $('.new-reply').fadeIn('slow');
      }
    })
  });
});
