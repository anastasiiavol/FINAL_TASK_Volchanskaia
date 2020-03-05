'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_SHOPPING_BAG = "shoppingBag";
var KEY_BEST_OFFER = "bestOffer";

localStorage.setItem(KEY_SHOPPING_BAG, "");
localStorage.setItem(KEY_BEST_OFFER, window.bestOffer);

var DataSource = function () {
    function DataSource() {
        _classCallCheck(this, DataSource);

        this.goods = window.catalog;

        var shoppingBagJSON = localStorage.getItem(KEY_SHOPPING_BAG);
        try {
            this.shoppingBag = JSON.parse(shoppingBagJSON).map(function (value) {
                return Object.assign(new ChosenGood(), value);
            });
        } catch (e) {
            this.shoppingBag = [];
        }
    }

    _createClass(DataSource, [{
        key: "getGoods",
        value: function getGoods() {
            return this.goods;
        }
    }, {
        key: "getGood",
        value: function getGood(id) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === id) return this.goods[i];
            }
            return null;
        }
    }, {
        key: "getShoppingBag",
        value: function getShoppingBag() {
            return this.shoppingBag;
        }
    }, {
        key: "saveShoppingBag",
        value: function saveShoppingBag(shoppingBag) {
            this.shoppingBag = shoppingBag;
            localStorage.setItem(KEY_SHOPPING_BAG, JSON.stringify(shoppingBag));
        }
    }]);

    return DataSource;
}();

var dataSource = new DataSource();