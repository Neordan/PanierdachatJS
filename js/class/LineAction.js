class LineAction {
    createLineProduct(line, DOM_location) {
        let lineProduct = document.createElement('tr');
        lineProduct.classList.add('cart_product');
        lineProduct.innerHTML = `
            <td>${line.product.name}</td>
            <td class="unit_price" data-unit-price="${line.product.price}">
                <span class="value">${line.product.price}</span> €
            </td>
            <td class="quantity">
                <input type="number" class="influent-price-on-change" value="${line.quantity}" min="1"/>
            </td>
            <td class="total_price" data-total-price="${line.calculateTotalLine()}"></td>
            <td></td>
            <td>
                <button class="remove">X</button>
            </td>
        `;

        DOM_location.appendChild(lineProduct);
    }

    deleteProduct(cart, tr_cart_product) {
        tr_cart_product.querySelector('.remove').addEventListener('click', function () {
            tr_cart_product.remove();
            cart.calculateTotalLines(); // Appel de la méthode de calcul du total du panier
        });
    }
}