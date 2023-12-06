class Line {
    constructor(price, quantity) {
        this.price = price;
        this.quantity = quantity;
    }

    createLineProduct(product, DOM_location) {
        let lineProduct = document.createElement('tr');
        lineProduct.classList.add('cart_product');
        lineProduct.innerHTML +=
            `
            <td>${product.name}</td>
            <td class="unit_price" data-unit-price="${product.price}">
                <span class="value">${product.price}</span> €
            </td>
            <td class="quantity">
                <input type="number" class="influent-price-on-change" value="1"/>
            </td>
            <td class="total_price" data-total-price="${product.price}"></td>
            <td></td>
            <td>
                <button class="remove">X</button>
            </td>
        `
            ;

        DOM_location.appendChild(lineProduct);
    }

    deleteProduct(tr_cart_product) {
        tr_cart_product.querySelector('.remove').addEventListener('click', function () {
            tr_cart_product.remove();
            calculTotalLines();
        });
    }

    calculateTotalLine() {
        return this.price * this.quantity;
    }
}

