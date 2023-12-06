class Line {
    constructor(price, quantity) {
        this.price = price;
        this.quantity = quantity;
    }

    calculateTotalLine() {
        return this.price * this.quantity;
    }
}

