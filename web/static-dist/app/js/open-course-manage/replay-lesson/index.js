webpackJsonp(["app/js/open-course-manage/replay-lesson/index"],[
/* 0 */
/***/ (function(module, exports) {

	import sortList from 'common/sortable';
	import notify from 'common/notify';
	
	var sortListAfter = function sortListAfter(data, $list) {
	  $.post($list.data('sortUrl'), { ids: data }, function (response) {
	    var lessonNum = chapterNum = unitNum = 0;
	
	    $list.find('.item-lesson, .item-chapter').each(function () {
	      var $item = $(this);
	      if ($item.hasClass('item-lesson')) {
	        lessonNum++;
	        $item.find('.number').text(lessonNum);
	      } else if ($item.hasClass('item-chapter-unit')) {
	        unitNum++;
	        $item.find('.number').text(unitNum);
	      } else if ($item.hasClass('item-chapter')) {
	        chapterNum++;
	        unitNum = 0;
	        $item.find('.number').text(chapterNum);
	      }
	    });
	  });
	};
	
	var $list = $('#course-item-list');
	sortList({
	  element: '#course-item-list',
	  itemSelector: '.item-lesson, .item-chapter'
	}, function (data) {
	  sortListAfter(data, $list);
	});
	
	$list.on('click', '.delete-lesson-btn', function (e) {
	  if (!confirm(Translator.trans('删除课时的同时会删除课时的资料、测验。您真的要删除该课时吗？'))) {
	    return;
	  }
	  var $btn = $(e.currentTarget);
	  var _isTestPaper = function _isTestPaper() {
	    return $btn.parents('.item-chapter')[0];
	  };
	  var _remove_item = function _remove_item() {
	    if (_isTestPaper()) {
	      $btn.parents('.item-chapter').remove();
	    } else {
	      $btn.parents('.item-lesson').remove();
	    }
	  };
	  $.post($(this).data('url'), function (response) {
	    _remove_item();
	    sortListAfter($list);
	    notify('success', Translator.trans('课时已删除！'));
	  }, 'json');
	});
	
	$list.on('click', '.delete-chapter-btn', function (e) {
	  var chapter_name = $(this).data('chapter');
	  var part_name = $(this).data('part');
	  if (!confirm(Translator.trans('您真的要删除该%chapter_name%%part_name%吗？', { chapter_name: chapter_name, part_name: part_name }))) {
	    return;
	  }
	  var $btn = $(e.currentTarget);
	  $.post($(this).data('url'), function (response) {
	    $btn.parents('.item-chapter').remove();
	    sortListAfter($list);
	    notify('success' + chapter_name + '' + part_name + Translator.trans('已删除！'));
	  }, 'json');
	});
	
	$list.on('click', '.replay-lesson-btn', function (e) {
	  if (!confirm(Translator.trans('您真的要录制回放吗？'))) {
	    return;
	  }
	  $.post($(this).data('url'), function (html) {
	    if (html.error) {
	      if (html.code == 10019) {
	        notify('danger', Translator.trans('录制失败，直播时您没有进行录制！'));
	      } else if (html.code == 1403) {
	        notify('danger', Translator.trans('尚未生成回放文件!'));
	      } else {
	        notify('danger', Translator.trans('录制失败！'));
	      }
	    } else {
	      var id = '#' + $(html).attr('id');
	      $(id).replaceWith(html);
	      notify('success', Translator.trans('课时已录制！'));
	    }
	  });
	});
	
	$list.on('click', '.publish-lesson-btn', function (e) {
	  var $btn = $(e.currentTarget);
	  $.post($(this).data('url'), function (html) {
	    var id = '#' + $(html).attr('id');
	    $(id).find('.item-content .unpublish-warning').remove();
	    $(id).find('.item-actions .publish-lesson-btn').parent().addClass('hidden').removeClass('show');
	    $(id).find('.item-actions .unpublish-lesson-btn').parent().addClass('show').removeClass('hidden');
	    $(id).find('.item-actions .delete-lesson-btn').parent().addClass('hidden').removeClass('show');
	    $(id).find('.btn-link').tooltip();
	    notify('success', Translator.trans('课时发布成功！'));
	  });
	});
	
	$list.on('click', '.unpublish-lesson-btn', function (e) {
	  var $btn = $(e.currentTarget);
	  $.post($(this).data('url'), function (html) {
	    var id = '#' + $(html).attr('id');
	
	    if ($(id).find('.item-content').find('.unpublish-warning').length == 0) {
	      $(id).find('.item-content').append('<span class="unpublish-warning text-warning">(' + Translator.trans('未发布') + ')</span>');
	      $(id).find('.item-actions .publish-lesson-btn').parent().addClass('show').removeClass('hidden');
	      $(id).find('.item-actions .unpublish-lesson-btn').parent().addClass('hidden').removeClass('show');
	      $(id).find('.item-actions .delete-lesson-btn').parent().addClass('show').removeClass('hidden');
	      $(id).find('.btn-link').tooltip();
	      notify('success', Translator.trans('课时已取消发布！'));
	    }
	  });
	});
	
	$list.on('click', '.delete-exercise-btn', function (e) {
	  if (!confirm(Translator.trans('您真的要删除该课时练习吗？'))) {
	    return;
	  }
	  var $btn = $(e.currentTarget);
	  $.post($(this).data('url'), function (response) {
	    notify('success', Translator.trans('练习已删除！'));
	    window.location.reload();
	  }, 'json');
	});
	
	$list.on('click', '.delete-homework-btn', function (e) {
	  if (!confirm(Translator.trans('您真的要删除该课时作业吗？'))) {
	    return;
	  }
	  var $btn = $(e.currentTarget);
	  $.post($(this).data('url'), function (response) {
	    notify('success', Translator.trans('作业已删除！'));
	    window.location.reload();
	  }, 'json');
	});
	
	$("#course-item-list .item-actions .btn-link").tooltip();
	$("#course-item-list .fileDeletedLesson").tooltip();
	
	$('.dropdown-menu').parent().on('shown.bs.dropdown', function () {
	  if ($(this).find('.dropdown-menu-more').css('display') == 'block') {
	    $(this).parent().find('.dropdown-menu-more').mouseout(function () {
	      $(this).parent().find('.dropdown-menu-more').hide();
	    });
	
	    $(this).parent().find('.dropdown-menu-more').mouseover(function () {
	      $(this).parent().find('.dropdown-menu-more').show();
	    });
	  } else {
	    $(this).parent().find('.dropdown-menu-more').show();
	  }
	});
	
	$('.dropdown-menu').parent().on('hide.bs.dropdown', function () {
	  $(this).find('.dropdown-menu-more').show();
	});
	
	asyncLoadFiles();
	
	function asyncLoadFiles() {
	  var url = $('.lesson-manage-panel').data('file-status-url');
	  $.get(url, '', function (data) {
	    if (!data || data.length == 0) {
	      return;
	    }
	
	    for (var i = 0; i < data.length; i++) {
	      var file = data[i];
	      if (file.convertStatus == 'waiting' || file.convertStatus == 'doing') {
	        $("li[data-file-id=" + file.id + "]").find('span[data-role="mediaStatus"]').append("<span class='text-warning'>" + Translator.trans('正在文件格式转换') + "</span>");
	      } else if (file.convertStatus == 'error') {
	        $("li[data-file-id=" + file.id + "]").find('span[data-role="mediaStatus"]').append("<span class='text-danger'>" + Translator.trans('文件格式转换失败') + "</span>");
	      } else if (file.convertStatus == 'success') {
	        $("li[data-file-id=" + file.id + "]").find('.mark-manage').show();
	        $("li[data-file-id=" + file.id + "]").find('.mark-manage-divider').show();
	      }
	    }
	  });
	}
	
	$('.js-lesson-batch-btn-popover').popover({
	  html: true,
	  trigger: 'hover',
	  delay: { "show": 200, "hide": 1000 },
	  placement: 'top',
	  template: '<div class="popover tata-popover tata-popover-lg" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
	  content: function content() {
	    var html = $(this).find('.popover-content').html();
	    return html;
	  }
	});

/***/ })
]);