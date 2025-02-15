import { useState, useEffect } from "react";


function Products(){
    const [products, setProducts] = useState([]);
    const [sampleProduct, setSampleProduct] = useState(null);
  
    
  
    useEffect(() => {
      fetch("/my-react-app/api/products.json")
        .then(res => res.json())
        .then(res => setProducts(res));
    }, []);
  
  
    useEffect(() => {
      fetch("/my-react-app/api/products/1.json")
        .then(res => res.json())
        .then(res => setSampleProduct(res));  
    }, []);
  


    return (
      <div>
        
        {sampleProduct && <div>The first product is: {sampleProduct.name}</div>}
  
        <ul>
          {products.map(p => (
            <li key={p.id}>
              <figure>
                <img src={`${p.imageUrl}`} alt={p.name} />
                <figcaption>{p.name} - {p.description}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Products;