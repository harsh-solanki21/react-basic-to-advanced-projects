import { useState, useEffect } from 'react'
import styles from './tictactoe.module.css'
import Undo from '../assets/Undo'
import Redo from '../assets/Redo'

type playerState = 'O' | 'X'

const TicTacToe = () => {
  const initialState: string[] = ['', '', '', '', '', '', '', '', '']
  const victoryStreaks: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [board, setBoard] = useState<string[]>(initialState)
  const [player, setPlayer] = useState<playerState>('O')
  const [moveCount, setMoveCount] = useState<number>(0)
  const [result, setResult] = useState<null | string>(null)

  const markCell = (cell: number) => {
    setBoard(
      board.map((value, index) => {
        if (index === cell && value === '') {
          return player
        }
        return value
      })
    )
    setMoveCount((prevMoveCount) => prevMoveCount + 1)
  }

  const checkVictory = () => {
    victoryStreaks.forEach((pattern: number[]) => {
      const firstPlayer = board[pattern[0]]
      if (firstPlayer === '') {
        return
      }

      let foundWinningStreak = true
      pattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinningStreak = false
        }
      })

      if (foundWinningStreak) {
        setResult(`🎊 Player ${player} WON 🎉`)
      }
    })
  }

  const matchTied = () => {
    setResult('⚡ Match Tied! ⚡')
  }

  const handleReset = () => {
    setBoard(initialState)
    setPlayer('O')
    setMoveCount(0)
    setResult(null)
  }

  const handleUndo = () => {}
  const handleRedo = () => {}

  useEffect(() => {
    if (moveCount >= 6) {
      checkVictory()
    }
    if (moveCount === 9) {
      matchTied()
    }

    if (!result) {
      if (player === 'X') {
        setPlayer('O')
      } else {
        setPlayer('X')
      }
    }
  }, [board])

  return (
    <>
      <h1 className={styles.title}>Tic-Tac-Toe</h1>

      <p className={styles.instructions}>
        First Player starts as <b>Player O</b> and Second Player as{' '}
        <b>Player X</b>
      </p>

      <div className={styles.gameContainer}>
        <input
          type='button'
          className={styles.gameCell}
          value={board[0]}
          onClick={() => markCell(0)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[1]}
          onClick={() => markCell(1)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[2]}
          onClick={() => markCell(2)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[3]}
          onClick={() => markCell(3)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[4]}
          onClick={() => markCell(4)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[5]}
          onClick={() => markCell(5)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[6]}
          onClick={() => markCell(6)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[7]}
          onClick={() => markCell(7)}
        />
        <input
          type='button'
          className={styles.gameCell}
          value={board[8]}
          onClick={() => markCell(8)}
        />
      </div>

      <div className={styles.btnContainer}>
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>

        <button title='Undo' className={styles.undoRedo} onClick={handleUndo}>
          <Undo />
        </button>

        <button title='Redo' className={styles.undoRedo} onClick={handleRedo}>
          <Redo />
        </button>
      </div>
      {result && <span className={styles.result}>{result}</span>}
    </>
  )
}

export default TicTacToe
