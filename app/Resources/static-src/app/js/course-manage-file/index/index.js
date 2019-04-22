import BatchSelect from 'app/common/widget/batch-select';
import DetailWidget from 'app/js/material-lib/index/detail';
import Select from 'app/common/input-select';

var $panel = $('#file-manage-panel');
new BatchSelect($panel);

Select('#modal-tags', 'remote');
let $form = $('#tag-form');
  let validator = $form.validate({
    rules: {
      tags: {
        required: true,
      },
    }
});

const codeErrorTip = () => {
  $('#cd-modal').on('show.bs.modal', function (event) {
    // do something...
    const $btn = $(event.relatedTarget);
    const title = $btn.data('title');
    const reason = $btn.data('reason');
    const solution = $btn.data('solution');
    $('.js-error-tip').html(
      `<div class="mbl">文件名称：<span class="cd-ml8">${title}</span></div><div class="mbl">转码状态：<span class="cd-ml8">转码失败</span></div><div class="mbl">错误原因：<span class="cd-text-danger cd-ml8">${reason}</span></div><div>解决方案：<span class="cd-text-info cd-ml8">${solution}</span></div>`
    )
  })
}

$panel.on('click', '.js-cd-modal', () => {
  codeErrorTip();
})

$panel.on('click', '.convert-file-btn', function () {
  console.log('re');
  $.post($(this).data('url'), function (response) {
    if (response.status == 'error') {
      alert(response.message);
    } else {
      window.location.reload();
    }
  }, 'json').fail(function () {
    alert(Translator.trans('alert.file_convert_error.message'));
  });
});

$('.tip').tooltip();

$('#modal').modal({
  backdrop: 'static',
  keyboard: false,
  show: false
});

$('button', '.panel-heading').on('click', function () {
  var url = $(this).data('url');
  $('#modal').html('');
  $('#modal').modal('show');
  $.get(url, function (html) {
    $('#modal').html(html);
  });
});


const onClickTagBatchBtn = (event) => {
  let $target = $(event.currentTarget);
  let ids = [];
  $panel.find('[data-role=batch-item]:checked').each(function() {
    ids.push(this.value);
  });
  $('#select-tag-items').val(ids);
  $('#tag-modal').modal('show');
}

$panel.on('click', '.js-batch-tag-btn', (event) => {
  onClickTagBatchBtn(event);
});


$('[rel=\'tooltip\']').tooltip();

asyncLoadFiles();

$('[data-role=batch-delete]').click(function () {
  var flag = false;
  var ids = [];
  $('[data-role=batch-item]').each(function () {
    if ($(this).is(':checked')) {
      flag = true;
      ids.push(this.value);
    }
  });

  if (flag) {
    $('#modal').html('');
    $('#modal').load($(this).data('url'), { ids: ids });
    $('#modal').modal('show');
  }
});

$('.js-delete-btn').click((event) =>  {
  const $target = $(event.target);
  const id = $target.data('id');
  const url = $target.data('url');
  let ids = [];
  ids.push(id);
  $('#modal').html('');
  $('#modal').load(url, { ids: ids });
  $('#modal').modal('show');
});

function asyncLoadFiles() {
  var fileIds = new Array();
  $('tbody [type=checkbox]').each(function () {
    if (!isNaN($(this).val())) {
      fileIds.push($(this).val());
    }
  });

  if (fileIds.length == 0) {
    return;
  }

  $.post($('#file-manage-panel').data('fileStatusUrl'), { 'ids': fileIds.join(',') }, function (data) {
    if (!data || data.length == 0) {
      return;
    }

    for (var i = 0; i < data.length; i++) {
      var file = data[i];
      if ($.inArray(file.type, ['video', 'ppt', 'document']) > -1 &&  file.storage == 'cloud') {
        if (file.convertStatus == 'waiting' || file.convertStatus == 'doing') {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:first').after('<span class=\'color-warning mr5 text-sm\'>' + Translator.trans('page.file_converting.message') + '</span><br/>');
        } else if (file.convertStatus == 'error') {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:first').after('<span class=\'color-danger mr5 text-sm\'>' + Translator.trans('page.file_convert_failed.message') + '</span><br/>');
        } else if (file.convertStatus == 'none') {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:last').after('<span class=\'label label-default mr5 tip\'>' + Translator.trans('page.file_not_convert.message') + '</span>');
        } else if (file.convertStatus == 'success') {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:last').after('<span class=\'label label-success mr5 tip\'>' + Translator.trans('page.file_converted.message') + '</span>');
        }

      }
      if (file.type == 'video' && file.metas2) {
        if (file.metas2.shd) {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:first').after('<span class="label label-info mr5 tip">' + Translator.trans('page.video_shd.message') + '</span>');
        } else if (file.metas2.hd) {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:first').after('<span class="label label-info mr5 tip">' + Translator.trans('page.video_hd.message') + '</span>');
        } else if (file.metas2.sd) {
          $('#upload-file-tr-' + file.id).find('a:first ~ br:first').after('<span class="label label-info mr5 tip">' + Translator.trans('page.video_sd.message') + '</span>');
        }
      }
    }
  });


}

var detailBtnActive = true;

$('.js-detail-btn').on('click', function (){
  if (detailBtnActive) {
    detailBtnActive = false;
    var container = $('#file-manage-panel');
    $.ajax({
      type: 'GET',
      url: $(this).data('url'),
    }).done(function(resp){
      $(container).hide();
      $(container).prev().hide();
      //$(container).parent().prev().html(Translator.trans('material_lib.detail.content_title'));
      $(container).parent().append(resp);

      if($('.nav.nav-tabs').length > 0 && !navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
        $('.nav.nav-tabs').lavaLamp();
      }

      Select('#tags', 'remote');

      new DetailWidget({
        element: $('#material-detail'),
        callback: function() {
          let $form = $('#material-search-form');
          $form.show();
          $form.prev().show();
          self.renderTable();
        }
      });
    }).fail(function() {
      cd.message({type: 'danger', message: Translator.trans('material_lib.have_no_permission_hint')});
    }).always(function() {
      detailBtnActive = true;
    });
  }
});