import Wrapper from "@/components/Wrapper";
import React, { useState } from "react"
import { fetchDataFromApi } from "@/utils/api";
import { getDiscountedPricePercentage } from "../../utils/helper";
import { IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelativedProduct from "@/components/RelativedProduct";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetails({ product, products }) {
    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const attr = product?.data?.[0]?.attributes;
    const dispatch = useDispatch();
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (attr && selectedSize) {
            dispatch(
                addToCart({
                    ...product?.data?.[0],
                    selectedSize,
                    oneQuantityPrice: attr.price,
                })
            )
            toast.success('Added product successfully')
        }
    }
    return (
        <div className="w-full md:py-20">
            <ToastContainer />
            <Wrapper>
                <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                    {/* left column start */}
                    <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                        {
                            <ProductDetailsCarousel data={attr.images.data} />
                        }
                    </div>
                    {/* left column end */}
                    {/* right column start */}
                    <form className="flex-[1] py-3" onSubmit={handleSubmit}>
                        {/* PRODUCT TITLE */}
                        <div className="text-[28px] font-semibold mb-2 leading-tight">
                            {attr.name}
                        </div>
                        {/* PRODUCT SUBTITLE */}
                        <div className="text-lg font-semibold mb-5">
                            {attr.subtitle}
                        </div>
                        {/* PRODUCT PRICE */}
                        <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{attr.price}
                            </p>
                            {attr.original_price ? (
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
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="text-md font-medium text-black/[0.5]">
                            incl. of taxes
                        </div>
                        <div className="text-md font-medium text-black/[0.5] mb-20">
                            {`(Also includes all applicable duties)`}
                        </div>
                        {/* PRODUCT SIZE RANGE START */}
                        <div className="mb-10">
                            {/* HEADING START */}
                            <div className="flex justify-between mb-2">
                                <div className="text-md font-semibold">
                                    Select Size
                                </div>
                                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                    Select Guide
                                </div>
                            </div>
                            {/* HEADING END */}

                            {/* SIZE START */}
                            <div id="scrollTo" className="grid grid-cols-3 gap-2">
                                {
                                    attr.size.data.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`border rounded-md text-center py-3 font-medium transition ease-out 
                                            ${item.enabled
                                                    ? "hover:border-black cursor-pointer"
                                                    : "cursor-not-allowed bg-black/[0.1] opacity-50 border-none"}
                                            ${selectedSize === item.size
                                                    ? "border-black"
                                                    : ""
                                                }`}
                                            onClick={() => {
                                                if (item.enabled == true) {
                                                    setSelectedSize(item.size);
                                                    setShowError(false)
                                                }
                                            }}
                                        >
                                            {item.size}
                                        </div>
                                    ))
                                }
                            </div>
                            {/* SIZE END */}
                            {/* SHOW ERROR START */}
                            {
                                showError && (
                                    <div className="text-red-600 mt-1">
                                        Size selection is required
                                    </div>
                                )
                            }
                            {/* SHOW ERROR END */}
                        </div>
                        {/* PRODUCT SIZE RANGE END */}

                        {/* ADD TO CART BUTTON START */}
                        <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium  transition active:scale-95 mb-3 hover:opacity-75 ease-out"
                            onClick={() => {
                                if (!selectedSize) {
                                    setShowError(true);
                                    document
                                        .getElementById("scrollTo")
                                        .scrollIntoView({
                                            block: 'center',
                                            behavior: 'smooth'
                                        })
                                }
                            }}
                        >
                            Add to Cart
                        </button>
                        {/* WHISHLIST BUTTON START */}
                        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                            Whishlist
                            <IoMdHeartEmpty size={20} />
                        </button>
                        {/* WHISHLIST BUTTON END */}
                        <div>
                            <div className="text-lg font-bold mb-5">
                                Product Details
                            </div>
                            <div className="markdown text-md mb-5">
                                <ReactMarkdown>{attr.description}</ReactMarkdown>
                            </div>
                        </div>
                    </form>
                    {/* right column end */}
                </div>
                <RelativedProduct products={products} />
            </Wrapper>
        </div>
    )
}

export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromApi(
        `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products,
        },
    };
}