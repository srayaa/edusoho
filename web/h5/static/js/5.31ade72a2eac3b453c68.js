webpackJsonp([5],{"7/x9":function(e,t,s){"use strict";var i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"course-detail__service"},[s("span",[e._v("承诺服务：")]),e._v(" "),e._l(e.services,function(t){return[s("span",{staticClass:"course-detail__service-icon"},[e._v(e._s(t.shortName))])]})],2)},staticRenderFns:[]},a=s("VU/8")({name:"service",props:["services"]},i,!1,null,null,null);t.a=a.exports},GQ5V:function(e,t,s){"use strict";var i=s("6vT6"),a=s("SQAI"),n={name:"e-mini-coupon",mixins:[s("OPcZ").a],props:{item:{type:Object,default:function(){return{}}}}},r={render:function(){var e=this.$createElement;return(this._self._c||e)("van-tag",{staticClass:"mini-coupon ml5",attrs:{type:"danger"}},[this._v(this._s(this.priceHtml(this.item,!1)))])},staticRenderFns:[]},l=s("VU/8")(n,r,!1,null,null,null).exports,o=s("w/qc"),c=s("NyOD"),u={name:"onsale",mixins:[o.a,c.a],components:{coupon:a.a,miniCoupon:l,EPopup:i.a},props:["unreceivedCoupons","miniCoupons","activities"],data:function(){return{couponListShow:!1}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("e-panel",{attrs:{title:"优惠"}},[e.activities.groupon?s("van-cell",{staticClass:"course-detail__cell",attrs:{"is-link":""},on:{click:function(t){e.activityHandle(e.activities.groupon.id)}}},[s("template",{slot:"title"},[s("span",{staticClass:"text-12"},[e._v("拼团：")]),e._v(" "),s("van-tag",{staticClass:"ml5",staticStyle:{"background-color":"#ffaa00"}},[e._v("拼团")]),e._v(" "),s("span",{staticClass:"text-12 dark"},[e._v("跟好友一起买更划算哦！")])],1)],2):e._e(),e._v(" "),e.activities.cut?s("van-cell",{staticClass:"course-detail__cell",attrs:{"is-link":""},on:{click:function(t){e.activityHandle(e.activities.cut.id)}}},[s("template",{slot:"title"},[s("span",{staticClass:"text-12"},[e._v("砍价：")]),e._v(" "),s("van-tag",{staticClass:"ml5",staticStyle:{"background-color":"#ffaa00"}},[e._v("砍价")]),e._v(" "),s("span",{staticClass:"text-12 dark"},[e._v("最低可砍至1分钱！")])],1)],2):e._e(),e._v(" "),e.unreceivedCoupons.length?s("van-cell",{staticClass:"course-detail__cell",attrs:{"is-link":""},on:{click:function(t){e.couponListShow=!0}}},[s("template",{slot:"title"},[s("span",{staticClass:"text-12"},[e._v("领券：")]),e._v(" "),e._l(e.miniCoupons,function(e,t){return s("mini-coupon",{key:t,attrs:{item:e}})})],2)],2):e._e(),e._v(" "),s("e-popup",{staticClass:"coupon-popup white-background",attrs:{show:e.couponListShow,title:"优惠券"},on:{"update:show":function(t){e.couponListShow=t}}},[e._l(e.unreceivedCoupons,function(t,i){return s("coupon",{key:i,attrs:{index:i,coupon:t,showButton:!0},on:{couponHandle:function(t){e.couponHandle(t)}}})}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.unreceivedCoupons.length,expression:"!unreceivedCoupons.length"}],staticClass:"coupon-empty"},[s("img",{staticClass:"empty-img",attrs:{src:"static/images/coupon_empty.png"}}),e._v(" "),s("div",{staticClass:"empty-text"},[e._v("暂无优惠券")])])],2)],1)},staticRenderFns:[]},v=s("VU/8")(u,d,!1,null,null,null);t.a=v.exports},mjdf:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("fZjL"),a=s.n(i),n=(s("eqfM"),s("/QYm")),r=s("Dd8w"),l=s.n(r),o=(s("XmAh"),s("il3B")),c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("e-panel",{attrs:{title:e.title,defaulValue:e.defaulValue}},[e._l(e.teacherInfo,function(t){return e.teacherInfo.length?[s("div",{staticClass:"teacher-content"},[s("img",{staticClass:"avatar-img",attrs:{src:t.avatar&&t.avatar.large}}),e._v(" "),s("div",{staticClass:"teacher-cell"},[s("span",{staticClass:"dark font-family-PFM"},[e._v(e._s(t.nickname))]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.title,expression:"item.title"}],staticClass:"text-content"},[e._v(e._s(t.title))])])])]:e._e()})],2)},staticRenderFns:[]},u=s("VU/8")({name:"teacher",props:["teacherInfo","title","defaulValue"]},c,!1,null,null,null).exports,d={components:{countDown:s("lpC9").a},data:function(){return{counting:!0,isEmpty:!1}},props:{cover:{type:String,default:""},seckillActivities:{type:Object,default:null}},methods:{expire:function(){this.counting=!1},sellOut:function(){this.isEmpty=!0,this.$emit("goodsEmpty")}}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"course-detail__head"},[s("div",{staticClass:"course-detail__head--img"},[s("img",{attrs:{src:e.cover,alt:""}})]),e._v(" "),e.seckillActivities&&e.counting&&!e.isEmpty&&"ongoing"===e.seckillActivities.status?s("countDown",{attrs:{activity:e.seckillActivities},on:{timesUp:e.expire,sellOut:e.sellOut}}):e._e()],1)},staticRenderFns:[]},p=s("VU/8")(d,v,!1,null,null,null).exports,m=s("upIP"),h=s("oHlh"),f=s("rsAy"),_={name:"courseSetList",components:{course:h.a,moreMask:f.a},props:{courseSets:{default:null},title:{default:""},defaulValue:{default:""},disableMask:{type:Boolean,default:!1},feedback:{type:Boolean,default:!0}},data:function(){return{maxShowNum:5}},computed:{partCourseSets:function(){return this.courseSets.slice(0,5)}},methods:{loadMore:function(){this.$emit("update:disableMask",!0)}}},g={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("e-panel",{attrs:{title:e.title,needFlex:!1,defaulValue:e.defaulValue}},[e.courseSets.length?[!e.disableMask&&e.courseSets.length>5?s("moreMask",{attrs:{forceShow:!0},on:{maskLoadMore:e.loadMore}},[e._l(e.partCourseSets,function(t){return[s("course",{staticStyle:{"padding-left":"0","padding-right":"0"},attrs:{feedback:e.feedback,course:t}})]})],2):[e._l(e.courseSets,function(t){return[s("course",{staticStyle:{"padding-left":"0","padding-right":"0"},attrs:{feedback:e.feedback,course:t}})]})]]:e._e()],2)},staticRenderFns:[]},C=s("VU/8")(_,g,!1,null,null,null).exports,y=s("NYxO"),b=s("7/x9"),k=s("xPBg"),w={props:{details:{default:{}},joinStatus:{default:!1}},components:{service:b.a},filters:{filterPrice:function(e){return 0===Number(e)?"免费":"¥"+e}},watch:{learnExpiryHtml:{immediate:!0,handler:function(e){this.$emit("getLearnExpiry",{val:e})}}},computed:l()({},Object(y.mapState)(["vipSwitch"]),{learnExpiryHtml:function(){var e=this.joinStatus,t=this.details.expiryValue,s=this.details.expiryMode;if(e)return"forever"==s?"永久有效":0!=e.deadline?e.deadline.slice(0,10)+"之前可学习":"永久有效";switch(s){case"forever":return"永久有效";case"date":var i=new Date(1e3*t);return Object(k.formatFullTime)(i).slice(0,10)+"之前可学习";case"days":return t+"天内可学习"}}})},x={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"classroom-plan"},[s("e-panel",{attrs:{title:e.details.title}},[s("div",{staticClass:"course-detail__plan-price"},[s("span",{class:{isFree:0===Number(e.details.price)}},[e._v(e._s(e._f("filterPrice")(e.details.price)))]),e._v(" "),s("span",{staticClass:"plan-price__student-num"},[e._v(e._s(e.details.studentNum)+"人在学")])])]),e._v(" "),s("div",{staticClass:"course-detail__validity"},[e.details.vipLevel&&e.vipSwitch?s("div",{staticClass:"mb15"},[s("span",{staticClass:"mr20"},[e._v("会员免费")]),e._v(" "),s("img",{staticClass:"vipIcon",attrs:{src:e.details.vipLevel.icon}}),e._v(" "),s("router-link",{staticClass:"color-primary",attrs:{to:{path:"/vip",query:{id:e.details.vipLevel.id}}}},[e._v(e._s(e.details.vipLevel.name)+"免费学")])],1):e._e(),e._v(" "),e.details.service.length?s("service",{attrs:{services:e.details.service}}):e._e(),e._v(" "),s("div",[s("span",[e._v("学习有效期：")]),e._v(" "),s("span",{domProps:{innerHTML:e._s(e.learnExpiryHtml)}})])],1)],1)},staticRenderFns:[]},S=s("VU/8")(w,x,!1,null,null,null).exports,E=s("jW8y"),M=s("gyMJ"),L={components:{directory:E.a,detailHead:p,detailPlan:S,teacher:u,courseSetList:C,reviewList:m.a,moreMask:f.a},props:["details","planDetails"],data:function(){return{headBottom:0,active:1,scrollFlag:!1,tabs:["班级介绍","班级课程","学员评价"],tabsClass:"",errorMsg:""}},mounted:function(){window.addEventListener("touchmove",this.handleScroll),this.showDialog()},destroyed:function(){window.removeEventListener("touchmove",this.handleScroll)},methods:{showDialog:function(){var e=this,t="",s="",i=function(){};if(this.details.member&&(this.details.member.access&&(t=this.details.member.access.code),t&&"success"!==t))if(this.errorMsg=this.getErrorMsg(t),"classroom.expired"===t||"member.expired"===t){s="班级已到期，无法继续学习，是否退出";var a={id:this.details.classId};i=function(){M.a.deleteClassroom({query:a}).then(function(e){e.success?window.location.reload():n.a.fail("退出班级失败，请稍后重试")})},this.callConfirm(s,i)}else"vip.member_expired"===t?(s="会员已到期，请及时续费会员",i=function(){e.$router.push({path:"/vip"})},this.callConfirm(s,i)):n.a.fail(this.getErrorMsg(t))},handleScroll:function(){var e=this;if(!this.scrollFlag){this.scrollFlag=!0;var t=this.$refs;setTimeout(function(){e.headBottom=t.head.$el.getBoundingClientRect().bottom,e.scrollFlag=!1,e.tabsClass=e.headBottom<=0?"van-tabs--fixed":""},400)}},getErrorMsg:function(e){switch(e){case"classroom.not_found":return"当前班级不存在";case"classroom.unpublished":return"当前班级未发布";case"classroom.expired":return"当前班级已过期";case"user.not_login":return"用户未登录";case"user.locked":return"用户被锁定";case"member.not_found":return"用户未加入班级";case"member.auditor":return"用户是旁听生";case"member.expired":return"班级已过期";case"vip.vip_closed":return"网校已关闭会员功能";case"vip.not_login":return"用户未登录";case"vip.not_member":return"当前用户并不是vip";case"vip.member_expired":return"用户会员服务已过期";case"vip.level_not_exist":return"用户会员等级或班级会员不存在";case"vip.level_low":return"用户会员等级过低";default:return"异常错误"}},callConfirm:function(e,t){o.a.confirm({message:e,title:""}).then(function(){t()}).catch(function(){})}}},T={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"course-detail classroom-detail"},[s("div",{staticClass:"join-after"},[s("detail-head",{ref:"head",attrs:{cover:e.details.cover}}),e._v(" "),s("van-tabs",{class:e.tabsClass,model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.tabs,function(e){return s("van-tab",{key:e,attrs:{title:e}})})),e._v(" "),0==e.active?s("div",{staticStyle:{"margin-top":"44px"}},[s("detail-plan",{attrs:{details:e.planDetails,joinStatus:e.details.joinStatus}}),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("e-panel",{ref:"about",staticClass:"about",attrs:{title:"班级介绍"}},[s("div",{domProps:{innerHTML:e._s(e.details.summary)}})]),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("teacher",{staticClass:"teacher",attrs:{title:"教师介绍",teacherInfo:e.details.teachers}}),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("teacher",{staticClass:"teacher",attrs:{title:"班主任",teacherInfo:e.details.headTeacher?[e.details.headTeacher]:[],defaulValue:"尚未设置班主任"}})],1):e._e(),e._v(" "),1==e.active?s("div",{staticStyle:{"margin-top":"44px"}},[s("course-set-list",{ref:"course",attrs:{feedback:!e.errorMsg,courseSets:e.details.courses,title:"班级课程",defaulValue:"暂无课程",disableMask:!0},nativeOn:{click:function(t){return e.showDialog(t)}}})],1):e._e(),e._v(" "),2==e.active?s("div",{staticStyle:{"margin-top":"44px"}},[s("review-list",{ref:"review",attrs:{targetId:e.details.classId,reviews:e.details.reviews,title:"学员评价",defaulValue:"暂无评价",type:"classroom"}})],1):e._e()],1)])},staticRenderFns:[]},V=s("VU/8")(L,T,!1,null,null,null).exports,I=s("GQ5V"),A=s("1JqO"),D=s("w/qc"),$=s("NyOD"),F={mixins:[A.a,D.a,$.a],components:{directory:E.a,detailHead:p,detailPlan:S,teacher:u,courseSetList:C,reviewList:m.a,moreMask:f.a,onsale:I.a},props:["details","planDetails"],data:function(){return{tops:{aboutTop:0,courseTop:0,reviewTop:0},active:0,scrollFlag:!1,tabs:["班级介绍","班级课程","学员评价"],tabsClass:"",loadMoreAbout:!1,disableMask:!1,learnExpiry:"永久有效",unreceivedCoupons:[],miniCoupons:[],marketingActivities:{seckill:{}},isEmpty:!0}},computed:l()({},Object(y.mapState)(["user"]),{accessToJoin:function(){return"success"===this.details.access.code||"user.not_login"===this.details.access.code},vipAccessToJoin:function(){var e=!1;if(!this.details.vipLevel||!this.user.vip)return!1;this.details.vipLevel.seq<=this.user.vip.seq&&(e=!(new Date(this.user.vip.deadline).getTime()<(new Date).getTime()));return e},showOnsale:function(){return 0!==Number(this.planDetails.price)&&!!(this.unreceivedCoupons.length||a()(this.marketingActivities).length&&!this.onlySeckill)},onlySeckill:function(){return 1===a()(this.marketingActivities).length&&this.marketingActivities.seckill},showSeckill:function(){return 0!==Number(this.planDetails.price)&&this.marketingActivities.seckill&&!this.isEmpty}}),mounted:function(){var e=this;M.a.searchCoupon({params:{targetId:this.details.classId,targetType:"classroom"}}).then(function(t){e.unreceivedCoupons=t.data,e.miniCoupons=e.unreceivedCoupons.length>3?e.unreceivedCoupons.slice(0,4):e.unreceivedCoupons}).catch(function(e){console.error(e)}),M.a.classroomsActivities({query:{id:this.details.classId}}).then(function(t){e.marketingActivities=t,e.isEmpty=!t.seckill||!+t.seckill.productRemaind}).catch(function(e){console.error(e)}),window.addEventListener("touchmove",this.handleScroll),window.addEventListener("scroll",this.handleScroll),setTimeout(function(){window.scrollTo(0,0)},100)},destroyed:function(){window.removeEventListener("touchmove",this.handleScroll),window.removeEventListener("scroll",this.handleScroll)},methods:{onTabClick:function(e,t){var s=this.$refs[this.transIndex2Tab(e)];window.scrollTo(0,s.$el.offsetTop-44)},transIndex2Tab:function(e){return["about","course","review"][e]},handleScroll:function(){var e=this;if(!this.scrollFlag){this.scrollFlag=!0;var t=this.$refs,s=["about","course","review"].reverse();setTimeout(function(){a()(t).forEach(function(s){e.tops[s+"Top"]=t[s].$el.getBoundingClientRect().top}),e.scrollFlag=!1,e.tabsClass=e.tops.aboutTop-44<=0?"van-tabs--fixed":"";for(var i=0;i<s.length;i++){if(e.tops[s[i]+"Top"]-44<=0)return void(e.active=s.length-i-1)}},400)}},handleJoin:function(){var e=this,t=this.vipAccessToJoin;if(this.accessToJoin||t){var s=this.details,i=this.planDetails,a=1===Number(s.buyable)||0==+i.price||t;this.$store.state.token?a&&(!+i.price||t?M.a.joinClass({query:{classroomId:s.classId}}).then(function(t){e.details.joinStatus=t}).catch(function(e){console.error(e.message)}):this.$router.push({name:"order",params:{id:s.classId},query:{expiryScope:this.learnExpiry,targetType:"classroom"}})):this.$router.push({name:"login",query:{redirect:this.redirect}})}},getLearnExpiry:function(e){var t=e.val;this.learnExpiry=t},sellOut:function(){this.isEmpty=!0}}},j={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"course-detail classroom-detail"},[s("div",{staticClass:"join-before"},[s("detail-head",{attrs:{cover:e.details.cover,seckillActivities:e.marketingActivities.seckill},on:{goodsEmpty:e.sellOut}}),e._v(" "),s("detail-plan",{attrs:{details:e.planDetails,joinStatus:e.details.joinStatus},on:{getLearnExpiry:e.getLearnExpiry}}),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),e.showOnsale?[s("onsale",{attrs:{unreceivedCoupons:e.unreceivedCoupons,miniCoupons:e.miniCoupons,activities:e.marketingActivities}}),e._v(" "),s("div",{staticClass:"segmentation"})]:e._e(),e._v(" "),s("van-tabs",{class:e.tabsClass,on:{click:e.onTabClick},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.tabs,function(e){return s("van-tab",{key:e,attrs:{title:e}})})),e._v(" "),s("e-panel",{ref:"about",staticClass:"about",attrs:{title:"班级介绍"}},[s("more-mask",{attrs:{disabled:e.loadMoreAbout},on:{maskLoadMore:function(t){e.loadMoreAbout=!0}}},[s("div",{domProps:{innerHTML:e._s(e.details.summary)}})])],1),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("teacher",{staticClass:"teacher",attrs:{title:"教师介绍",teacherInfo:e.details.teachers}}),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("teacher",{staticClass:"teacher",attrs:{title:"班主任",teacherInfo:e.details.headTeacher?[e.details.headTeacher]:[],defaulValue:"尚未设置班主任"}}),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("course-set-list",{ref:"course",attrs:{courseSets:e.details.courses,title:"班级课程",defaulValue:"暂无课程",disableMask:e.disableMask},on:{"update:disableMask":function(t){e.disableMask=t}}}),e._v(" "),s("div",{staticClass:"segmentation"}),e._v(" "),s("review-list",{ref:"review",attrs:{targetId:e.details.classId,reviews:e.details.reviews,title:"学员评价",type:"classroom",defaulValue:"暂无评价"}}),e._v(" "),!e.marketingActivities.seckill||e.marketingActivities.seckill&&e.isEmpty||0==e.planDetails.price?s("e-footer",{attrs:{disabled:!e.accessToJoin},nativeOn:{click:function(t){return e.handleJoin(t)}}},[e._v("\n    "+e._s(e._f("filterJoinStatus")(e.details.access.code,"classroom",e.vipAccessToJoin)))]):e._e(),e._v(" "),e.showSeckill?s("e-footer",{attrs:{disabled:!e.accessToJoin,half:!!e.showSeckill},nativeOn:{click:function(t){return e.handleJoin(t)}}},[e._v(e._s(e._f("filterJoinStatus")(e.details.access.code,"classroom",e.vipAccessToJoin)))]):e._e(),e._v(" "),e.showSeckill?s("e-footer",{attrs:{half:!!e.showSeckill},nativeOn:{click:function(t){e.activityHandle(e.marketingActivities.seckill.id)}}},[e._v("去秒杀")]):e._e()],2)])},staticRenderFns:[]},O=s("VU/8")(F,j,!1,null,null,null).exports,N={components:{},data:function(){return{details:{isEmpty:!0,summary:"",joinStatus:!1,courses:[],teachers:[],assistants:[],headTeacher:{},access:{code:"加载中"},cover:"",reviews:[],classId:0,vipLevel:null},planDetails:{title:"",service:[],price:"0",studentNum:0,expiryMode:"forever",expiryValue:"0",vipLevel:null},currentComp:""}},computed:l()({},Object(y.mapState)({isLoading:function(e){return e.isLoading}})),watch:{"details.joinStatus":{handler:function(e){this.getComponent(e)}}},created:function(){var e=this,t=this.$route.params.id;M.a.getClassroomDetail({query:{classroomId:t}}).then(function(t){e.getComponent(t.member),e.getDetails(t)}).catch(function(e){n.a.fail(e.message)})},methods:{getDetails:function(e){var t=0===a()(e).length,s=e.about,i=!t&&e.member,n=e.courses,r=e.teachers,l=e.assistants,o=e.buyable,c=e.vipLevel,u=e.headTeacher,d=e.access,v=e.reviews,p=e.expiryMode,m=e.member,h=e.expiryValue,f=e.title,_=e.price,g=e.studentNum,C=e.service,y=e.cover.large,b=e.id,k={title:f,service:C,price:_,studentNum:g,expiryMode:p,expiryValue:h,vipLevel:c};this.planDetails=k,this.details={summary:s,joinStatus:i,isEmpty:t,courses:n,classId:b,buyable:o,vipLevel:c,teachers:r,assistants:l,headTeacher:u,access:d,cover:y,reviews:v,member:m}},getComponent:function(e){this.currentComp=e?V:O}}},H={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"course-detail"},[this.isLoading?t("e-loading"):this._e(),this._v(" "),t(this.currentComp,{tag:"component",attrs:{details:this.details,planDetails:this.planDetails}})],1)},staticRenderFns:[]},J=s("VU/8")(N,H,!1,null,null,null);t.default=J.exports},upIP:function(e,t,s){"use strict";var i=s("GK7I"),a=s("rsAy"),n={name:"reviewList",components:{review:i.a,moreMask:a.a},props:["reviews","title","targetId","defaulValue","type"],data:function(){return{maxShowNum:5}},methods:{loadMore:function(){this.$router.push({path:"/comment/"+this.targetId,query:{type:this.type}})}},computed:{isClass:function(){return"classroom"===this.type}}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("e-panel",{attrs:{title:e.title,needFlex:!1,defaulValue:e.defaulValue}},[e.reviews.length?s("moreMask",{attrs:{maxHeight:400},on:{maskLoadMore:e.loadMore}},[e._l(e.reviews,function(t){return[s("review",{attrs:{review:t,isClass:e.isClass,course:t.course}})]})],2):e._e()],1)},staticRenderFns:[]},l=s("VU/8")(n,r,!1,null,null,null);t.a=l.exports}});