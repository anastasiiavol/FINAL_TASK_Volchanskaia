'use strict';

/*
let shoppingBag = new ShoppingBag();
shoppingBag.clearAll();
shoppingBag.chooseGood('8c061815-6a7d-4465-bb78-1bdc6c5adebf', 'UK 17', 'Phillipa wash');
shoppingBag.chooseGood('ff665110-5e7f-435d-b1b4-651c3d5050ca', 'UK 18', 'Blue');
shoppingBag.chooseGood('07cf6ce2-6eee-4e78-a441-f257fdea7ed6', 'UK 18', 'Black');
shoppingBag.chooseGood('8b300772-eee3-4ff1-b091-e89f17e0e469', 'UK 19', 'Green');
*/

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
        if (chosenGood == null) chosenGood = this.fromDataSource(id, size, color, chosenGood);

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
        if (chosenGood.quantity === 0) {
            chosenGoods.remove(index);
        }
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
        return _.find(chosenGoods, (good) => good.id === id && good.size === size && good.color === color);
    }

    fromDataSource(id, size, color, chosenGood) {
        let good = _.find(
            dataSource.goods,
            (good) => good.id === id && good.sizes.includes(size) && good.colors.includes(color)
        );
        chosenGood = ChosenGood.new(good, size, color);
        return chosenGood;
    }
}



const PAGE_SIZE_MOBILE = 1;
const PAGE_SIZE_TABLET = 2;
const PAGE_SIZE_DESKTOP = 2;

let filterCategory = "women";
let filterFashion = "casual style";
let previousColumnsCount = 0;

window.onload = () => {
    renderGoods(getGoods());
};
window.onresize = () => {
    renderGoods(getGoods());
};

function getGoods() {
    let goods = [...dataSource.getGoods()];
    goods = _.filter(goods, (good) => good.category.toLowerCase() === filterCategory.toLowerCase());
    goods = _.filter(goods, (good) => good.fashion.toLowerCase() === filterFashion.toLowerCase());
    goods = _.sortBy(goods, (good) => good.dateAdded).reverse();
    return goods;
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function renderGoods(goods ) {
    let columnsCount = defineColumnsCount();
    if (previousColumnsCount === columnsCount) {
        return;
    }
    previousColumnsCount = columnsCount;

    let goodsCount = Math.min(goods.length, definePageSize(columnsCount));
    let rowsCount = Math.ceil(goodsCount / columnsCount);
    let rows = createRows(rowsCount, columnsCount, goodsCount, goods);

    rowsCount = rows.length;

    let container = document.getElementById("goodsContainer");

    clearContainer(container);
    for (let i = 0; i < rowsCount; i++) {
        container.appendChild(rows[i]);
    }
}

function createRows(rowsCount, columnsCount, goodsCount, goods) {
    let rows = [];

    let template = _.template(document.getElementById('template-shopping-bag').innerHTML);

    let goodIndex = 0;
    for (let row = 0; row < rowsCount; row++) {
        let cards = [];
        for (let column = 0; column < columnsCount && goodIndex < goodsCount; column++, goodIndex++) {
            let good = goods[goodIndex];
            let card = createCard(template, good);
            cards.push(card);
        }
        rows.push(createRow(cards));
    }
    return rows;
}

function definePageSize(columnsCount) {
    if (columnsCount > MAX_COLUMNS_COUNT_TABLET) return PAGE_SIZE_DESKTOP;
    else if (columnsCount > MAX_COLUMNS_COUNT_MOBILE) return PAGE_SIZE_TABLET;
    else return PAGE_SIZE_MOBILE;
}

function defineColumnsCount() {
    let width = window.innerWidth;
    if (width > WIDTH_TABLET) return MAX_COLUMNS_COUNT_DESKTOP;
    else if (width > WIDTH_PHONE) return MAX_COLUMNS_COUNT_TABLET;
    else return MAX_COLUMNS_COUNT_MOBILE;
}

function increaseValue() {
    let value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
}

function decreaseValue() {
    let value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
}