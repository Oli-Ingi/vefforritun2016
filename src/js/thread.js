$(document).ready(() => {
  $('.toggle-form').click((e) => {
    const form = document.querySelector('.post-form');
    const formContainer = document.querySelector('.form-container');

    if (form.classList.contains('hidden')) {
      form.classList.remove('hidden');
      formContainer.classList.remove('dropdown');
      formContainer.classList.add('dropup');
      $(e.target).addClass('borders');
    } else {
      form.classList.add('hidden');
      formContainer.classList.remove('dropup');
      formContainer.classList.add('dropdown');
      $(e.target).removeClass('borders');
    }
  });

  $('.panel-group').on('click', '.reply-header', (e) => {
    const post = $(e.target);
    const postID = post.attr('id');
    const replies = post.next('.replies');

    if (replies.is(':visible')) {
      replies.slideUp('slow', () => {
        post.removeClass('dropup');
        post.addClass('dropdown');
        replies.empty();
        post[0].firstChild.nodeValue = 'View replies';
      });
      return;
    }

    $.ajax({
      url: `/thread/replies/${postID}`,
      type: 'GET',
      async: true,
      success: (data) => {
        post[0].firstChild.nodeValue = 'Hide replies';
        replies.append(data);
        post.removeClass('dropdown');
        post.addClass('dropup');

        if (!$('.replies-container').children().length) {
          const msg = $('<p>');
          msg.addClass('no-replies');
          msg.append('No replies yet. Leave a reply below!');
          replies.prepend(msg);
        }
        replies.slideDown('slow');
      },
    });
  });

  $('.panel-group').on('click', '.reply-btn', (e) => {
    const form = $(e.target).closest('form');
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
        form.find('input[name="replier-name"]').val('');
        form.find('textarea[name="replier-reply"]').val('');
      },
    });
  });
});
