const RealState = require('./RealEstate');
class Estate {
    realEstate = new RealState();
    vendor_id;
    phone;
    price;
    type;

    constructor () {

    }

    setRealEstate(realEstate) {
        this.realEstate = realEstate;
    }

    setVendor(id) {
        this.vendor_id = id;
    }

    setPhone(phone) {
        this.phone = phone;
    }

    setPrice(price) {
        this.price = price;
    }
    
    isForRent() {
        this.type = 'rent';
    }

    isForSale() {
        this.type = 'sale';
    }

    isForNewBuild() {
        this.type = 'new_build'
    }
}

module.exports = Estate;