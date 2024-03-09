import React, { useState} from 'react';
//import CreatePost from '../createPost/CreatePost';
import ProductCard from '../productCard/ProductCard';
import { ITEM, ProdItem } from '../../interfaces';


function ProductDisplay() {
    //  const [modalShow, setModalShow] = useState(false);
      const [items, setItems] = useState<ProdItem[]>(ITEM);// This state will hold the data for ProductCard // what does useState<FormData[]>([]) do and for?
    //  console.log("This is Items in prdDisplay", items) // this gets displayed twice for some reason
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {[...items].reverse().map((item, index) => (
        // Render a ProductCard for each item, passing the item as a prop
        <ProductCard key={index} item={item} />
    ))}
</div>
  )
}
// new item only gets displayed when i reload this component dont know why
export default ProductDisplay;
