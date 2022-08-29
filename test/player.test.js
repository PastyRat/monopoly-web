import assert from 'assert';
import { Player } from '../js/modules/player.js'

describe('Player', function () {
    it('should give player name', function () {
        const player = new Player("Angus")
        const name = player.getName()
        assert.equal(name, "Angus")
    })
}
)