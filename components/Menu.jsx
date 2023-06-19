import Link from "next/link"
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs"

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
];

function Menu({ showCatMenu, setShowCatMenu, categories }) {

    return (
        <ul className="hidden md:flex items-center gap-8 font-medium text-black">
            {
                data.map((items) => {
                    return (
                        <Fragment key={items.id}>
                            {!!items?.subMenu ? (
                                <li className="cursor-pointer flex items-center gap-2 relative"
                                    onMouseEnter={() => setShowCatMenu(true)}
                                    onMouseLeave={() => setShowCatMenu(false)}
                                >
                                    {items.name}
                                    <BsChevronDown size={14} />
                                    {showCatMenu && (
                                        <ul className="bg-white absolute top-6 min-w-[250px] px-1 text-black shadow-lg transition-transform">
                                            {categories?.map(({attributes: attr, id}) => {
                                                return (
                                                    <Link key={id} href={`/category/${attr.slug}`}>
                                                        <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.3] transition hover:duration-75">
                                                            {attr.name}
                                                            <span className="opacity-50 text-s">{attr.products?.data?.length}</span>
                                                        </li>
                                                    </Link>
                                                )
                                            })
                                            }
                                        </ul>
                                    )
                                    }
                                </li>
                            )
                                :
                                (
                                    <li className="cursor-pointer">
                                        <Link href={items.url}>
                                            {items.name}
                                        </Link>
                                    </li>
                                )}
                        </Fragment>
                    )

                })
            }
        </ul>
    )
}

export default Menu