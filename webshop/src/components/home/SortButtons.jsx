
function SortButtons(props) {

  // sorteerimist    .sort()   localeCompare
  // võtame kõik kategooriad toodete küljest ja kuvame need -> ["guitar", "drum"]   .map()
  // filtreerimist kui ühe kategooria peale klikitakse    .filter()
  const sortAZ = () => {
    // ["guitar", "drum"].sort();
    props.products.sort((a,b) => a.name.localeCompare(b.name));
    props.setProducts(props.products.slice());
  }

  const sortZA = () => {
    //1.  products.sort((a,b) => a.name.localeCompare(b.name)).reverse();
    //2.  products.sort((a,b) => -1 * a.name.localeCompare(b.name));
    props.products.sort((a,b) => b.name.localeCompare(a.name));
    props.setProducts(props.products.slice());
  }

  const sortPriceAsc = () => {
    props.products.sort((a,b) => a.price - b.price);
    props.setProducts(props.products.slice());
  }

  const sortPriceDesc = () => {
    props.products.sort((a,b) => b.price - a.price);
    props.setProducts(props.products.slice());
  }
  return ( 
    <>
      <button onClick={sortAZ}>Sorteeri A-Z</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
    </>
   );
}

export default SortButtons;