const PAGE_SIZE_MOBILE = 8;
const PAGE_SIZE_TABLET = 12;
const PAGE_SIZE_DESKTOP = 12;

let filterCategory = "women";
let filterFashion = "casual style";
let previousColumnsCount = 0;

function getGoods() {
    let goods = [...dataSource.getGoods()];
    goods = _.filter(goods, (good) => good.category.toLowerCase() === filterCategory.toLowerCase());
    goods = _.filter(goods, (good) => good.fashion.toLowerCase() === filterFashion.toLowerCase());
    goods = _.sortBy(goods, (good) => good.dateAdded).reverse();
    return goods;
}

window.onload = () => {
    renderGoods(getGoods(), createBanner());
};
window.onresize = () => {
    renderGoods(getGoods(), createBanner());
};

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function createBanner() {
    let banner = document.createElement("div");
    banner.setAttribute("class", "catalog__banner");

    let bannerTitle = document.createTextNode("Last week extra50% off on al reduced boots and shoulder bags");
    banner.appendChild(bannerTitle);

    let bannerSubtitle = document.createTextNode("aaaaaaaaaaaaaaaaaaa");
    banner.appendChild(bannerSubtitle);
    return banner;
}

function definePageSize(columnsCount) {
    if (columnsCount > MAX_COLUMNS_COUNT_TABLET) return PAGE_SIZE_DESKTOP;
    else if (columnsCount > MAX_COLUMNS_COUNT_MOBILE) return PAGE_SIZE_TABLET;
    else return PAGE_SIZE_MOBILE;
}

function renderGoods(goods, banner) {
    let columnsCount = Math.min(
        MAX_COLUMNS_COUNT_DESKTOP,
        Math.round(window.innerWidth / (CARD_WIDTH + CARD_MARGIN * 2))
    );
    if (previousColumnsCount === columnsCount) {
        return;
    }
    previousColumnsCount = columnsCount;

    let goodsCount = Math.min(goods.length, definePageSize(columnsCount));
    let rowsCount = Math.ceil(goodsCount / columnsCount);
    let rows = [];

    let template = _.template(document.getElementById('template-good-item').innerHTML);

    let k = 0;
    for (let i = 0; i < rowsCount; i++) {
        let cards = [];
        for (let j = 0; j < columnsCount && k < goodsCount; j++, k++) {
            let good = goods[k];
            let card = createCard(template, good);
            cards.push(card);
        }
        rows.push(createRow(cards));
    }

    rows.splice(1, 0, banner);
    rowsCount = rows.length;

    let container = document.getElementById("goodsContainer");
    clearContainer(container);
    for (let i = 0; i < rowsCount; i++) {
        container.appendChild(rows[i]);
    }
}
