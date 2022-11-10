import { useEffect, useRef, useState } from "react";
// import productsFromFile from "../../data/products.json";
import config from "../../data/config.json";

function AddProduct() {
  const [dbProducts, setDbProducts] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
          // setProducts(json);
          setDbProducts(json);
        });
  }, []);

  const add = () => {
    const newProduct = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "image": imageRef.current.value,
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "active": activeRef.current.checked,
    }
    dbProducts.push(newProduct);
  }

  return ( 
    <div>
      <label>ID</label> <br />
      <input ref={idRef} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Kategooria</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button onClick={add}>Lisa</button>
    </div> );
}

export default AddProduct;