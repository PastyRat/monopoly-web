import { Dice } from '../js/modules/dice.js'
import assert from 'assert';

describe('Dice', function () {
    it('should give a random number', function () {
        const dice = new Dice()
        const result = dice.rolldice()
        assert(result < 7)
    });
});