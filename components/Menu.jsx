import Link from "next/link"
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs"

const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
    { id: 1, name: "Jordan", doc_count: 11 },
    { id: 2, name: "Sneakers", doc_count: 8 },
    { id: 3, name: "Running shoes", doc_count: 64 },
    { id: 4, name: "Football shoes", doc_count: 107 },
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
                                            {subMenuData.map((submenu) => {
                                                return (
                                                    <Link key={submenu.id} href={submenu.name}>
                                                        <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.3] transition hover:duration-75">
                                                            {submenu.name}
                                                            <span className="opacity-50 text-s">{submenu.doc_count}</span>
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