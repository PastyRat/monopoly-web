import { Bank } from './bank.js'
import { Dice } from './dice.js'
import { Player } from './player.js'
import { Property } from './property.js'
class Game {
    constructor() {
        this.bank = new Bank(2)
        this.player0 = new Player("Player 1", 0)
        this.player1 = new Player("Player 2", 1)
        this.oldKentRd = new Property("Old Kent Rd", 0, 2, 60)
        this.whitechapelRd = new Property("Whitechapel Rd", 1, 4, 60)
        this.dice = new Dice()
        this.rollCounter = 0
        this.playerPositions = [0, 0]
    }

    turnFinder() {
        this.rollCounter += 1
        return (this.rollCounter - 1) % 2
    }

    takeTurn() {
        const playerId = this.turnFinder()
        const roll = this.dice.rolldice()
        this.playerPositions[playerId] += roll

        
    }

}
export { Game };