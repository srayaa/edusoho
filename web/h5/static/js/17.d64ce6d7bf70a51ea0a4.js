webpackJsonp([17],{odi1:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("XmAh");var s=n("il3B"),i=(n("eqfM"),n("/QYm")),a=n("Dd8w"),c=n.n(a),o=n("NYxO"),r=n("gyMJ"),u=n("Du/2"),l=(n("IcnI"),{data:function(){return{settings:[{name:"头像",info:""},{name:"用户名",info:""}]}},computed:c()({},Object(o.mapState)({user:function(t){return t.user},isLoading:function(t){return t.isLoading}})),created:function(){this.$set(this.settings[0],"info",this.user.avatar.large),this.$set(this.settings[1],"info",this.user.nickname)},methods:c()({},Object(o.mapActions)(["setAvatar"]),{handleSetting:function(t){switch(t){case 0:break;case 1:this.$router.push({name:"setting_nickname",query:{nickname:""==this.user.nickname?"":this.user.nickname}});break;case 2:Object(i.a)("更改手机号，后续开通")}},logout:function(){var t=this;s.a.confirm({title:"退出登录",message:"确定要退出登录吗？"}).then(function(){t.$store.commit(u.m,{token:"",user:{}}),t.$router.push({name:"my"})})},onRead:function(t){var e=this;r.a.updateFile({data:{file:t.content,group:"user"}}).then(function(n){e.$set(e.settings[0],"info",t.content),e.setAvatar({avatarId:n.id}).then(function(){i.a.success("修改成功")}).catch(function(t){i.a.fail(t.message)})})}})}),m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my_setting"},[t.isLoading?n("e-loading"):t._e(),t._v(" "),t._l(t.settings,function(e,s){return n("div",{staticClass:"my_setting-item",on:{click:function(e){t.handleSetting(s)}}},[n("span",{staticClass:"my_setting-title title-18"},[t._v(t._s(e.name))]),t._v(" "),n("div",{staticClass:"my_setting-content"},[s?t._e():n("img",{staticClass:"my_setting-avatar",attrs:{src:e.info,alt:""}}),t._v(" "),s?n("span",[t._v(t._s(e.info))]):t._e(),t._v(" "),n("img",{staticClass:"my_setting-more",attrs:{src:"static/images/more.png",alt:""}})]),t._v(" "),s?t._e():n("van-uploader",{attrs:{"after-read":t.onRead}})],1)}),t._v(" "),n("div",{staticClass:"log-out-btn title-18",on:{click:t.logout}},[n("span",[t._v("退出登录")])])],2)},staticRenderFns:[]},f=n("VU/8")(l,m,!1,null,null,null);e.default=f.exports}});