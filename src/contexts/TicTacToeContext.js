import { useState, createContext } from 'react'

export const TicTacToeContext = createContext()

export const TicTacToeProvider = ({ children }) => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [nextValue, setNextValue] = useState('X')
  const [status, setStatus] = useState(`Next player: ${nextValue}`)
  const [winner, setWinner] = useState(null)

  const selectSquare = (square) => {
    if (squares[square] || winner) {
      return
    }
    const newSquares = [...squares]
    newSquares[square] = nextValue

    setSquares(newSquares)
    setNextValue(calculateNextValue(newSquares))
    const newWinner = calculateWinner(newSquares)
    setWinner(newWinner)
    setStatus(
      calculateStatus(newWinner, newSquares, calculateNextValue(newSquares))
    )
  }

  const restart = () => {
    setSquares(Array(9).fill(null))
    setNextValue('X')
    setWinner(null)
    setStatus(`Next player: X`)
  }

  const renderSquare = (i) => {
    return (
      <button
        className="square border border-[#dff6ff] w-20 h-20 bg-[#06283d] text-[#dff6ff] text-5xl font-bold focus:outline-none"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    )
  }

  const calculateStatus = (winner, squares, nextValue) => {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
  }

  const calculateNextValue = (squares) => {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const states = {
    squares,
    setSquares,
    nextValue,
    setNextValue,
    status,
    setStatus,
    winner,
    setWinner
  }

  const functions = {
    selectSquare,
    restart,
    renderSquare,
    calculateStatus,
    calculateNextValue,
    calculateWinner
  }

  return (
    <TicTacToeContext.Provider value={{ states, functions }}>
      {children}
    </TicTacToeContext.Provider>
  )
}
