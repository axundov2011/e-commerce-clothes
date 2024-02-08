import React, { useState } from 'react'
import "./Search.css"
import api from "../../../components/api/Auth.services"
import { message } from 'antd'
const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  } 
  const handleSearch = async (e) => {
    e.preventDefault();
    //Normalda bir inputun icine onchange ile target value ile aliriq bu ise bir basqa yontemdir,
    //Buda maraqli ve sade yontemdir eslinde
    const productName = e.target[0].value

    if(productName.trim().length === 0 ){
      message.warning('Boş karakter yazamazsınız!')
    }
    try {
      const res = await api.get(`/products/search/${productName}`);
      
      const data = await res.data;
      if(data) {
       setSearchResults(data);
      }

   console.log(searchResults);

      // if (res.status === 200) {
      //   setSearchResults(res.data); // Yeni arama sonuçlarını state'e ekleyin
      //   message.success("Ürün getirildi:");
      // } else if (!res) {
      //   message.error("Ürün getirme hatası:");
      // }

    } catch (error) {
      console.error(error);

    }
  };
  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">Start typing to see products you are looking for.</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div className="results" style={{ display: `${searchResults?.length === 0  || searchResults ?  "flex" : "grid"}` }}>
           {!searchResults && <b className='result-item'
             style={{ justifyContent: 'center', 
             width:"100%"
             }}
           >Ürün ara...</b>}
            {
              searchResults?.length === 0 && (
                <a href='#' 
                   className='result-item' 
                   style={{ justifyContent: 'center', 
                   width:"100%"
                   }}>
               😔Aradığınız Ürün Bulunamadı😔               
                   </a>
              )
            }
            {searchResults?.length > 0 && searchResults?.map((resultItem) => (
              <a href="#" className="result-item" key={resultItem._id}>
                <img src={resultItem?.img[0]} className="search-thumb" alt="" />
                <div className="search-info">
                  <h4>{resultItem.name}</h4>
                  <span className="search-sku">SKU: PD0016</span>
                  <span className="search-price">${resultItem.price.current.toFixed(2)}</span>
                </div>
              </a>
            ))
            }

          </div>
        </div>
        <i className="bi bi-x-circle" id="close-search" onClick={handleCloseModal}></i>
      </div>
      <div className='modal-overlay' onClick={handleCloseModal}></div>
    </div>
  )
}

export default Search
