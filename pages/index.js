
import Banner from '@/components/Banner'
import Wrapper from '@/components/Wrapper'
import ProductCard from '@/components/ProductCard'
import { fetchDataFromApi } from '../utils/api';
import React from 'react';

export default function Home({ products }) {
  return (
    <main>
      <Banner />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with
            increased stack heights to help provide cushioning
            during extended stretches of running.
          </div>
        </div>
        {/* heading and paragaph end */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products?.data?.map(product => (
            <React.Fragment key={product.id}>
              <ProductCard data={product} />
            </React.Fragment>
          ))}
        </div>
        {/* products grid end */}
      </Wrapper>
    </main>
  )
}

export async function getStaticProps() {
  const products = await fetchDataFromApi('/api/products?populate=*');
  return {
    props: { products }
  }
}