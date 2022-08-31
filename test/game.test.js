import assert from 'assert';
import { Game } from '../js/modules/game.js'

describe('Game', function () {
    it('should give player position', function () {
        const game = new Game()
        game.takeTurn()
        assert(game.playerPositions[0] > 0)
    })
}
)