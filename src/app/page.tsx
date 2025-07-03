'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [board, setBoard] = useState([
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //３が落下中のブロック、１が固定状態のブロック、０が空
  useEffect(() => {
    setInterval(INTERVAL, 1000);
  });

  const Minos = [
    [0, 0, 0, 0],
    [3, 3, 3, 0],
    [0, 3, 0, 0],
    [0, 0, 0, 0],
  ];
  //発生地点はboard[1][5]

  //３を落とす関数
  const falling = (newBoard: number[][]): number[][] => {
    const resultBoard = structuredClone(newBoard);
    for (let y = newBoard.length - 2; 0 <= y; y--) {
      for (let x = 0; x < newBoard[y].length; x++) {
        if (newBoard[y][x] === 3) {
          if (newBoard[y + 1][x] === 0) {
            newBoard[y][x] = 0;
            newBoard[y + 1][x] = 3;
          }
        }
      }
    }
    return resultBoard;
  };

  //配列が埋まったらけす関数
  const deleteline = (newBoard: number[][]) => {
    for (let y = newBoard.length - 1; 0 <= y; y--) {
      if (newBoard[y].filter((n) => n === 1).length === 10) {
        for (let i = y; y < 0; i--) {
          newBoard[y] = newBoard[y - 1];
        }
      }
    }
  };

  //したが固定ブロックの３を１に変換（したが空白でなら固定する）
  const stickBlock = (newBoard: number[][]): number[][] => {
    const resultBoard: number[][] = structuredClone(newBoard);
    for (let y = newBoard.length - 1; 0 <= y; y--) {
      for (let x = 0; x < newBoard.length; x++) {
        if (newBoard[y][x] === 3 && (y === newBoard.length || newBoard[y + 1][x] === 1)) {
          for (let i = newBoard.length - 1; 0 <= y; y--) {
            resultBoard[i] = newBoard[i].map((num) => (num === 3 ? 1 : num));
          }
        }
      }
    }
    return resultBoard;
  };

  const counter = (board: number[][], number: number): number => {
    let count: number = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === number) {
          count++;
        }
      }
    }
    return count;
  };

  //インターバルされる関数、なかにプログラムの手順を描いていく
  const INTERVAL = () => {
    const newBoard = structuredClone(board);
    stickBlock(newBoard);
    falling(newBoard);
    // deleteline(newBoard);
    // setBoard(newBoard);
  };

  const clickhandller = (y: number, x: number) => {
    console.log('clicked');
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
