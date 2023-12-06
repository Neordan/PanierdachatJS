class Shipment {
        constructor() {
            this.choice = 'relais';
            this.price = this.calculateDeliveryPrice();
        }
    
        calculateDeliveryPrice() {
            return this.choice === 'relais' ? 5 : 12;
        }
    
        setDeliveryChoice(choice) {
            this.choice = choice;
            this.price = this.calculateDeliveryPrice();
        }
    }