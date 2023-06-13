import Image from "next/image";


const CartItem = () => {
    return (
        <div className='flex py-5 gap-3 md:gap-5 border-b'>
            {/* IMAGE START */}
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Image
                    src='/product/p1.png'
                    alt='cart'
                    width={120}
                    height={120}
                />
            </div>
            {/* IMAGE END */}
            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                        name
                    </div>

                    {/* PRODUCT SUBTITLE */}
                    <div className="text-sm md:text-md font-medium text-black/[0.5] md:hidden flex justify-start">
                        Men's Golf
                    </div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
                        MRP : &#8377;19 695.00
                    </div>
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                    SUBTITLE
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div>
                            <select className="hover:text-black">
                                <option value="1">UK 6</option>
                                <option value="1">UK 6</option>
                                <option value="1">UK 6</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select className="hover:text-black">
                                <option value="1">UK 6</option>
                                <option value="1">UK 6</option>
                                <option value="1">UK 6</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem