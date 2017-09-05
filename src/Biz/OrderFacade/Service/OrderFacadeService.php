<?php

namespace Biz\OrderFacade\Service;

use Biz\OrderFacade\Product\Product;

interface OrderFacadeService
{
    public function create(Product $product);

    public function checkOrderBeforePay($sn, $params);

    public function getTradePayCashAmount($order, $coinAmount);

    public function createSpecialOrder(Product $product, $userId, $params = array());

    public function getOrderProduct($targetType, $params);
}
