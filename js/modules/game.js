import { Bank } from './bank.js'
import { Dice } from './dice.js'
import { Player } from './player.js'
import { Property } from './property.js'

class Game {
    constructor() {
        this.bank = new Bank(2)
        this.dice = new Dice()
        this.rollCounter = 0
        this.player0 = new Player("Player 1", 0)
        this.player1 = new Player("Player 2", 1)
        this.playerPositions = [0, 0]

        const oldKent = new Property("Old Kent Rd", 0, 2, 60)
        const whiteChappel = new Property("Whitechapel Rd", 1, 4, 60)
        const angelIslington = new Property("The Angel Islington", 2, 4, 60)
        const pallMall = new Property("Pall Mall", 3, 4, 60)
        const vine = new Property("Vine Street", 4, 4, 60)
        const euston = new Property("Euston Rd", 5, 4, 60)
        const strand = new Property("Strand", 6, 4, 60)
        const piccadilly = new Property("Picadilly", 7, 4, 60)
        const parkLane = new Property("Park Lane", 8, 4, 60)
        const mayfair = new Property("Mayfair", 9, 4, 60)

        this.propertyPositions = [oldKent, whiteChappel, angelIslington, pallMall,
            vine, euston, strand, piccadilly, parkLane, mayfair]
    }

    turnFinder() {
        this.rollCounter += 1
        return (this.rollCounter - 1) % 2
    }

    takeTurn() {
        const playerId = this.turnFinder()
        const roll = this.dice.roll()
        const playerPosition = this.playerPositions[playerId] + roll
        this.playerPositions[playerId] = playerPosition

        const property = this.propertyPositions[playerPosition]
        if (property.owner == 999) {
            this.buy(playerId, property)
        }
        else {
            this.payRent(playerId, property)
        }
    }

    buy(playerId, property) {
        property.owner = playerId
        this.bank.debitPlayer(playerId, property.price)
    }

    payRent(playerid, property) {
        this.bank.transferFunds(playerid, property.owner, property.rent)
    }

}
export { Game };