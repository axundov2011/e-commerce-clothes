import { useEffect, useState } from "react"

import Slider from "react-slick";


import "./Galery.css"


const PrevBtn = ({ onClick }) => {

    return (
        <button 
        className="glide__arrow glide__arrow--left" 
        onClick={onClick} 
        data-glide-dir="<"
        style={{zIndex:'2'}}
        >
            <i className="bi bi-chevron-left"></i>
        </button>

    )
}

const NextBtn = ({ onClick }) => {
    return (
        <button 
        className="glide__arrow glide__arrow--right" 
        onClick={onClick} 
        data-glide-dir=">"
        style={{zIndex:'2'}}
        >
            <i className="bi bi-chevron-right"></i>
        </button>
    )
}
const Gallery = ({ singleProduct }) => {
    const [activeImg, setActiveImg] = useState({
        img: "",
        imageIndex: 0
    });

//useEffectnen bunu ona gore edirem ki search ederken 
//her hansisa product cixanda onun uzerine tikladigimda arxa fonda o urun detayi gelsin
    useEffect(() => {
    setActiveImg({
        img: singleProduct.img[0],
        imageIndex: 0
    })
    }, [singleProduct.img])

    const SliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextBtn />,
        prevArrow: <PrevBtn />,
        autoplaySpeed: 3000,
        autoplay: true,

    }
 
    return (
        <div className="product-gallery">
            <div className="single-image-wrapper">
                <img src={`${activeImg.img}`} id="single-image" alt="" />
            </div>
            <div className="product-thumb">
                <div className="glide__track" data-glide-el="track">
                    <ol className="gallery-thumbs glide__slides">
                        <Slider {...SliderSettings}>
                            { singleProduct.img.map((itemImg, index) => 
                            (
                              <li className="glide_slide glide_slide--active"
                               key={index} 
                               onClick={() => setActiveImg({
                                img: singleProduct.img[index],
                                imageIndex:index
                               }) 
                                /*Burada ki onclick her sekile tikladigimiz da gedir 
                                data.jsonda ki sekilleri getirir */}>
                                 <img 
                                 src={`${itemImg}`} 
                                 className={`img-fluid 
                                 ${ activeImg.imageIndex === index ? 
                                 'active' 
                                 : ""}`} />
                                    </li>
                                ))
                            }
                        </Slider>
                    </ol>
                </div>
                <div className="glide__arrows" data-glide-el="controls">

                </div>
            </div>
        </div>
    )
}

export default Gallery
