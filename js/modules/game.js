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

        const oldKent = new Property("Old Kent Rd", 2, 60)
        const whiteChapel = new Property("Whitechapel Rd", 4, 60)
        const angelIslington = new Property("The Angel Islington", 4, 60)
        const pallMall = new Property("Pall Mall", 4, 60)
        const vine = new Property("Vine Street", 4, 60)
        const euston = new Property("Euston Rd", 4, 60)
        const strand = new Property("Strand", 4, 60)
        const piccadilly = new Property("Picadilly", 4, 60)
        const parkLane = new Property("Park Lane", 4, 60)
        const mayfair = new Property("Mayfair", 4, 60)

        this.propertyPositions = ["go", oldKent, whiteChapel, angelIslington, "freeParking", pallMall,
            vine, euston, "freeParking", strand, piccadilly, parkLane, mayfair]
    }

    turnFinder() {
        this.rollCounter += 1
        return (this.rollCounter - 1) % 2
    }

    bankrupt() {

    }

    takeTurn() {
        const playerId = this.turnFinder()
        if (this.bank.getBalance(playerId) < 1) {
            bankrupt()
        }
        const roll = this.dice.roll()
        const playerPosition = (this.playerPositions[playerId] + roll) % 13
        this.playerPositions[playerId] = playerPosition

        const square = this.propertyPositions[playerPosition]
        if (square instanceof Property) {
            if (square.owner == 999) {
                this.buy(playerId, square)
            }
            else {
                this.payRent(playerId, square)
            }
        }
    }

    buy(playerId, property) {
        property.owner = playerId
        this.bank.debitPlayer(playerId, property.price)
    }

    payRent(playerid, property) {
        this.bank.transferFunds(playerid, property.owner, property.rent)
        console.log(`player ${playerid} paid player ${property.owner} £ ${property.rent}`)
    }
}
export { Game };