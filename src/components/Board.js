import { useContext } from 'react'
import { TicTacToeContext } from '../contexts/TicTacToeContext'

const Board = () => {
  const { states, functions } = useContext(TicTacToeContext)
  const { status } = states
  const { restart, renderSquare } = functions

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 font-bold text-xl">{status}</div>
      <div className="flex">
        <div className="flex flex-col">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex flex-col">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex flex-col">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-[#1363df] border border-transparent rounded-md font-semibold text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  )
}

export default Board
