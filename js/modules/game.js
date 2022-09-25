import { Bank } from './bank.js'
import { Dice } from './dice.js'
import { Player } from './player.js'
import { Property, Location } from './property.js'

class Game {
    constructor() {
        this.bank = new Bank(4)
        this.dice = new Dice()
        this.rollCounter = 0
        this.player0 = new Player("Angus", 0)
        this.player1 = new Player("Rowan", 1)
        this.player2 = new Player("Michelle", 2)
        this.player3 = new Player("John", 3)
        this.playerPositions = [0, 0, 0, 0]

        const go = new Location("go")
        const oldKent = new Property("old-kent", "Old Kent Rd", 2, 60)
        const whiteChapel = new Property("whitechapel", "Whitechapel Rd", 4, 60)
        const kings = new Property("kings-cross", "Kings Cross", 4, 60)
        const angel = new Property("angel", "The Angel Islington", 4, 60)
        const euston = new Property("euston", "Euston Rd", 4, 60)
        const pentonville = new Property("pentonville", "Pentonville Rd", 4, 60)
        //
        const jail = new Location("jail")
        const pallMall = new Property("pall-mall", "Pall Mall", 4, 60)
        const whitehall = new Property("whitehall", "Whitehall", 4, 60)
        const northumberland = new Property("northumberland", "Northumberland Av", 4, 60)
        const bow = new Property("bow", "Bow Street", 4, 60)
        const marlborough = new Property("marlborough", "Marborough Street", 4, 60)
        const vine = new Property("vine", "Vine Street", 4, 60)
        //
        const parking = new Location("parking")
        const strand = new Property("strand", "Strand", 4, 60)
        const fleet = new Property("fleet", "Fleet St", 4, 60)
        const trafalgar = new Property("trafalgar", "Trafalgar Sq", 4, 60)
        const leicester = new Property("leicester", "Leicester Sq", 4, 60)
        const coventry = new Property("coventry", "Coventry St", 4, 60)
        const piccadilly = new Property("picadilly", "Picadilly", 4, 60)
        //
        const goToJail = new Location("go-to-jail")
        const regent = new Property("regent", "Regent St", 4, 60)
        const oxford = new Property("oxford", "Oxford St", 4, 60)
        const bond = new Property("bond", "Bond St", 4, 60)
        const fenchurch = new Property("fenchurch", "Fenchurch St", 4, 60)
        const parkLane = new Property("park", "Park Lane", 4, 60)
        const mayfair = new Property("mayfair", "Mayfair", 4, 60)

        this.propertyPositions = [go, oldKent, whiteChapel, kings, angel, euston, pentonville,
            jail, pallMall, whitehall, northumberland, bow, marlborough, vine,
            parking, strand, fleet, trafalgar, leicester, coventry, piccadilly,
            goToJail, regent, oxford, bond, fenchurch, parkLane, mayfair]
    }

    turnFinder() {
        this.rollCounter += 1
        return (this.rollCounter - 1) % 4
    }

    bankrupt() {
        console.log("bankrupt")
    }

    takeTurn() {
        const playerId = this.turnFinder()
        if (this.bank.getBalance(playerId) < 1) {
            bankrupt()
        }
        const roll = this.dice.roll()
        const oldSquare = this.propertyPositions[this.playerPositions[playerId]]
        const playerPosition = (this.playerPositions[playerId] + roll) % this.propertyPositions.length
        this.playerPositions[playerId] = playerPosition

        console.log(`player ${playerId} threw ${roll} and moved to ${playerPosition}`)
        const square = this.propertyPositions[playerPosition]
        if (square instanceof Property) {
            if (square.owner == 999) {
                this.buy(playerId, square)
            }
            else {
                this.payRent(playerId, square)
            }
        }
        return { playerId: playerId, oldSquare: oldSquare.id, newSquare: square.id }
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