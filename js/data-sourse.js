'use strict';

const KEY_GOODS = "goods";
const KEY_SHOPPING_BAG = "shoppingBag";
const KEY_BEST_OFFER = "bestOffer";

localStorage.setItem(KEY_SHOPPING_BAG, window.catalog);
localStorage.setItem(KEY_BEST_OFFER, window.bestOffer);

class DataSource {

    goods = [];
    shoppingBag = [];

    constructor() {
        let goodsJSON = localStorage.getItem(KEY_GOODS);
        this.goods = goodsJSON == null
            ? []
            : JSON.parse(goodsJSON).map(value => Object.assign(new Good(), value));

        let shoppingBagJSON = localStorage.getItem(KEY_SHOPPING_BAG);
        this.shoppingBag = shoppingBagJSON == null
            ? []
            : JSON.parse(shoppingBagJSON).map(value => Object.assign(new ChoosenGood(), value));
    }

    getGoods() {
        return this.goods;
    }

    getGood(id) {
        for (let i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === id) return this.goods[i]
        }
        return null;
    }

    getShoppingBag() {
        return this.shoppingBag;
    }

    saveShoppingBag(shoppingBag) {
        this.shoppingBag = shoppingBag;
        localStorage.setItem(KEY_SHOPPING_BAG, shoppingBag);
    }

    clearShoppingBag(){
        this.saveShoppingBag([]);
    }
}