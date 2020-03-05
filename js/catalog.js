
'use strict';

const PAGE_SIZE_MOBILE = 8;
const PAGE_SIZE_TABLET = 12;
const PAGE_SIZE_DESKTOP = 12;

let filterCategory = "women";
let filterFashion = "casual style";
let previousColumnsCount = 0;

window.onload = () => {
    renderGoods(getGoods(), createBanner());
    renderBagStatus()
};
window.onresize = () => {
    renderGoods(getGoods(), createBanner());
    renderBagStatus()
};

function renderBagStatus() {
    let totalPrice = document.getElementById("totalPrice");
    let totalPriceMobile = document.getElementById("totalPriceMobile");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
    totalPriceMobile.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
}


let goodTemplate = _.template(document.getElementById('template-good-item').innerHTML);

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

function createBanner() {
    let banner = document.createElement("div");
    banner.setAttribute("class", "catalog__banner");

    let bannerTitle = document.createElement("div");
    let bannerTitleMain = document.createElement("span");
    bannerTitleMain.setAttribute("class", "catalog__banner-main-text");
    let bannerTitleTextMain = document.createTextNode("extra 50% ");

    let bannerTitleTextStart = document.createTextNode("Last weekend ");

    let bannerTitleTextMainEnd = document.createTextNode("off on all reduced boots and shoulder bags");
    bannerTitle.appendChild(bannerTitleMain);
    bannerTitle.appendChild(bannerTitleTextStart);
    bannerTitle.appendChild(bannerTitleMain);
    bannerTitleMain.appendChild(bannerTitleTextMain);
    bannerTitle.appendChild(bannerTitleTextMainEnd);

    bannerTitle.setAttribute("class", "catalog__banner-title");

    banner.appendChild(bannerTitle);

    let bannerSubtitle = document.createElement("p");
    let bannerSubtitleText = document.createTextNode("This offer is valid in-store and online. " +
        "Prices displayed reflect this additional discount." +
        " This offer ends at 11:59 GMT on March 1st 2019");
    bannerSubtitle.appendChild(bannerSubtitleText);
    bannerSubtitle.setAttribute("class", "catalog__banner-subtitle");
    banner.appendChild(bannerSubtitle);
    return banner;
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
