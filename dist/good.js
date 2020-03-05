'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DISCOUNT = 15;

var Good = function Good(id, dateAdded, title, description, discountedPrice, price, hasNew, category, fashion, colors, sizes, thumbnail, preview) {
    _classCallCheck(this, Good);

    this.id = id;
    this.dateAdded = dateAdded;
    this.title = title;
    this.description = description;
    this.discountedPrice = discountedPrice;
    this.price = price;
    this.hasNew = hasNew;
    this.category = category;
    this.fashion = fashion;
    this.colors = colors;
    this.sizes = sizes;
    this.thumbnail = thumbnail;
    this.preview = preview;
};