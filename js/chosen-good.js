'use strict';
const DISCOUNT = 15;

class ChosenGood {

    constructor(
        id,
        dateAdded,
        title,
        description,
        discountedPrice,
        price,
        hasNew,
        category,
        fashion,
        color,
        size,
        thumbnail,
        preview,
        quantity
    ) {
        this.id = id;
        this.dateAdded = dateAdded;
        this.title = title;
        this.description = description;
        this.discountedPrice = discountedPrice;
        this.price = price;
        this.hasNew = hasNew;
        this.category = category;
        this.fashion = fashion;
        this.color = color;
        this.size = size;
        this.thumbnail = thumbnail;
        this.preview = preview;
        this.quantity = quantity;
    }

    static new(good, color, size) {
        this.id = good.id;
        this.dateAdded = good.dateAdded;
        this.title = good.title;
        this.description = good.description;
        this.discountedPrice = good.discountedPrice;
        this.price = good.price;
        this.hasNew = good.hasNew;
        this.category = good.category;
        this.fashion = good.fashion;
        this.color = color;
        this.size = size;
        this.thumbnail = good.thumbnail;
        this.preview = good.preview;
        this.quantity = 0;
    }
}
