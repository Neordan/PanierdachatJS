document.addEventListener("DOMContentLoaded", function () {
    const lineAction = new LineAction();
    const cart = new Cart();

    // Modifier la quantité des produits en direct
    function calculTotalLine(tr_cart_product) {
        let quantity = parseInt(tr_cart_product.querySelector('.quantity input').value);

        if (quantity <= 0) {
            tr_cart_product.remove();
        } else {
            let unit_price = parseFloat(tr_cart_product.querySelector('.unit_price').getAttribute('data-unit-price'));

            // Créer une instance de la classe Line
            let line = new Line(unit_price, quantity);

            // Utiliser la méthode calculateTotalLine
            let total = line.calculateTotalLine();

            tr_cart_product.querySelector('.total_price').textContent = total + '€';
            calculTotalLines();
        }
    }

    // Supprimer un produit du panier
    function deleteProduct(tr_cart_product) {
        // Utilisation de la méthode deleteProduct de la classe LineAction
        lineAction.deleteProduct(cart, tr_cart_product);
    }
    // Créer une instance de la classe Shipment
    const shipment = new Shipment();

    /**
     * Calcule des frais de livraison
     */
    function calculTotalDelivery() {
        let deliveryChoice = document.getElementById('delivery_choice').value || 'relais';

        //  définir le choix de livraison
        shipment.setDeliveryChoice(deliveryChoice);

        // Frais de livraison de l'instance Shipment
        let deliveryPrice = shipment.price;

        document.getElementById('deliveryPrice').textContent = deliveryPrice + '€';
        calculTotalLines();
    }

    // Appeler la fonction pour la première fois
    calculTotalDelivery();


    // Gérer les changements de livraison
    document.getElementById('delivery_choice').addEventListener('change', calculTotalDelivery);


    // Calculer dynamiquement le total du panier
    function calculTotalLines() {
        cart.calculateTotalLines(); 
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

