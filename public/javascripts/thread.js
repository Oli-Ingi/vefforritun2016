'use strict';

$(document).ready(function () {
  $('.toggle-form').click(function (e) {
    var form = document.querySelector('.post-form');
    var formContainer = document.querySelector('.form-container');

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

  $('.panel-group').on('click', '.reply-header', function (e) {
    var post = $(e.target);
    var postID = post.attr('id');
    var replies = post.next('.replies');

    if (replies.is(':visible')) {
      replies.slideUp('slow', function () {
        post.removeClass('dropup');
        post.addClass('dropdown');
        replies.empty();
        post[0].firstChild.nodeValue = 'View replies';
      });
      return;
    }

    $.ajax({
      url: '/thread/replies/' + postID,
      type: 'GET',
      async: true,
      success: function success(data) {
        post[0].firstChild.nodeValue = 'Hide replies';
        replies.append(data);
        post.removeClass('dropdown');
        post.addClass('dropup');

        if (!$('.replies-container').children().length) {
          var msg = $('<p>');
          msg.addClass('no-replies');
          msg.append('No replies yet. Leave a reply below!');
          replies.prepend(msg);
        }
        replies.slideDown('slow');
      }
    });
  });

  $('.panel-group').on('click', '.reply-btn', function (e) {
    var form = $(e.target).closest('form');
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
        form.find('input[name="replier-name"]').val('');
        form.find('textarea[name="replier-reply"]').val('');
      }
    });
  });
});