'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShoppingBag = function () {
    function ShoppingBag() {
        _classCallCheck(this, ShoppingBag);
    }

    _createClass(ShoppingBag, [{
        key: 'chooseGood',
        value: function chooseGood(id, size, color) {
            var chosenGoods = this.chosen;
            var chosenGood = this.fromBag(chosenGoods, id, size, color);
            if (chosenGood == null) chosenGood = this.fromDataSource(id, size, color);

            chosenGood.quantity++;

            var index = chosenGoods.indexOf(chosenGood);
            if (index === -1) {
                chosenGoods.push(chosenGood);
            } else {
                chosenGoods.splice(index, 1, chosenGood);
            }
            dataSource.saveShoppingBag(chosenGoods);
        }
    }, {
        key: 'unchooseGood',
        value: function unchooseGood(id, size, color) {
            var chosenGoods = this.chosen;
            var chosenGood = this.fromBag(chosenGoods, id, size, color);
            if (chosenGood == null) {
                return;
            }

            chosenGood.quantity--;

            var index = chosenGoods.indexOf(chosenGood);
            if (index >= 0) {
                chosenGoods.splice(index, 1, chosenGood);
            }
            if (chosenGood.quantity <= 0) {
                chosenGoods.splice(index, 1);
            }
            dataSource.saveShoppingBag(chosenGoods);
        }
    }, {
        key: 'unchooseAllGoodItems',
        value: function unchooseAllGoodItems(id, size, color) {
            var chosenGoods = this.chosen;
            var chosenGood = this.fromBag(chosenGoods, id, size, color);
            if (chosenGood == null) {
                return;
            }
            var index = chosenGoods.indexOf(chosenGood);
            chosenGoods.splice(index, 1);
            dataSource.saveShoppingBag(chosenGoods);
        }

        // noinspection JSMethodCanBeStatic

    }, {
        key: 'clearAll',
        value: function clearAll() {
            dataSource.saveShoppingBag([]);
        }
    }, {
        key: 'fromBag',
        value: function fromBag(chosenGoods, id, size, color) {
            for (var i = 0; i < chosenGoods.length; i++) {
                var good = chosenGoods[i];
                if (good.id === id && good.size === size && good.color === color) {
                    return good;
                }
            }
            return null;
        }
    }, {
        key: 'fromDataSource',
        value: function fromDataSource(id, size, color) {
            var goods = dataSource.goods;
            for (var i = 0; i < goods.length; i++) {
                var good = goods[i];
                if (good.id === id && containsElem(good.sizes, size) && containsElem(good.colors, color)) {
                    return ChosenGood.new(good, size, color);
                }
            }
            return null;
        }
    }, {
        key: 'chosen',


        // noinspection JSMethodCanBeStatic
        get: function get() {
            return dataSource.getShoppingBag();
        }
    }, {
        key: 'price',
        get: function get() {
            var price = 0;
            var goods = this.chosen;

            for (var i = 0; i < goods.length; i++) {
                price += goods[i].price * goods[i].quantity;
            }
            return price;
        }
    }, {
        key: 'size',
        get: function get() {
            var size = 0;
            var goods = this.chosen;

            for (var i = 0; i < goods.length; i++) {
                size += goods[i].quantity;
            }
            return size;
        }
    }], [{
        key: 'checkout',
        value: function checkout() {
            dataSource.saveShoppingBag([]);
        }
    }]);

    return ShoppingBag;
}();

function containsElem(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}
var shoppingBag = new ShoppingBag();

shoppingBag.clearAll();
shoppingBag.chooseGood('8c061815-6a7d-4465-bb78-1bdc6c5adebf', 'UK 17', 'Phillipa wash');
shoppingBag.chooseGood('ff665110-5e7f-435d-b1b4-651c3d5050ca', 'UK 18', 'Blue');
shoppingBag.chooseGood('07cf6ce2-6eee-4e78-a441-f257fdea7ed6', 'UK 18', 'Black');
shoppingBag.chooseGood('8b300772-eee3-4ff1-b091-e89f17e0e469', 'UK 19', 'Green');

var chosenGoodTemplate = void 0;

window.onload = function () {
    chosenGoodTemplate = _.template(document.getElementById('template-shopping-bag').innerHTML);
    document.getElementById("emptyBag").addEventListener("click", function () {
        shoppingBag.clearAll();
        renderData();
    });
    document.getElementById("checkout").addEventListener("click", function () {
        shoppingBag.clearAll();
        renderData();
        var message = document.getElementById('goodsContainerTextMessage');
        var messageContainer = document.createElement("span");
        var messageText = document.createTextNode("Thank you for your purchase");

        messageContainer.appendChild(messageText);
        message.appendChild(messageContainer);
    });
    renderData();
};
function createTextMessage() {
    var message = document.getElementById('goodsContainerTextMessage');
    var messageContainer = document.createElement("span");
    var messageText = document.createTextNode("Your shopping bag is empty. Use Catalog to add new items");

    messageContainer.appendChild(messageText);
    message.appendChild(messageContainer);
}

function renderMessage() {
    if (shoppingBag.size === 0) {
        createTextMessage();
    } else {
        return shoppingBag;
    }
}

window.onresize = function () {
    renderGoods(shoppingBag.chosen);
};

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function renderData() {

    renderGoods(shoppingBag.chosen);
    renderBagStatus();
    renderMessage();
}

function renderBagStatus() {
    var totalPriceMobile = document.getElementById("totalPriceMobile");
    totalPriceMobile.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";

    var totalPrice = document.getElementById("totalPrice");
    var totalPriceBottom = document.getElementById("totalPriceBottom");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
    totalPriceBottom.innerHTML = "Total price: £" + shoppingBag.price;
}

function renderGoods(goods) {
    var container = document.getElementById("goodsContainer");
    clearContainer(container);

    var columnsCount = defineColumnsCount();
    var goodsCount = goods.length;

    var rowsCount = Math.ceil(goodsCount / columnsCount);
    var rows = createRows(rowsCount, columnsCount, goodsCount, goods);
    rowsCount = rows.length;

    for (var i = 0; i < rowsCount; i++) {
        container.appendChild(rows[i]);
    }
}

function createRows(rowsCount, columnsCount, goodsCount, goods) {
    var rows = [];

    var goodIndex = 0;
    for (var row = 0; row < rowsCount; row++) {
        var cards = [];
        for (var column = 0; column < columnsCount && goodIndex < goodsCount; column++, goodIndex++) {
            var good = goods[goodIndex];
            var card = createChosenGoodCard(chosenGoodTemplate, good, function (good) {
                shoppingBag.unchooseGood(good.id, good.size, good.color);
                renderData();
            }, function (good) {
                shoppingBag.chooseGood(good.id, good.size, good.color);
                renderData();
            }, function (good) {
                shoppingBag.unchooseAllGoodItems(good.id, good.size, good.color);
                renderData();
            }, function (good) {
                document.location.href = "item.html";
            });
            cards.push(card);
        }
        rows.push(createRow(cards));
    }
    return rows;
}

function defineColumnsCount() {
    var width = window.innerWidth;
    if (width > WIDTH_TABLET) return 2;else if (width > WIDTH_PHONE) return 2;else return 1;
}