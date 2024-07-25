import React, { useEffect, useState } from 'react'
import classes from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

const Results = () => {
  const [results, setResuts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { categoryName } = useParams()
  console.log(categoryName)
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/category/${categoryName}`).then((res) => {
      setResuts(res.data);
      setIsLoading(false)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  }, [])
    return (
      <LayOut>
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px", fontWeight: "bold" }}>
            Category / {categoryName}
          </p>
          <hr />
          {isLoading ? (
            <Loader />
          ) : (
            <div className={classes.products_container}>
              {results?.map((product) => (
                <ProductCard key={product.id} product={product} renderAdd={true} />
              ))}
            </div>
          )}
        </section>
      </LayOut>
    );
}

export default Results
