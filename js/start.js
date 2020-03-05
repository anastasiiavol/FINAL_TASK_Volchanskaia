'use strict';

const PAGE_SIZE_MOBILE = 2;
const PAGE_SIZE_TABLET = 3;
const PAGE_SIZE_DESKTOP = 4;

let filterCategory = "women";
let filterFashion = "casual style";
let previousColumnsCount = 0;

let goodTemplate = _.template(document.getElementById('template-good-item').innerHTML);

window.onload = () => {
    renderData()
};
window.onresize = () => {
    renderData()
};

function renderData() {
    renderBagStatus();
    renderGoods(getGoods());
}

function renderBagStatus() {
    let totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
}

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

function renderGoods(goods, banner) {
    let columnsCount = defineColumnsCount();
    if (previousColumnsCount === columnsCount) {
        return;
    }
    previousColumnsCount = columnsCount;

    let goodsCount = Math.min(goods.length, definePageSize(columnsCount));
    let rowsCount = Math.ceil(goodsCount / columnsCount);
    let rows = createRows(rowsCount, columnsCount, goodsCount, goods);

    rows.splice(1, 0, banner);
    rowsCount = rows.length;

    let container = document.getElementById("goodsContainer");

    clearContainer(container);
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
            let card = createGoodCard(goodTemplate, good);
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
