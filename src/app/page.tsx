'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const newBoard = structuredClone(board);

  //ミノを落とす関数
  const falling = () => {
    for (let y = 0; y < newBoard.length - 1; y++) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (newBoard[y][x] === 3) {
          if (newBoard[y + 1][x] === 0 && newBoard[y + 1][x] !== undefined) {
            newBoard[y][x] = 0;
            newBoard[y + 1][x] = 3;
          }
          setBoard(newBoard);
        }
      }
    }
  };

  setInterval(falling, 1000);

  const clickhandller = (y: number, x: number) => {
    newBoard[y][x] = 1;

    //配列が埋まったらけす
    if (newBoard[y].filter((x) => x === 0).length === 0) {
      for (let i = 0; i < newBoard[y].length; i++) {
        newBoard[y][i] = 0;
      }
    }

    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((set, x) => (
            <div
              className={styles.block}
              key={`${x}-${y}`}
              onClick={() => clickhandller(y, x)}
              style={{ background: set !== 0 ? '#fff' : '' }}
            />
          )),
        )}
      </div>
    </div>
  );
}
