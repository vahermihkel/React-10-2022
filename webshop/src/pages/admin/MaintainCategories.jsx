import config from "../../data/config.json";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function MaintainCategories() {
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(config.categoriesDbUrl)
      .then(res => res.json())
      .then(json => setCategories(json || []));
  }, []);

  const addNewCategory = () => {
    // <input onKeyUp={addNewCategory} />
    //                   (event)
    // console.log(event);
    // if (event.key === "Enter" || event.type === "click") {
      categories.push({"name": categoryRef.current.value})
      fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)})
        .then(() => {
          categoryRef.current.value = "";
          setCategories(categories.slice());
        })
    // }
  
  }

  const deleteCategory = (categoryIndex) => {
    categories.splice(categoryIndex, 1);
    fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)})
      .then(() => {
        toast.success("Edukalt kustutatud!", {
          position: 'bottom-right',
          theme: 'dark'
        });
        setCategories(categories.slice());
      });
  }

  return ( 
    <div>
      <label>Kategooria</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={addNewCategory}>Sisesta</button>
      { categories.map((element, index) => 
        <div key={index}>
          {t(element.name)}
          <button onClick={() => deleteCategory(index)}>x</button>
        </div>
        ) }
        <ToastContainer />
    </div> );
}

export default MaintainCategories;