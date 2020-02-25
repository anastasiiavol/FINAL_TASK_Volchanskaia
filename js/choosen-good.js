'use strict';
const DISCOUNT = 15;

class ChoosenGood {
    id;
    dateAdded;
    title;
    description;
    discountedPrice;
    price;
    hasNew;
    category;
    fashion;
    color;
    size;
    thumbnail;
    preview;
    quantity;

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
}
