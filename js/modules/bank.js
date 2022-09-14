class Bank {
    constructor(numPlayers) {
        this.accounts = {}
        for (let i = 0; i < numPlayers; i++) {
            this.accounts[i] = 1000
        }
    }

    getBalance(playerId) {
        return this.accounts[playerId]
    }

    debitPlayer(playerId, amount) {
        this.accounts[playerId] -= amount
    }

    creditPlayer(playerId, amount) {
        this.accounts[playerId] += amount
}

    transferFunds(fromId, toId, amount) {
        this.debitPlayer(fromId, amount)
        this.creditPlayer(toId, amount)
    }

}

export { Bank };
