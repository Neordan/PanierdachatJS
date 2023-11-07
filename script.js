document.addEventListener("DOMContentLoaded", function () {

    /**
 * Calcul le total d'une ligne dans le tableau
 * @param {Element} tr_cart_product
 * @returns {number}
 */
    function calculTotalProduct(tr_cart_product) {
        let quantity = tr_cart_product.querySelector('.quantity input').value;
        let unit_price = parseFloat(tr_cart_product.querySelector('.unit_price').dataset.unitPrice);
        if (quantity < 0) {
            quantity = 0;
            tr_cart_product.querySelector('.quantity input').value = quantity;
        }
        let total = quantity * unit_price;

        tr_cart_product.querySelector('.total_price').textContent = total + '€';
        tr_cart_product.querySelector('.total_price').dataset.totalPrice = total;

        return total;
    }

    /**
     * 
     * Calcule le prix en fonction de la quantité choisie 
     */
    function changePriceLineProduct(tr_cart_product) {
        tr_cart_product.querySelectorAll('.influent-price-on-change').forEach((element) => {
            element.addEventListener('change', function (event) {
                calculTotalProduct(tr_cart_product);
                calculTotalCart();
            })
        })
    }


    /**
  * Calcul le total du panier
  */
    function calculTotalCart() {
        let dom_total_prices = document.querySelectorAll('.cart_product .total_price')
        let total = 0;
        dom_total_prices.forEach(function (dom_total_price) {
            total += parseFloat(dom_total_price.dataset.totalPrice);
        });

        document.querySelector('#cart .total_cart').textContent = total + "€";
        calculTotalDelivery()
    }

    /**
 * Supprime une ligne de produit de la commande
 */
    function deleteProduct(tr_cart_product) {
        tr_cart_product.querySelector('.remove_product').addEventListener('click', function () {
            tr_cart_product.remove();
            console.log(tr_cart_product.querySelector('.remove_product'))
            calculTotalCart();
        });
    }

    /**
     * Calcule des frais de livraison
     */
    function calculTotalDelivery() {
        let totalPrice = parseFloat(document.querySelector('.total_cart').textContent);
        let selectedDelivery = document.getElementById('delivery').value;
        let deliveryPrice = (selectedDelivery === 'relais') ? 5 : 10;
        if (totalPrice > 0) {
            document.getElementById('totalDelivery').textContent = deliveryPrice + ' €';
            document.getElementById('totalWithDelivery').textContent = (totalPrice + deliveryPrice) + ' €';
        } else {
            document.getElementById('totalDelivery').textContent = '0 €';
            document.getElementById('totalWithDelivery').textContent = '0 €';
        }
    }

    let tableLine = document.querySelectorAll('tbody tr');
    // boucle pour changer les prix des lignes en fonction des quantités choisies
    tableLine.forEach(function (tableLine) {
        tableLine.querySelectorAll('.influent-price_on_change').forEach((element) => {
            element.addEventListener('change', function (event) {
                calculTotalLine(tableLine)
                calculTotalProducts();

            })
        })

        // Evenement pour supprimer une ligne
        document.querySelectorAll('.delete').forEach(function (deletebtn) {
            deletebtn.addEventListener("click", function () {
                deletebtn.closest('tr').remove();
                calculTotalProducts();
            });
        });

    })
});

// Validation du formulaire
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('deliveryForm');

    form.addEventListener('submit', function (event) {
        // Pas de rechargement 
        event.preventDefault();
        if (validateForm()) {
            console.log('Formulaire valide.');
        }
    });

    function validateForm() {
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const rue = document.getElementById('rue').value;
        const codePostal = document.getElementById('codePostal').value;
        const ville = document.getElementById('ville').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;

        // Vérifie les champs requis 
        if (nom.trim() === '' || prenom.trim() === '' || rue.trim() === '' || codePostal.trim() === '' || ville.trim() === '' || (email.trim() === '' && telephone.trim() === '')) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return false;
        }

        return true;
    }

})
