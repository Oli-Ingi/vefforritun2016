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
    var post = $(this);
    var postID = post.attr('id');
    $.ajax({
      url: '/thread/replies/' + postID,
      type: 'GET',
      async: false,
      success: function success(data) {
        var replies = post.parent().find('.replies');
        replies.append(data);
        alert(data);
      },
      error: function error(_error) {
        alert(_error);
      }
    });
  });
});