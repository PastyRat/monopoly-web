import assert from 'assert';
import { Game } from '../js/modules/game.js'

class MockDice {
    roll() {
        return 2
    }
}

describe('Game', function () {
    it('should give player position', function () {
        const game = new Game()
        game.takeTurn()
        assert(game.playerPositions[0] > 0)
        const playerPosition = game.playerPositions[0]
        const property = game.propertyPositions[playerPosition]
        assert(property.owner == 0)
    })
}
)

describe('Game', function () {
    it('should pay rent', function () {
        // given
        const game = new Game()
        game.dice = new MockDice()
        game.playerPositions = [2, 0]
        game.propertyPositions[2].owner = 0
        game.rollCounter = 1
        // when
        game.takeTurn()
        // then
        assert(game.bank.getBalance(0) == 1000 + 4)
        assert(game.bank.getBalance(1) == 1000 - 4)
    })
})

describe('Game', function () {
    it('should pass go', function () {
        // given
        const game = new Game()
        game.dice = new MockDice()
        game.playerPositions = [12, 12]
        game.rollCounter = 4
        // when
        game.takeTurn()
        // then
        assert.equal(game.playerPositions[0] , 1)
    })
})
