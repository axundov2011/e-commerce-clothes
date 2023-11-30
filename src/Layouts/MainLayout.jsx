import React, { useEffect, useState } from "react"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import Proptypes from "prop-types"
import Search from "../components/Modals/Search/Search"
import Dialog from "../components/Modals/Dialog/Dialog"
const MainLayout = ({children}) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShowModal, setDialogShowModal] = useState(false);

useEffect(() => {
  //Burada deyirem ki eger dialog modali varsa "JSON.parse(localStorage.getItem("dialog"))" al otur "dialogStatus" icerisinde 
  //Daha sonra yoxdursa eger true olaraq bunu "localStorage.setItem("dialog", JSON.stringify(true))" elave et dedik
  const dialogStatus = localStorage.getItem("dialog") ? JSON.parse(localStorage.getItem("dialog")) : localStorage.setItem("dialog", JSON.stringify(true))
  //Deyirem ki men sehifeye daxil olarken modal bir defe acilsin. Onu da dependensy arraynan edirik []
  setTimeout(() => {
    setDialogShowModal(dialogStatus)
  }, 2000)
}, [])
  return (
    <div className="main-layout">
      <Dialog isDialogShowModal={isDialogShowModal} setDialogShowModal={setDialogShowModal}/>
        <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow}/>
      <Header setIsSearchShow={setIsSearchShow}/>
      {children}
      <Footer/>
    </div>
  )
}

export default MainLayout

MainLayout.prototype = {
    children : Proptypes.node
}
