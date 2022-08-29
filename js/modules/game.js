import { Bank } from './bank'
import { Dice } from './dice'
import { Player } from './player'
import { Property } from './property'
class Game {
    constructor() {
        this.bank = new Bank(2)
        this.player0 = new Player("Player 1", 0)
        this.player1 = new Player("Player 2", 1)
        this.oldKentRd = new Property("Old Kent Rd", 0, 2, 60)
        this.whitechapelRd = new Property("Whitechapel Rd", 1, 4, 60)
        this.dice = new Dice()
    }
}