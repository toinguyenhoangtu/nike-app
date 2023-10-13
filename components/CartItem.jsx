import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateCart, removeCart } from "../store/cartSlice";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const CartItem = ({ data }) => {

    const attr = data.attributes;

    const dispatch = useDispatch();

    const [showFromConfirm, setShowFromConfirm] = useState(false);

    const updateCartItem = (e, key) => {
        let payload = {
            key,
            val: key === 'quantity' ? parseInt(e.target.value) : e.target.value,
            id: data.id,
        };
        dispatch(updateCart(payload))
    }
    const removeCartItem = (id) => {
        if (id) {
            Promise
                .resolve(
                    dispatch(removeCart(id))
                )
                .then(() => {
                    toast.success('Removed product successfully');
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Delete item failed ! ')
                });
        }
    }



    return (
        <div className='flex py-5 gap-3 md:gap-5 border-b'>
            {/* IMAGE START */}
            <ToastContainer />
            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                <Image
                    src={attr.thumbnail?.data?.attributes?.url}
                    alt={attr.name}
                    width={120}
                    height={120}
                />
            </div>
            {/* IMAGE END */}
            <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row md:justify-between">
                    {/* PRODUCT TITLE */}
                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8] max-md:mr-auto">
                        {attr.name}
                    </div>

                    {/* PRODUCT SUBTITLE */}
                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden max-md:mr-auto">
                        {attr.subtitle}
                    </div>

                    {/* PRODUCT PRICE */}
                    <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2 ml-0 max-md:mr-auto">
                        MRP : &#8377;{attr.price}
                    </div>
                </div>

                {/* PRODUCT SUBTITLE */}
                <div className="text-md font-medium text-black/[0.5] hidden md:block mr-auto">
                    {attr.subtitle}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Size:</div>
                            <select className="hover:text-black shadow-[0px_0px_3px_1px_#cbd5e0] rounded-lg transition ease-out py-1 px-1">
                                {
                                    attr.size.data.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item.size}
                                                disabled={
                                                    !item.enabled ? true : false
                                                }
                                                selected={data.selectedSize === item.size}
                                            >
                                                {item.size}
                                            </option>
                                        )
                                    }
                                    )
                                }
                            </select>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="font-semibold">Quantity:</div>
                            <select className="hover:text-black  transition ease-out py-1 px-1"
                                onChange={(e) => updateCartItem(e, 'quantity')}
                            >
                                {
                                    Array.from(
                                        { length: 10 },
                                        (_, i) => i + 1
                                    ).map((q, i) => {
                                        return (
                                            <option
                                                key={i}
                                                value={q}
                                                selected={data.quantity === q}
                                            >{q}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <RiDeleteBin6Line
                        className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                        onClick={() => setShowFromConfirm(true)}
                    />
                    {
                        showFromConfirm && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
                                <div className="bg-white p-6 rounded-md">
                                    <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                                    <p>Are you sure you want to delete this item?</p>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white"
                                            onClick={() => removeCartItem({ id: data.id })}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                                            onClick={() => setShowFromConfirm(false)}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    );
}

export default CartItem