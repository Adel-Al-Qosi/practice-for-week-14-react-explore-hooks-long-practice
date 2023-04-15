import React, { useEffect, useState } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  const [sideOpen, setSideOpen] = useState(
    localStorage.getItem('sideOpen') === 'true' ? true : false
  );
  const [selectedProduct, setSelectedProduct] = useState()

  useEffect(() => {
    localStorage.setItem('sideOpen', sideOpen);
  }, [sideOpen]);

  useEffect(() => {
    if (selectedProduct) setSideOpen(true)
  }, [selectedProduct])

  useEffect(() => {
    if(!sideOpen) setSelectedProduct()
  }, [sideOpen])

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
