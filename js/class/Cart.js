class Cart {
    constructor() {
        this.lines = [];
        this.shipment = new Shipment();
    }

    calculateTotalLines() {
        let total = 0;
        document.querySelectorAll('.cart_product .total_price').forEach(function (item) {
            total += parseFloat(item.textContent);
        });

        // Utilisation de la méthode calculateDeliveryPrice de la classe Shipment
        let deliveryPrice = this.shipment.calculateDeliveryPrice();
        
        document.getElementById('deliveryPrice').textContent = deliveryPrice + '€';
        document.getElementById('totalWithDelivery').textContent = (total + deliveryPrice) + '€';
        document.querySelector('.total_cart').textContent = total + '€';

        return total;
    }

    
}