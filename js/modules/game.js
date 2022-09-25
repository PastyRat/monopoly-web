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
        this.bankruptPlayer = null
        this.playerPositions = [0, 0, 0, 0]

        const go = new Location("go")
        const oldKent = new Property("old-kent", "Old Kent Rd", 2, 60)
        const whiteChapel = new Property("whitechapel", "Whitechapel Rd", 4, 60)
        const kings = new Property("kings-cross", "Kings Cross", 50, 200)
        const angel = new Property("angel", "The Angel Islington", 6, 100)
        const euston = new Property("euston", "Euston Rd", 6, 100)
        const pentonville = new Property("pentonville", "Pentonville Rd", 8, 120)
        //
        const jail = new Location("jail")
        const pallMall = new Property("pall-mall", "Pall Mall", 10, 140)
        const whitehall = new Property("whitehall", "Whitehall", 10, 140)
        const northumberland = new Property("northumberland", "Northumberland Av", 12, 160)
        const bow = new Property("bow", "Bow Street", 14, 180)
        const marlborough = new Property("marlborough", "Marlborough Street", 14, 180)
        const vine = new Property("vine", "Vine Street", 20, 200)
        //
        const parking = new Location("parking")
        const strand = new Property("strand", "Strand", 22, 220)
        const fleet = new Property("fleet", "Fleet St", 22, 220)
        const trafalgar = new Property("trafalgar", "Trafalgar Sq", 24, 240)
        const leicester = new Property("leicester", "Leicester Sq", 26, 260)
        const coventry = new Property("coventry", "Coventry St", 26, 260)
        const piccadilly = new Property("piccadilly", "piccadilly", 28, 280)
        //
        const goToJail = new Location("go-to-jail")
        const regent = new Property("regent", "Regent St", 30, 300)
        const oxford = new Property("oxford", "Oxford St", 30, 300)
        const bond = new Property("bond", "Bond St", 32, 320)
        const fenchurch = new Property("fenchurch", "Fenchurch St", 50, 200)
        const parkLane = new Property("park", "Park Lane", 35, 350)
        const mayfair = new Property("mayfair", "Mayfair", 40, 400)

        this.propertyPositions = [go, oldKent, whiteChapel, kings, angel, euston, pentonville,
            jail, pallMall, whitehall, northumberland, bow, marlborough, vine,
            parking, strand, fleet, trafalgar, leicester, coventry, piccadilly,
            goToJail, regent, oxford, bond, fenchurch, parkLane, mayfair]
    }

    turnFinder() {
        this.rollCounter += 1
        return (this.rollCounter - 1) % 4
    }

    takeTurn() {
        const playerId = this.turnFinder()
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
        if (this.bank.getBalance(playerId) < 1) {
            console.log("a player is bankrupt")
            this.bankruptPlayer = playerId
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