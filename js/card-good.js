const MAX_COLUMNS_COUNT_MOBILE = 2;
const MAX_COLUMNS_COUNT_TABLET = 3;
const MAX_COLUMNS_COUNT_DESKTOP = 4;

const WIDTH_PHONE = 767;
const WIDTH_TABLET = 1025;

function createGoodCard(template, good) {
    let data = {
        title: good.title,
        thumbnail: good.thumbnail,
        price: good.discountedPrice || good.price,
        hasNew: good.hasNew
    };
    let card = document.createElement("div");
    card.innerHTML = template(data);
    return card;
}

function createChosenGoodCard(
    template,
    good,
    decrementQuantity,
    incrementQuantity,
    removeItem,
    openDetails
) {
    let data = {
        title: good.title,
        thumbnail: good.thumbnail,
        price: good.discountedPrice || good.price,
        hasNew: good.hasNew,
        color: good.color,
        size: good.size,
        quantity: good.quantity
    };
    let card = document.createElement("div");
    card.innerHTML = template(data);
    card.querySelector('#decrease').addEventListener('click', () => decrementQuantity(good, card.querySelector('#number')));
    card.querySelector('#increase').addEventListener('click', () => incrementQuantity(good, card.querySelector('#number')));
    card.querySelector('#removeItem').addEventListener('click', () => removeItem(good));
    card.querySelector('#itemPictureWrapper').addEventListener('click', () => openDetails(good));
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

