'use strict';

$(document).ready(function () {
  $('.toggle-form').click(function () {
    var form = $('.rant-form');
    var header = $('.toggle-form');

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

  $('.panel-group').on('click', '.panel-heading', function () {
    var post = $(undefined);
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
      async: false,
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
});