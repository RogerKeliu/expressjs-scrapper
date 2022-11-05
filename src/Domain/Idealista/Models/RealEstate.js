class RealEstate {
    municipality;
    name;
    phone;
    web;
    location = {
        street: '',
        city: 0,
    };
    vendor_link;
    type = 'pro';
    languages = [];
    totalEstates = 0;
    forSale = 0;
    forRent = 0;
    forNewBuilding = 0;

    constructor () {
        
    }
    
}

module.exports = RealEstate;