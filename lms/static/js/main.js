// Once generated by CoffeeScript 1.9.3, but now lives as pure JS
/* eslint-disable */
(function() {
  AjaxPrefix.addAjaxPrefix(jQuery, function() {
    return $("meta[name='path_prefix']").attr('content');
  });

  $(function() {
    $.ajaxSetup({
      headers: {
        'X-CSRFToken': $.cookie('csrftoken')
      },
      dataType: 'json'
    });
    window.onTouchBasedDevice = function() {
      return navigator.userAgent.match(/iPhone|iPod|iPad|Android/i);
    };
    if (onTouchBasedDevice()) {
      $('body').addClass('touch-based-device');
    }

    /*
    $("a[rel*=leanModal]").leanModal()
     */
    $('#csrfmiddlewaretoken').attr('value', $.cookie('csrftoken'));
    new Calculator;
    new FeedbackForm;
    if ($('body').hasClass('courseware')) {
      Courseware.start();
    }
    window.postJSON = function(url, data, callback) {
      return $.postWithPrefix(url, data, callback);
    };
    $('#login').click(function() {
      $('#login_form input[name="email"]').focus();
      return false;
    });
    $('#signup').click(function() {
      $('#signup-modal input[name="email"]').focus();
      return false;
    });

    /*
    fix for ie
     */
    if (!Array.prototype.indexOf) {
      return Array.prototype.indexOf = function(obj, start) {
        var ele, i, j, len, ref;
        if (start == null) {
          start = 0;
        }
        ref = this.slice(start);
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          ele = ref[i];
          if (ele === obj) {
            return i + start;
          }
          return -1;
        }
      };
    }
  });

}).call(this);


  $(document).ready(function() {

    function closeSelect() {
      $('.select-styled').removeClass('active');
      $('.select-options').hide();
      $('button.select-styled').focus();
    }

  $('select').each(function () {
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');

    $this.wrap('<div class="select d-flex flex-wrap"></div>');
    $this.after('<button type="button" aria-labelledby="sort-select" class="select-styled" aria-haspopup="listbox"></button>');

    var $styledSelect = $this.next('button.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
      'class': 'select-options',
      'tabindex': '0',
      'role': 'listbox',
      'aria-activedescendant': 'exp_elem_0'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val(),
        role: 'option',
        id: 'exp_elem_' + i,
        'tabindex': '-1',
        'aria-selected': 'false'
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
      e.stopPropagation();

      $('button.select-styled.active').not(this).each(function () {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
      $('ul.select-options').focus();

    });

    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
    });

    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  });

    $('.select-options li').on('click', function(){
      var value = $(this).attr("rel");
      var indexOpt = $(this).index();
      value++;
      $('.select-options').attr('aria-activedescendant', $(this).attr('id'));
      $('#sort-select').find('option').eq(indexOpt).prop('selected', true).trigger('change');
      return false;
    });

    $("[role=listbox]").on("focus", function () {
      // If no selected element, select the first by default
      if (!$(this).find("[aria-selected=true]").length) {
        $(this).find("[role=option]:first").attr("aria-selected", "true").focus();
      } else {
        $(this).find("[aria-selected=true]").focus();
      }
    });

    $("[role=option]").on("focus", function (e) {
      $(this).parent().attr("tabindex", "-1");
    });

    $("[role=option]").on("blur", function (e) {
      $(this).parent().attr("tabindex", "0");
    });


    $("[role=listbox]").on("keydown", function (e) {
      var currentItem = $(this).find("[aria-selected=true]");

      if (currentItem.length == 0) {
        //currentItem = $(this).eq(0);
      }

      switch (e.keyCode) {
        case 37: // Left Arrow
        case 38:  // Up arrow
          if (currentItem.prev().length) {
            currentItem.attr("aria-selected", "false");
            currentItem.prev().focus();
            $('.select-styled').text(currentItem.prev().text());
          } else return;
          e.preventDefault();
          break;
        case 39: // Right Arrow
        case 40: // Down arrow
          if (currentItem.next().length) {
            currentItem.attr("aria-selected", "false");
            currentItem.next().attr("aria-selected", "true").focus();
            $('.select-styled').text(currentItem.next().text());
          } else return;
          e.preventDefault();
          break;
        case 27: // Escape
          if (currentItem.length) {
            currentItem.attr("aria-selected", "false");
          }
          closeSelect();
          e.preventDefault();
          break;
        case 13: // Enter
        case 32: // Space
          if (currentItem.length) {
            var indexOpt = currentItem.index();
            $('.select-options').attr('aria-activedescendant', currentItem.attr('id'));
            $('#sort-select').find('option').eq(indexOpt).prop('selected', true).trigger('change');
            currentItem.attr("aria-selected", "false");
            closeSelect();
            return false;
          }
          e.preventDefault();
          break;
      }
    });

    $("[role=option]").on("mousedown", function (e) {
      $(this).parent().find("[aria-selected=true]").attr("aria-selected", "false");
      $(this).attr("aria-selected", "true");
      e.preventDefault();
    });

});

