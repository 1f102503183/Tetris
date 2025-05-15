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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  ]);
  //３が落下中のブロック、１が固定状態のブロック、０が空
  const newBoard = structuredClone(board);

  /////////////////////////////////////////////////////////////////////////////////////

  //３を落とす関数
  const falling = (newBoard: number[][]) => {
    for (let y = 18; 0 <= y; y--) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (newBoard[y][x] === 3) {
          if (newBoard[y + 1][x] === 0 || newBoard[y + 1][x] === 1) {
            newBoard[y][x] = 0;
            newBoard[y + 1][x] = 3;
          } else {
            newBoard[y][x] = 1;
          }
        }
      }
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////

  //配列が埋まったらけす関数
  const deleteline = (newBoard: number[][]) => {
    for (let y = newBoard.length - 1; 0 <= y; y--) {
      if (newBoard[y].filter((n) => n === 0).length === 0) {
        if (y === 19) {
          newBoard[y].fill(0);
        } else {
          for (let x = 0; x < newBoard[y].length; x++) {
            newBoard[y][x] = newBoard[y - 1][x];
          }
        }
      }
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////

  //毎秒実行する所
  const INTERVAL = () => {
    falling(newBoard);
    deleteline(newBoard);

    setBoard(newBoard);
  };

  setInterval(INTERVAL, 1000);

  /////////////////////////////////////////////////////////////////////////////////////

  const clickhandller = (y: number, x: number) => {
    newBoard[y][x] = 3;
    setBoard(newBoard);
  };

  /////////////////////////////////////////////////////////////////////////////////////

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
