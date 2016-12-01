'use strict';

$(document).ready(function () {
  $('.toggle-form').click(function () {
    var form = document.querySelector('.post-form');
    var formContainer = document.querySelector('.form-container');

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
  $('.panel-group').on('click', '.panel-heading', function fetchReplies() {
    var post = $(this);
    var postID = post.attr('id');
    var replies = post.parent().find('.replies');

    if (replies.is(':visible')) {
      replies.slideUp('slow', function () {
        replies.empty();
      });
      return;
    }

    $.ajax({
      url: '/thread/replies/' + postID,
      type: 'GET',
      async: true,
      success: function success(data) {
        replies.append(data);
        if (replies.children().length < 1) {
          var msg = $('<p>');
          msg.append('No replies yet. Leave a reply below!');
          replies.append(msg);
        }
        replies.slideDown('slow');
      },
      error: function error(_error) {
        // eslint-disable-next-line no-alert
        alert(_error);
      }
    });
  });

  $('.panel-group').on('click', '.reply-btn', function postReply() {
    var form = $(this).closest('form');
    var addr = form.attr('action');

    $.ajax({
      url: addr,
      type: 'POST',
      async: true,
      data: {
        author: form.find('input[name="replier-name"]').val(),
        text: form.find('textarea[name="replier-reply"]').val()
      },
      success: function success(data) {
        $('.replies-container').append(data);
        $('.new-reply').fadeIn('slow');
      }
    });
  });
});