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
        return new ChosenGood(
            good.id,
            good.dateAdded,
            good.title,
            good.description,
            good.discountedPrice,
            good.price,
            good.hasNew,
            good.category,
            good.fashion,
            color,
            size,
            good.thumbnail,
            good.preview,
            0,
        );
    }
}
