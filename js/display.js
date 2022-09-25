function movePlayer({playerId, oldSquare, newSquare}) {
    hide(`${oldSquare}-player-${playerId}`)
    show(`${newSquare}-player-${playerId}`)
}

function hide(id) {
    document.getElementById(id).style.display = 'none'
}

function show(id) {
    document.getElementById(id).style.display = 'inline'
}

function setBalance(id, playerBalance) {
    document.getElementById(`balance-${id}`).innerHTML = playerBalance
}