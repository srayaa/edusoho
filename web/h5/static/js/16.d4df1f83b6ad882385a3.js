webpackJsonp([16],{NDEt:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("Xxa5"),n=e.n(i),s=e("woOf"),r=e.n(s),c=(e("eqfM"),e("/QYm")),o=e("exGp"),y=e.n(o),d=e("Dd8w"),l=e.n(d),p=e("gyMJ"),u=(e("mtWM"),e("NYxO")),g={data:function(){return{detail:{},payWay:"",selected:!0,paySettings:{},inWechat:this.isWeixinBrowser(),targetType:this.$route.query.targetType,timeoutId:-1}},computed:l()({},Object(u.mapState)({isLoading:function(a){return a.isLoading}}),{validPayWay:function(){return this.paySettings.wxpayEnabled||this.paySettings.alipayEnabled&&!this.inWechat}}),created:function(){var a=this;return y()(n.a.mark(function t(){var e,i,s,o,y;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p.a.getSettings({query:{type:"payment"}}).catch(function(a){c.a.fail(a.message)});case 2:a.paySettings=t.sent,a.paySettings.alipayEnabled&&!a.inWechat?a.payWay="Alipay_LegacyH5":a.paySettings.wxpayEnabled&&(a.payWay="WechatPay_H5"),e=a.$route.query,i=e.source,s=e.id,o=e.sn,y=e.targetId,"order"!==i?p.a.createOrder({data:{targetType:a.targetType,targetId:s,isOrderCreate:1,couponCode:a.$route.params.couponCode,unit:a.$route.params.unit,num:a.$route.params.num}}).then(function(t){a.detail=r()({},t)}).catch(function(a){c.a.fail(a.message)}):p.a.getOrderDetail({query:{sn:o}}).then(function(t){"success"===t.status&&y&&a.$router.push({path:"/course/"+y}),a.detail=r()({},t)}).catch(function(a){c.a.fail(a.message)});case 6:case"end":return t.stop()}},t,a)}))()},beforeRouteLeave:function(a,t,e){clearTimeout(this.timeoutId),e()},methods:{handlePay:function(){var a=this;this.validPayWay&&("WechatPay_H5"===this.payWay&&this.inWechat?window.location.href=window.location.origin+"/pay/center/wxpay_h5?pay_amount="+this.detail.pay_amount+"&title="+this.detail.title+"&sn="+this.detail.sn:p.a.createTrade({data:{gateway:this.payWay,type:"purchase",orderSn:this.detail.sn,app_pay:"Y"}}).then(function(t){"WechatPay_H5"!==a.payWay?window.location.href=t.payUrl:a.getTradeInfo(t.tradeSn).then(function(){window.location.href=t.mwebUrl})}).catch(function(a){c.a.fail(a.message)}))},isWeixinBrowser:function(){return/micromessenger/.test(navigator.userAgent.toLowerCase())},getTradeInfo:function(a){var t=this;return p.a.getTrade({query:{tradesSn:a}}).then(function(e){e.isPaid?window.location.href=window.location.origin+e.paidSuccessUrlH5:t.timeoutId=setTimeout(function(){t.getTradeInfo(a)},2e3)}).catch(function(a){c.a.fail(a.message)})}}},h={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"payPage"},[a.isLoading?e("e-loading"):a._e(),a._v(" "),e("div",{staticClass:"payPage__order"},[e("div",{staticClass:"order__head"},[a._v("\n      支付方式\n    ")]),a._v(" "),e("div",{staticClass:"order__infomation"},[e("div",{staticClass:"title"},[a._v(a._s(a.detail.title))]),a._v(" "),e("div",{staticClass:"sum"},[e("span",[a._v("待支付")]),a._v(" "),e("span",{staticClass:"sum__price"},[a._v("¥ "),e("span",{staticClass:"num"},[a._v(a._s(a._f("toMoney")(a.detail.pay_amount)))])])]),a._v(" "),e("div",{staticClass:"payWay"},[e("div",{directives:[{name:"show",rawName:"v-show",value:a.paySettings.alipayEnabled&&!a.inWechat,expression:"paySettings.alipayEnabled && !inWechat"}],class:["payWay__item",{"payWay__item--selected":"Alipay_LegacyH5"===a.payWay}],on:{click:function(t){a.payWay="Alipay_LegacyH5",a.selected=!0}}},[e("img",{staticClass:"correct",attrs:{src:"static/images/correct.png"}}),a._v(" "),e("div",{staticClass:"right"}),a._v(" "),e("img",{attrs:{src:"static/images/zfb.png"}})]),a._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:a.paySettings.wxpayEnabled,expression:"paySettings.wxpayEnabled"}],class:["payWay__item",{"payWay__item--selected":"WechatPay_H5"===a.payWay}],on:{click:function(t){a.payWay="WechatPay_H5",a.selected=!1}}},[e("img",{staticClass:"correct",attrs:{src:"static/images/correct.png"}}),a._v(" "),e("div",{staticClass:"right"}),a._v(" "),e("img",{attrs:{src:"static/images/wx.png"}})])])])]),a._v(" "),e("div",{class:["payPage__payBtn",{disabled:!a.validPayWay}],on:{click:a.handlePay}},[a._v("\n    "+a._s(a.validPayWay?"立即支付":"无可用支付方式")+"\n  ")])],1)},staticRenderFns:[]},_=e("VU/8")(g,h,!1,null,null,null);t.default=_.exports}});