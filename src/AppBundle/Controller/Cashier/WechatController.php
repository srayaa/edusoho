<?php

namespace AppBundle\Controller\Cashier;

use AppBundle\Component\Payment\Wxpay\JsApiPay;
use Omnipay\WechatPay\Helper;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Common\MathToolkit;

class WechatController extends PaymentController
{
    public function pcPayAction($trade)
    {
        $trade['platform_type'] = 'Native';
        $trade['notify_url'] = $this->generateUrl('cashier_pay_notify', array('payment' => 'wechat'), true);
        $result = $this->getPayService()->createTrade($trade);

        if ($result['status'] == 'paid') {
            return $this->createJsonResponse(array(
                'isPaid' => 1,
                'redirectUrl' => $this->generateUrl('cashier_pay_success', array('trade_sn' => $result['trade_sn'])),
            ));
        }

        if ($result['platform_created_result']['return_code'] == 'SUCCESS') {
            return $this->createJsonResponse(array(
                'isPaid' => 0,
                'showQrcode' => 1,
                'redirectUrl' => $this->generateUrl('cashier_wechat_qrcode', array('tradeSn' => $result['trade_sn'])),
            ));
        }

        return $this->createJsonResponse(array('error' => $result['platform_created_result']['return_msg']), 500);
    }

    public function qrcodeAction(Request $request)
    {
        $tradeSn = $request->query->get('tradeSn');
        $trade = $this->getPayService()->getTradeByTradeSn($tradeSn);

        return $this->render('cashier/wechat/qrcode.html.twig', array(
            'trade' => $trade,
        ));
    }

    public function mobilePayAction(Request $request, $trade)
    {
        $user = $this->getUser();

        if (!$user->isLogin()) {
            return $this->createMessageResponse('error', '用户未登录，支付失败。');
        }

        if ($tradeSn = $request->query->get('tradeSn')) {
            $trade = $this->getPayService()->getTradeByTradeSn($tradeSn);
        }

        $biz = $this->getBiz();

        $request = $this->get('request_stack')->getMasterRequest();

        $options = $biz['payment.platforms.options']['wechat'];
        $jsApi = new JsApiPay(array(
            'appid' => $options['appid'],
            'account' => $options['mch_id'],
            'key' => $options['key'],
            'secret' => $options['secret'],
            'redirect_uri' => $this->generateUrl('cashier_wechat_mobile_pay', array('tradeSn' => $trade['sn']), true),
            'isMicroMessenger' => true,
        ), $request);

        $openid = $jsApi->getOpenid();

        if ($user['id'] != $trade['user_id']) {
            return $this->createMessageResponse('error', '不是您创建的订单，支付失败');
        }

        $trade['open_id'] = $openid;
        $trade['platform_type'] = 'Js';
        $trade['notify_url'] = $this->generateUrl('cashier_pay_notify', array('payment' => 'wechat'), true);
        $result = $this->getPayService()->createTrade($trade);

        if ($result['status'] == 'paid') {
            return $this->redirect($this->generateUrl('cashier_pay_success', array('trade_sn' => $result['trade_sn'])));
        }

        $result = MathToolkit::multiply(
            $result,
            array('cash_amount'),
            0.01
        );

        return $this->render(
            'cashier/wechat/h5.html.twig', array(
            'trade' => $result,
            'jsApiParameters' => json_encode($result['platform_created_result']),
        ));
    }

    public function h5ReturnAction(Request $request)
    {
        $tradeSn = $request->query->get('tradeSn');
        $trade = $this->getPayService()->queryTradeFromPlatform($tradeSn);

        if ($trade['trade_state'] === 'SUCCESS') {
            $this->getPayService()->notifyPaid('wechat', Helper::array2xml($trade));
        }

        return $this->redirect($this->generateUrl('cashier_pay_success', array('trade_sn' => $tradeSn)));
    }

    public function rollAction(Request $request)
    {
        $tradeSn = $request->query->get('tradeSn');
        $trade = $this->getPayService()->queryTradeFromPlatform($tradeSn);

        if ($trade['trade_state'] === 'SUCCESS') {
            $this->getPayService()->notifyPaid('wechat', Helper::array2xml($trade));

            return $this->createJsonResponse(array(
                'isPaid' => 1,
                'redirectUrl' => $this->generateUrl('cashier_pay_success', array('trade_sn' => $tradeSn)),
            ));
        } else {
            return $this->createJsonResponse(array(
                'isPaid' => 0,
            ));
        }
    }

    public function notifyAction(Request $request, $payment)
    {
        $result = $this->getPayService()->notifyPaid($payment, $request->getContent());

        return $this->createJsonResponse($result);
    }
}