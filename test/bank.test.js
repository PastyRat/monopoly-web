import assert from 'assert';
import { Bank } from '../js/modules/bank.js'

describe('Bank', function () {
    describe('credit player', function () {
        it('should increase player balance', function () {
            const bank = new Bank(2)
            bank.creditPlayer(1, 100)
            const balance = bank.getBalance(1)
            assert.equal(balance, 100);
        });

        it('should transfer funds', function () {
            const bank = new Bank(2)
            bank.creditPlayer(0, 100)
            bank.creditPlayer(1, 100)
            bank.transferFunds(0, 1, 20)
            const balance0 = bank.getBalance(0)
            const balance1 = bank.getBalance(1)
            assert.equal(balance0, 80);
            assert.equal(balance1, 120);
        });
    });
});