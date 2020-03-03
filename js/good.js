'use strict';
const DISCOUNT = 15;

class Good {
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
        colors,
        sizes,
        thumbnail,
        preview
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
        this.colors = colors;
        this.sizes = sizes;
        this.thumbnail = thumbnail;
        this.preview = preview;
    }
}
