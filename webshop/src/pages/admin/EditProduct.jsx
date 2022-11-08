import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function EditProduct() {
  //const { id } = useParams();  // console.log(id);
  const params = useParams();              //             49950471 === "49950471"

  const productFound = productsFromFile.find(element => element.id === Number(params.id));
  const index = productsFromFile.indexOf(productFound);
  
  // const index2 = productsFromFile.findIndex(element => element.id === Number(params.id));
  // const productFound2 = productsFromFile[index2];

  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  const navigate = useNavigate();

  const update = () => {
    const updatedProduct = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "image": imageRef.current.value,
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "active": activeRef.current.checked,
    }
    productsFromFile[index] = updatedProduct;
    navigate("/admin/maintain-products");
  }

  const [idUnique, setIdUnique] = useState(true);

  const checkIdUniqueness = () => {
    if (params.id === idRef.current.value) {
      setIdUnique(true);
      console.log("PANID SAMA ID TAGASI");
      return; // selle kohaga saab funktsioon läbi
    } 
      
    const found = productsFromFile.find(element => element.id === Number(idRef.current.value));
    if (found === undefined) {
      setIdUnique(true);
      console.log("KEDAGI SELLISE ID-GA EI LEIDNUD, UNIKAALNE!");
    } else {
      setIdUnique(false);
      console.log("LEIDSIN KELLELGI SELLISE ID, MITTEUNIKAALNE!");
    }
    
  }

  return ( 
    <div>
      { productFound !== undefined && 
        <div>
         { idUnique === false && <div>Sisestatud ID on kellelgi teisel olemas!</div>}
          <label>ID</label> <br />
          <input ref={idRef} onChange={checkIdUniqueness} defaultValue={productFound.id} type="number" /> <br />
          <label>Nimi</label> <br />
          <input ref={nameRef} defaultValue={productFound.name} type="text" /> <br />
          <label>Hind</label> <br />
          <input ref={priceRef} defaultValue={productFound.price} type="number" /> <br />
          <label>Pilt</label> <br />
          <input ref={imageRef} defaultValue={productFound.image} type="text" /> <br />
          <label>Kategooria</label> <br />
          <input ref={categoryRef} defaultValue={productFound.category} type="text" /> <br />
          <label>Kirjeldus</label> <br />
          <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
          <label>Aktiivne</label> <br />
          <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
          <button disabled={idUnique === false} onClick={update}>Uuenda</button>
               {/* disabled={!idUnique} */}
        </div>
      }
      { productFound === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default EditProduct;

// SINGLEPRODUCT --- HomePage seest sattumine
// 1. Teha võimekus App.js sisse URL parameetri vastuvõtmine
// 2. Saata toodete haldamise lehelt URLi parameeter
// 3. Võtta see parameeter muutujasse useParams abil
// 4. Võtame kõik tooted
// 5. Kõikide toodete seast otsime üles õige toote
// 6. Kuvame toote HTMLs
// 7. Teeme kontrollid, kui ei leitud toodet, 
//      siis leht ei jookseks kokku

// ADDPRODUCT
// 8. Teeme igale võtmele ref-i:
//     id, name, price, category, image, description, active
// 9. Teeme 7x label + input ja paneme inputi sisse ref-d
// 10. Teeme nupu ja temaga seoses funktsiooni
// 11. Funktsiooni sees seome kokku 7x ref.current.value
//      väärtused ühtseks objektiks
// 12. Editis muudame, Addis lisame

// 13. Editis meil on vaja leida ka järjekorranumber (et muuta)
// 14. Lisame defaultValue igale inputile
// 15. Pärast editimist suuname kasutaja Toodete haldamise lehele