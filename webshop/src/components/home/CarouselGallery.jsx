// import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselGallery() {
  // const [images, setImages] = useState([
  //   {src: "https://picsum.photos/id/137/500/200", alt: "", header: "1", text: "a"},
  //   {src: "https://picsum.photos/id/237/500/200", alt: "", header: "2", text: "b"},
  //   {src: "https://picsum.photos/id/337/500/200", alt: "", header: "3", text: "c"},
  //   {src: "https://picsum.photos/id/437/500/200", alt: "", header: "4", text: "d"},
  // ]);
  const images = [
      {src: "https://picsum.photos/id/137/500/200", alt: "", header: "1", text: "a"},
      {src: "https://picsum.photos/id/237/500/200", alt: "", header: "2", text: "b"},
      {src: "https://picsum.photos/id/337/500/200", alt: "", header: "3", text: "c"},
      {src: "https://picsum.photos/id/437/500/200", alt: "", header: "4", text: "d"},
    ];

  return ( 
    <Carousel>
      { images.map(element => 
        <Carousel.Item>
          <img
            src={element.src}
            alt={element.alt}
          />
          <Carousel.Caption>
            <h3>{element.header}</h3>
            <p>{element.text}</p>
          </Carousel.Caption>
        </Carousel.Item> 
      )}
    </Carousel>
   );
}

export default CarouselGallery;