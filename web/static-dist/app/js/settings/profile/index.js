webpackJsonp(["app/js/settings/profile/index"],{0:function(e,t){e.exports=jQuery},"13a6c5c8e2bc32889ed2":function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var a=i("b334fd7e4c5a19234db2"),l=n(a),d=i("da1016b113836a3c7b68"),o=n(d);CKEDITOR.replace("profile_about",{toolbar:"Simple",fileSingleSizeLimit:app.fileSingleSizeLimit,filebrowserImageUploadUrl:$("#profile_about").data("imageUploadUrl")});$(".js-date").datetimepicker({autoclose:!0,format:"yyyy-mm-dd",minView:"month",language:document.documentElement.lang}),$("#user-profile-form").validate({rules:{nickname:{required:!0,chinese_alphanumeric:!0,byte_minlength:4,byte_maxlength:18,nickname:!0,es_remote:{type:"get"}},"profile[truename]":{minlength:2,maxlength:18},"profile[title]":{maxlength:24},"profile[qq]":"qq","profile[weixin]":"weixin","profile[weibo]":"url","profile[blog]":"url","profile[site]":"url","profile[mobile]":"mobile","profile[idcard]":"idcardNumber","profile[intField1]":{digits:!0,maxlength:9},"profile[intField2]":{digits:!0,maxlength:9},"profile[intField3]":{digits:!0,maxlength:9},"profile[intField4]":{digits:!0,maxlength:9},"profile[intField5]":{digits:!0,maxlength:9},"profile[floatField1]":"float","profile[floatField2]":"float","profile[floatField3]":"float","profile[floatField4]":"float","profile[floatField5]":"float","profile[dateField1]":"date","profile[dateField2]":"date","profile[dateField3]":"date","profile[dateField4]":"date","profile[dateField5]":"date"}}),new o.default({el:"#nickname-form-group",success:function(e){(0,l.default)("success",Translator.trans(e.message))},fail:function(e){e.responseJSON.message?(0,l.default)("danger",Translator.trans(e.responseJSON.message)):(0,l.default)("danger",Translator.trans("user.settings.basic_info.nickname_change_fail"))}})},da1016b113836a3c7b68:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=i("7ab4a89ebadbfdecc2bf"),l=n(a),d=i("4602c3f5fe7ad9e3e91d"),o=n(d),s=function(){function e(t){(0,l.default)(this,e),this.el=t.el,this.parent=t.parent||document,this.$el=$(this.el),this.editBtn=t.editBtn||".input-edit__edit-btn",this.saveBtn=t.saveBtn||".input-edit__save-btn",this.cancelBtn=t.cancelBtn||".input-edit__cancel-btn",this.success=t.success||this.success,this.fail=t.fail||this.fail,this.init()}return(0,o.default)(e,[{key:"init",value:function(){this.event()}},{key:"event",value:function(){var e=this,t=$(this.parent);t.on("click",this.editBtn,function(t){return e.edit(t)}),t.on("click",this.saveBtn,function(t){return e.save(t)}),t.on("click",this.cancelBtn,function(t){return e.cancel(t)})}},{key:"edit",value:function(e){$(e.currentTarget).parent().hide(),this.$el.find(".input-edit__edit-dom").show().find(".input-edit__input").focus().select()}},{key:"cancel",value:function(e){$(e.currentTarget);this.$el.find(".input-edit__edit-dom").hide();var t=this.$el.find(".input-edit__static-text").text();this.$el.find(".input-edit__input").val(t),this.$el.find(".input-edit__static-dom").show()}},{key:"save",value:function(e){var t=this,i=$(e.currentTarget),n=i.data("url"),a=i.data("input-name"),l={};l[a]=$("input[name="+a+"]").val(),i.button("loading"),$.post(n,l).always(function(){i.button("reset")}).done(function(e){var i=t.$el.find(".input-edit__input");t.$el.find(".input-edit__static-text").text(i.val()),t.$el.find(".input-edit__edit-dom").hide(),t.$el.find(".input-edit__static-dom").show(),t.success(e)}).fail(function(e){t.fail(e)})}},{key:"success",value:function(e){}},{key:"fail",value:function(e){}}]),e}();t.default=s}},["13a6c5c8e2bc32889ed2"]);