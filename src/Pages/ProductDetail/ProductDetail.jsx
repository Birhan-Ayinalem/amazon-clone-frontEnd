import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../Landing/Landing'



const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const { productId } = useParams();
  // console.log(productId)
  

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res);
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch(() => {
        // console.log(err);
        setIsLoading(false)
      });
  }, []);
  
    console.log(product)

    return (
      <LayOut>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductCard
            product={product}
            flex={true}
            productDesc={true}
            renderAdd={true}
          />
        )}
      </LayOut>
    );
}

export default ProductDetail
