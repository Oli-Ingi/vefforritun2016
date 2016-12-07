$(document).ready(() => {
  $('.toggle-form').click(() => {
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
    }
  });

  // eslint-disable-next-line prefer-arrow-callback
  $('.panel-group').on('click', '.reply-header', function fetchReplies() {
    const post = $(this);
    const postID = post.attr('id');
    const replies = post.next('.replies');

    if (replies.is(':visible')) {
      replies.slideUp('slow', () => {
        replies.empty();
        post.text('View replies');
      });
      return;
    }

    $.ajax({
      url: `/thread/replies/${postID}`,
      type: 'GET',
      async: true,
      success: (data) => {
        post.text('Hide replies');
        replies.append(data);

        if (!$('.replies-container').children().length) {
          const msg = $('<p class="no-replies">');
          msg.append('No replies yet. Leave a reply below!');
          replies.prepend(msg);
        }
        replies.slideDown('slow');
      },
    });
  });

  $('.panel-group').on('click', '.reply-btn', function postReply() {
    const form = $(this).closest('form');
    const addr = form.attr('action');

    $.ajax({
      url: addr,
      type: 'POST',
      async: true,
      data: {
        author: form.find('input[name="replier-name"]').val(),
        text: form.find('textarea[name="replier-reply"]').val(),
      },
      success: (data) => {
        $('.replies-container').append(data);
        $('.new-reply').fadeIn('slow');
      },
    });
  });
});
