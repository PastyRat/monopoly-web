class Property {
    constructor(pId, pName, pRent, pPrice) {
        this.id = pId
        this.name = pName
        this.rent = pRent
        this.price = pPrice
        this.owner = 999
    }
}

class Location {
    constructor(locId){
        this.id = locId
    }
}

export { Property, Location };
