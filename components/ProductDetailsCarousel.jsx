import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const ProductDetailsCarousel = () => {
    return (
        <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                <img src="/product/p2.png" />
                <img src="/product/p3.png" />
                <img src="/product/p4.png" />
                <img src="/product/p5.png" />
                <img src="/product/p6.png" />
                <img src="/product/p7.png" />
            </Carousel>
        </div>
    );
}

export default ProductDetailsCarousel;
