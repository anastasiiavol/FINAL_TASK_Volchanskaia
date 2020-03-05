'use strict';

class ShoppingBag {

    // noinspection JSMethodCanBeStatic
    get chosen() {
        return dataSource.getShoppingBag();
    }

    get price() {
        let price = 0;
        let goods = this.chosen;

        for (let i = 0; i < goods.length; i++) {
            price += goods[i].price * goods[i].quantity;
        }
        return price;
    }

    get size() {
        let size = 0;
        let goods = this.chosen;

        for (let i = 0; i < goods.length; i++) {
            size += goods[i].quantity;
        }
        return size;
    }

    chooseGood(id, size, color) {
        let chosenGoods = this.chosen;
        let chosenGood = this.fromBag(chosenGoods, id, size, color);
        if (chosenGood == null) chosenGood = this.fromDataSource(id, size, color);

        chosenGood.quantity++;

        let index = chosenGoods.indexOf(chosenGood);
        if (index === -1) {
            chosenGoods.push(chosenGood);
        } else {
            chosenGoods.splice(index, 1, chosenGood);
        }
        dataSource.saveShoppingBag(chosenGoods);
    }

    unchooseGood(id, size, color) {
        let chosenGoods = this.chosen;
        let chosenGood = this.fromBag(chosenGoods, id, size, color);
        if (chosenGood == null) {
            return;
        }

        chosenGood.quantity--;

        let index = chosenGoods.indexOf(chosenGood);
        if (index >= 0) {
            chosenGoods.splice(index, 1, chosenGood)
        }
        if (chosenGood.quantity <= 0) {
            chosenGoods.splice(index, 1);
        }
        dataSource.saveShoppingBag(chosenGoods);
    }


    unchooseAllGoodItems(id, size, color) {
        let chosenGoods = this.chosen;
        let chosenGood = this.fromBag(chosenGoods, id, size, color);
        if (chosenGood == null) {
            return;
        }
        let index = chosenGoods.indexOf(chosenGood);
        chosenGoods.splice(index, 1);
        dataSource.saveShoppingBag(chosenGoods);
    }

    // noinspection JSMethodCanBeStatic
    clearAll() {
        dataSource.saveShoppingBag([]);
    }

    static checkout() {
        dataSource.saveShoppingBag([]);
    }

    fromBag(chosenGoods, id, size, color) {
        for (let i = 0; i < chosenGoods.length; i++) {
            let good = chosenGoods[i];
            if (good.id === id && good.size === size && good.color === color) {
                return good;
            }
        }
        return null;
    }


    fromDataSource(id, size, color) {
        let goods = dataSource.goods;
        for (let i = 0; i < goods.length; i++) {
            let good = goods[i];
    if(good.id === id && containsElem(good.sizes, size) && containsElem(good.colors, color)){
                return ChosenGood.new(good, size, color);
            }
        }
        return null;
    }
}

function containsElem(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}
let shoppingBag = new ShoppingBag();

shoppingBag.clearAll();
shoppingBag.chooseGood('8c061815-6a7d-4465-bb78-1bdc6c5adebf', 'UK 17', 'Phillipa wash');
shoppingBag.chooseGood('ff665110-5e7f-435d-b1b4-651c3d5050ca', 'UK 18', 'Blue');
shoppingBag.chooseGood('07cf6ce2-6eee-4e78-a441-f257fdea7ed6', 'UK 18', 'Black');
shoppingBag.chooseGood('8b300772-eee3-4ff1-b091-e89f17e0e469', 'UK 19', 'Green');

let chosenGoodTemplate;

window.onload = () => {
    chosenGoodTemplate = _.template(document.getElementById('template-shopping-bag').innerHTML);
    document.getElementById("emptyBag").addEventListener("click", () => {
        shoppingBag.clearAll();
        renderData();


    });
    document.getElementById("checkout").addEventListener("click", () => {
        shoppingBag.clearAll();
        renderData();
        let message = document.getElementById('goodsContainerTextMessage');
        let messageContainer = document.createElement("span");
        let messageText = document.createTextNode("Thank you for your purchase");

        messageContainer.appendChild(messageText);
        message.appendChild(messageContainer);
    });
    renderData();
};
function createTextMessage(){
    let message = document.getElementById('goodsContainerTextMessage');
    let messageContainer = document.createElement("span");
    let messageText = document.createTextNode("Your shopping bag is empty. Use Catalog to add new items");

    messageContainer.appendChild(messageText);
    message.appendChild(messageContainer);
}

function renderMessage(){
    if (shoppingBag.size ===0){
        createTextMessage();
    }else {
        return shoppingBag;
    }
}

window.onresize = () => {
    renderGoods(shoppingBag.chosen);

};

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function renderData() {

    renderGoods(shoppingBag.chosen);
    renderBagStatus();
    renderMessage();

}

function renderBagStatus() {
    let totalPriceMobile = document.getElementById("totalPriceMobile");
    totalPriceMobile.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";

    let totalPrice = document.getElementById("totalPrice");
    let totalPriceBottom = document.getElementById("totalPriceBottom");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
    totalPriceBottom.innerHTML = "Total price: £" + shoppingBag.price;
}

function renderGoods(goods) {
    let container = document.getElementById("goodsContainer");
    clearContainer(container);

    let columnsCount = defineColumnsCount();
    let goodsCount = goods.length;

    let rowsCount = Math.ceil(goodsCount / columnsCount);
    let rows = createRows(rowsCount, columnsCount, goodsCount, goods);
    rowsCount = rows.length;

    for (let i = 0; i < rowsCount; i++) {
        container.appendChild(rows[i]);
    }
}

function createRows(rowsCount, columnsCount, goodsCount, goods) {
    let rows = [];

    let goodIndex = 0;
    for (let row = 0; row < rowsCount; row++) {
        let cards = [];
        for (let column = 0; column < columnsCount && goodIndex < goodsCount; column++, goodIndex++) {
            let good = goods[goodIndex];
            let card = createChosenGoodCard(
                chosenGoodTemplate,
                good,
                (good) => {
                    shoppingBag.unchooseGood(good.id, good.size, good.color);
                    renderData();
                },
                (good) => {
                    shoppingBag.chooseGood(good.id, good.size, good.color);
                    renderData();
                },
                (good) => {
                    shoppingBag.unchooseAllGoodItems(good.id, good.size, good.color);
                    renderData();
                },
                (good) => {
                    document.location.href = "item.html";
                }
            );
            cards.push(card);
        }
        rows.push(createRow(cards));
    }
    return rows;
}

function defineColumnsCount() {
    let width = window.innerWidth;
    if (width > WIDTH_TABLET) return 2;
    else if (width > WIDTH_PHONE) return 2;
    else return 1;
}
