
'use client';
import MineSweeper from '../../../components/minesweeper/minesweeper';
import Navbar from '../../../components/homePage/navbar';


const Page=()=> {
  return (
    <main >
      <Navbar/>
      <MineSweeper></MineSweeper>
    </main>
  )
}

export default Page;