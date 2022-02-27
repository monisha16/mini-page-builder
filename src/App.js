import React from 'react';
import Board from './components/Board/Board';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.Home}>
      <div className={styles.Home__board}> <Board /> </div>
      <div className={styles.Home__sidebar}> <Sidebar /> </div>
    </div>
  );
}

export default App;