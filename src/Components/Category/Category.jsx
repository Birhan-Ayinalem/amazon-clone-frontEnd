import React from 'react'
import { categoryInfos } from './CategoryFullInfos'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'
const Category = () => {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos) => (
        <CategoryCard data={infos} key={infos.id} />
      ))}
    </section>
  );
}

export default Category