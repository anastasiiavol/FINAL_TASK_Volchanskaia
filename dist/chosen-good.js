'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DISCOUNT = 15;

var ChosenGood = function () {
    function ChosenGood(id, dateAdded, title, description, discountedPrice, price, hasNew, category, fashion, color, size, thumbnail, preview, quantity) {
        _classCallCheck(this, ChosenGood);

        this.id = id;
        this.dateAdded = dateAdded;
        this.title = title;
        this.description = description;
        this.discountedPrice = discountedPrice;
        this.price = price;
        this.hasNew = hasNew;
        this.category = category;
        this.fashion = fashion;
        this.color = color;
        this.size = size;
        this.thumbnail = thumbnail;
        this.preview = preview;
        this.quantity = quantity;
    }

    _createClass(ChosenGood, null, [{
        key: 'new',
        value: function _new(good, color, size) {
            return new ChosenGood(good.id, good.dateAdded, good.title, good.description, good.discountedPrice, good.price, good.hasNew, good.category, good.fashion, color, size, good.thumbnail, good.preview, 0);
        }
    }]);

    return ChosenGood;
}();