webpackJsonp(["app/js/courseset/show/notes/index"],[function(e,a){$(".js-like").on("click",function(e){var a=$(e.currentTarget),o=a.find(".js-like-num"),r=parseInt(o.text()),s=void 0,t=a.hasClass("color-primary");s=t?a.data("cancelLikeUrl"):a.data("likeUrl"),$.post(s).done(function(e){t?(a.removeClass("color-primary"),o.text(r-1)):(a.addClass("color-primary"),o.text(r+1))})})}]);