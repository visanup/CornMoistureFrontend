import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import Inspection from './components/Inspection/Inspection';
import Realtimegraph from './components/Realtimegraph/Realtimegraph';

function App() {
  return (
    <>
        <Navbar />
        <Inspection />
        <Realtimegraph />
    </>
  )
}

export default App

// แก้ไข
// 1. กราฟเกิน 150 ค่าแล้วไม่คำนวณเด่วปรับให้เก็บค่าได้มากขึ้น
// 2. หน้าเว็ปมันใหญ่ไปให้มันอยู่ในหน้าเด่วกันก่อน
// 3. ต้องปรับตัวโปรแกรมให้สามารถที่จะกดทีเดียว แล้วทุกอย่างรันขึ้นมา ลองใช้ไฟล์ .bat
// 4. ความชื้น 12.6 กุว่าได้ 14 เฉยๆ