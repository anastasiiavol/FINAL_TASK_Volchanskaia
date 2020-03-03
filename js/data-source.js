'use strict';

const KEY_SHOPPING_BAG = "shoppingBag";
const KEY_BEST_OFFER = "bestOffer";

localStorage.setItem(KEY_SHOPPING_BAG, "");
localStorage.setItem(KEY_BEST_OFFER, window.bestOffer);

class DataSource {

    constructor() {
        this.goods = window.catalog;

        let shoppingBagJSON = localStorage.getItem(KEY_SHOPPING_BAG);
        try {
            this.shoppingBag = JSON.parse(shoppingBagJSON).map(value => Object.assign(new ChosenGood(), value));
        } catch (e) {
            this.shoppingBag = [];
        }
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
        localStorage.setItem(KEY_SHOPPING_BAG, JSON.stringify(shoppingBag));
    }
}

var dataSource = new DataSource();

dataSource.saveShoppingBag([]);
let bag = dataSource.getShoppingBag();
bag.push(new ChosenGood());
