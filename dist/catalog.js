
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PAGE_SIZE_MOBILE = 8;
var PAGE_SIZE_TABLET = 12;
var PAGE_SIZE_DESKTOP = 12;

var filterCategory = "women";
var filterFashion = "casual style";
var previousColumnsCount = 0;

window.onload = function () {
    renderGoods(getGoods(), createBanner());
    renderBagStatus();
};
window.onresize = function () {
    renderGoods(getGoods(), createBanner());
    renderBagStatus();
};

function renderBagStatus() {
    var totalPrice = document.getElementById("totalPrice");
    var totalPriceMobile = document.getElementById("totalPriceMobile");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
    totalPriceMobile.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
}

var goodTemplate = _.template(document.getElementById('template-good-item').innerHTML);

function getGoods() {
    var goods = [].concat(_toConsumableArray(dataSource.getGoods()));
    goods = _.filter(goods, function (good) {
        return good.category.toLowerCase() === filterCategory.toLowerCase();
    });
    goods = _.filter(goods, function (good) {
        return good.fashion.toLowerCase() === filterFashion.toLowerCase();
    });
    goods = _.sortBy(goods, function (good) {
        return good.dateAdded;
    }).reverse();
    return goods;
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function createBanner() {
    var banner = document.createElement("div");
    banner.setAttribute("class", "catalog__banner");

    var bannerTitle = document.createElement("div");
    var bannerTitleMain = document.createElement("span");
    bannerTitleMain.setAttribute("class", "catalog__banner-main-text");
    var bannerTitleTextMain = document.createTextNode("extra 50% ");

    var bannerTitleTextStart = document.createTextNode("Last weekend ");

    var bannerTitleTextMainEnd = document.createTextNode("off on all reduced boots and shoulder bags");
    bannerTitle.appendChild(bannerTitleMain);
    bannerTitle.appendChild(bannerTitleTextStart);
    bannerTitle.appendChild(bannerTitleMain);
    bannerTitleMain.appendChild(bannerTitleTextMain);
    bannerTitle.appendChild(bannerTitleTextMainEnd);

    bannerTitle.setAttribute("class", "catalog__banner-title");

    banner.appendChild(bannerTitle);

    var bannerSubtitle = document.createElement("p");
    var bannerSubtitleText = document.createTextNode("This offer is valid in-store and online. " + "Prices displayed reflect this additional discount." + " This offer ends at 11:59 GMT on March 1st 2019");
    bannerSubtitle.appendChild(bannerSubtitleText);
    bannerSubtitle.setAttribute("class", "catalog__banner-subtitle");
    banner.appendChild(bannerSubtitle);
    return banner;
}

function renderGoods(goods, banner) {
    var columnsCount = defineColumnsCount();
    if (previousColumnsCount === columnsCount) {
        return;
    }
    previousColumnsCount = columnsCount;

    var goodsCount = Math.min(goods.length, definePageSize(columnsCount));
    var rowsCount = Math.ceil(goodsCount / columnsCount);
    var rows = createRows(rowsCount, columnsCount, goodsCount, goods);

    rows.splice(1, 0, banner);
    rowsCount = rows.length;

    var container = document.getElementById("goodsContainer");

    clearContainer(container);
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
            var card = createGoodCard(goodTemplate, good);
            cards.push(card);
        }
        rows.push(createRow(cards));
    }
    return rows;
}

function definePageSize(columnsCount) {
    if (columnsCount > MAX_COLUMNS_COUNT_TABLET) return PAGE_SIZE_DESKTOP;else if (columnsCount > MAX_COLUMNS_COUNT_MOBILE) return PAGE_SIZE_TABLET;else return PAGE_SIZE_MOBILE;
}

function defineColumnsCount() {
    var width = window.innerWidth;
    if (width > WIDTH_TABLET) return MAX_COLUMNS_COUNT_DESKTOP;else if (width > WIDTH_PHONE) return MAX_COLUMNS_COUNT_TABLET;else return MAX_COLUMNS_COUNT_MOBILE;
}