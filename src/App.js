import React from 'react';
import Canvas from './components/Canvas/Canvas';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.Home}>
      <div className={styles.Home__canvas}> <Canvas /> </div>
      <div className={styles.Home__sidebar}> <Sidebar /> </div>
    </div>
  );
}

export default App;
