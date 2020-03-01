const CARD_WIDTH = 235;
const CARD_MARGIN = 40;

const MAX_COLUMNS_COUNT_MOBILE = 2;
const MAX_COLUMNS_COUNT_TABLET = 3;
const MAX_COLUMNS_COUNT_DESKTOP = 4;

function createCard(template, good) {
    let data = {
        title: good.title,
        thumbnail: good.thumbnail,
        price: good.discountedPrice || good.price
    };
    let card = document.createElement("div");
    card.innerHTML = template(data);
    return card;
}

function createRow(cards) {
    let row = document.createElement("div");

    row.className = "item_row";
    for (let i = 0; i < cards.length; i++) {
        row.appendChild(cards[i]);
    }
    return row;
}

