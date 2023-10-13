import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const ProductDetailsCarousel = ({ data }) => {
    return (
        <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                {
                    data?.map((image, index) => (
                        <img
                            loading="lazy"
                            key={index}
                            src={image.attributes.url}
                            alt={image.attributes.name}
                        />
                    ))
            }
            </Carousel>
        </div>
    );
}

export default ProductDetailsCarousel;
