"use strict";

var MAX_COLUMNS_COUNT_MOBILE = 2;
var MAX_COLUMNS_COUNT_TABLET = 3;
var MAX_COLUMNS_COUNT_DESKTOP = 4;

var WIDTH_PHONE = 767;
var WIDTH_TABLET = 1025;

function createGoodCard(template, good) {
    var data = {
        title: good.title,
        thumbnail: good.thumbnail,
        price: good.discountedPrice || good.price,
        hasNew: good.hasNew
    };
    var card = document.createElement("div");
    card.innerHTML = template(data);
    return card;
}

function createChosenGoodCard(template, good, decrementQuantity, incrementQuantity, removeItem, openDetails) {
    var data = {
        title: good.title,
        thumbnail: good.thumbnail,
        price: good.discountedPrice || good.price,
        hasNew: good.hasNew,
        color: good.color,
        size: good.size,
        quantity: good.quantity
    };
    var card = document.createElement("div");
    card.innerHTML = template(data);
    card.querySelector('#decrease').addEventListener('click', function () {
        return decrementQuantity(good, card.querySelector('#number'));
    });
    card.querySelector('#increase').addEventListener('click', function () {
        return incrementQuantity(good, card.querySelector('#number'));
    });
    card.querySelector('#removeItem').addEventListener('click', function () {
        return removeItem(good);
    });
    card.querySelector('#itemPictureWrapper').addEventListener('click', function () {
        return openDetails(good);
    });
    return card;
}

function createRow(cards) {
    var row = document.createElement("div");

    row.className = "item_row";
    for (var i = 0; i < cards.length; i++) {
        row.appendChild(cards[i]);
    }
    return row;
}