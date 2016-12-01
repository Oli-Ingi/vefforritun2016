$(document).ready(function() {

  $('.toggle-form').click(function() {
    const form = $('.rant-form');
    const header = $('.toggle-form');

    if(form.is(':visible')){
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


  $('.panel-group').on('click', '.panel-heading', function() {
    const post = $(this);
    const postID = post.attr('id');
    const replies = post.parent().find('.replies');

    if (replies.is(':visible')) {
      replies.slideUp('slow', function() {
        replies.empty();
      });
      return;
    }

    $.ajax({
      url: `/thread/replies/${postID}`,
      type: 'GET',
      async: false,
      success: function(data) {
        replies.append(data);
        if(replies.children().length < 1) {
          const msg = $('<p>');
          msg.append("No replies yet. Leave a reply below!");
          replies.append(msg);
        }
        replies.slideDown('slow');
      },
      error: function(error) {
        alert(error);
      }
    })
  });
});
