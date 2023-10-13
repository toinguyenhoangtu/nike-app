import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getDiscountedPricePercentage } from '../utils/helper'

const ProductCard = ({ data: { attributes: attr, id } }) => {
  return (
    <Link
      className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer shadow-md rounded-lg'
      href={`/product/${attr.slug}`}
    >
      <Image
        className='w-full'
        src={attr.thumbnail?.data?.attributes?.url}
        width={500}
        height={500}
        alt={attr.name}
      />
      <div className='p-2 text-black/[0.9]'>
        <h2 className='text-lg font-medium'>{attr.name}</h2>
        <div className='flex items-center text-black/[0.5]'>
            <p className="mr-2 text-lg font-semibold">
              &#8377;{attr.price}
            </p>

            {attr.original_price && (
              <>
                <p className="text-base  font-medium line-through">
                  &#8377;{attr.original_price}
                </p>
                <p className="ml-auto text-base font-medium text-green-500">
                  {getDiscountedPricePercentage(
                    attr.original_price,
                    attr.price
                  )}
                  % off
                </p>
              </>
            )}
          </div>
        </div>
    </Link>
  )
}

export default ProductCard