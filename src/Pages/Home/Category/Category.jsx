import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import slider1 from '../../../assets/home/slide1.jpg'
import slider2 from '../../../assets/home/slide2.jpg'
import slider3 from '../../../assets/home/slide3.jpg'
import slider4 from '../../../assets/home/slide4.jpg'
import slider5 from '../../../assets/home/slide5.jpg'
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../../components/SectionTiltle/SectionTitle';

const Category = () => {
    return (
         <section>
          <SectionTitle
          subHeading={'---From 11:00am to 10:00pm---'}
          heading={'ORDER ONLINE'}
          
          ></SectionTitle>
          <Swiper
        slidesPerView={3}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-10 flex justify-between w-[90%] mx-auto"
      >
        <SwiperSlide>
          <img src={slider1} alt="" />
          <h2 className='uppercase text-2xl font-bold text-center -mt-20'>Salads</h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
          <h2 className='uppercase text-2xl font-bold text-center -mt-20'>Pizzas</h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="" />
          <h2 className='uppercase text-2xl font-bold text-center -mt-20'>Desserts</h2>

        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="" />
          <h2 className='uppercase text-2xl font-bold text-center -mt-16'>SOUp</h2>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider5} alt="" />
          <h2 className='uppercase text-2xl font-bold text-center -mt-16'>Salads</h2>
        </SwiperSlide>
      </Swiper>
         </section>
    );
};

export default Category;