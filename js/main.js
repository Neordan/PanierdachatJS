document.addEventListener("DOMContentLoaded", function () {

    // Modifier la quantité des produits en direct
    function calculTotalLine(tr_cart_product) {
        let quantity = parseInt(tr_cart_product.querySelector('.quantity input').value);
        
        if (quantity <= 0) {
            tr_cart_product.remove();
        } else {
            let unit_price = parseFloat(tr_cart_product.querySelector('.unit_price').getAttribute('data-unit-price'));
            let total = quantity * unit_price;
            tr_cart_product.querySelector('.total_price').textContent = total + '€';
            calculTotalLines();
        }
    }

    // Supprimer un produit du panier
    function deleteProduct(tr_cart_product) {
        tr_cart_product.querySelector('.remove').addEventListener('click', function () {
            tr_cart_product.remove();
            calculTotalLines();
        });
    }

    /**
     * Calcule des frais de livraison
     */
    function calculTotalDelivery() {
        let deliveryChoice = document.getElementById('delivery_choice').value || relais; 
        let deliveryPrice = deliveryChoice === 'relais' ? 5 : 12;
        document.getElementById('deliveryPrice').textContent = deliveryPrice + '€';
        calculTotalLines();
    }
    
    calculTotalDelivery();
    
    // Gérer les changements de livraison
    document.getElementById('delivery_choice').addEventListener('change', calculTotalDelivery);


    // Calculer dynamiquement le total du panier
    function calculTotalLines() {
        let total = 0;
        document.querySelectorAll('.cart_product .total_price').forEach(function (item) {
            total += parseFloat(item.textContent);
        });
        let deliveryPrice = parseFloat(document.getElementById('deliveryPrice').textContent);
        document.getElementById('totalWithDelivery').textContent = (total + deliveryPrice) + '€';
        document.querySelector('.total_cart').textContent = total + '€';
    }

    async function displayProducts() {
        try {
            const response = await fetch('products.json');
            const products = await response.json();
            const tbody = document.querySelector('tbody');
    
            products.forEach(product => {
                createLineProduct(product, tbody);
            });
    
            // Appel pour calculer les totaux dès le chargement de la page
            calculTotalLines();
        } catch (error) {
            console.error('Une erreur s\'est produite lors du chargement des produits.', error);
        }
    }

    function createLineProduct(product, DOM_location) {
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

        let quantityInput = lineProduct.querySelector('.quantity input');
        let removeButton = lineProduct.querySelector('.remove');
    
        quantityInput.addEventListener('input', () => {
            calculTotalLine(lineProduct);
        });
    
        removeButton.addEventListener('click', () => {
            deleteProduct(lineProduct);
        });
    
        // Calculer le total initial pour chaque ligne
        calculTotalLine(lineProduct);
    }

    displayProducts();
});

