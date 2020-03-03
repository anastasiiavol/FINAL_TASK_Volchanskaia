'use strict';

let shoppingBag = new ShoppingBag();
shoppingBag.clearAll();
shoppingBag.chooseGood('8c061815-6a7d-4465-bb78-1bdc6c5adebf', 'UK 17', 'Phillipa wash');
shoppingBag.chooseGood('ff665110-5e7f-435d-b1b4-651c3d5050ca', 'UK 18', 'Blue');
shoppingBag.chooseGood('07cf6ce2-6eee-4e78-a441-f257fdea7ed6', 'UK 18', 'Black');
shoppingBag.chooseGood('8b300772-eee3-4ff1-b091-e89f17e0e469', 'UK 19', 'Green');

class ShoppingBag {

    // noinspection JSMethodCanBeStatic
    get chosen() {
        return dataSource.getShoppingBag();
    }

    get price() {
        let price = 0;
        let goods = this.chosen;

        for (let i = 0; i < goods.length; i++) {
            price += goods[i].price * goods[i].quantity;
        }
        return price;
    }

    get size() {
        let size = 0;
        let goods = this.chosen;

        for (let i = 0; i < goods.length; i++) {
            size += goods[i].quantity;
        }
        return size;
    }

    chooseGood(id, size, color) {
        let chosenGoods = this.chosen;
        let chosenGood = this.fromBag(chosenGoods, id, size, color);
        if (chosenGood == null) chosenGood = this.fromDataSource(id, size, color, chosenGood);

        chosenGood.quantity++;

        let index = chosenGoods.indexOf(chosenGood);
        if (index === -1) {
            chosenGoods.push(chosenGood);
        } else {
            chosenGoods.splice(index, 1, chosenGood);
        }
        dataSource.saveShoppingBag(chosenGoods);
    }

    unchooseGood(id, size, color) {
        let chosenGoods = this.chosen;
        let chosenGood = this.fromBag(chosenGoods, id, size, color);
        if (chosenGood == null) {
            return;
        }

        chosenGood.quantity--;
        let index = chosenGoods.indexOf(chosenGood);
        if (index >= 0) {
            chosenGoods.splice(index, 1, chosenGood)
        }
        if (chosenGood.quantity === 0) {
            chosenGoods.remove(index);
        }
        dataSource.saveShoppingBag(chosenGoods);
    }

    // noinspection JSMethodCanBeStatic
    clearAll() {
        dataSource.saveShoppingBag([]);
    }

    static checkout() {
        dataSource.saveShoppingBag([]);
    }

    fromBag(chosenGoods, id, size, color) {
        return _.find(chosenGoods, (good) => good.id === id && good.size === size && good.color === color);
    }

    fromDataSource(id, size, color, chosenGood) {
        let good = _.find(
            dataSource.goods,
            (good) => good.id === id && good.sizes.includes(size) && good.colors.includes(color)
        );
        chosenGood = ChosenGood.new(good, size, color);
        return chosenGood;
    }
}