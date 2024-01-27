
'use client';
import { Nav } from 'react-bootstrap';
import TTT from '../../components/TicTacToe/TTT';
import Navbar from '../../components/homePage/navbar';
import styles from './Page.module.scss';


const Home=()=> {
  return (
    <main className={styles.mainComponent}>
      <Navbar/>
      <TTT></TTT>
    </main>
  )
}

export default Home;