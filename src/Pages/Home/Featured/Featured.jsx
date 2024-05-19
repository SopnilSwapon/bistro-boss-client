import SectionTitle from "../../../components/SectionTiltle/SectionTitle";
import featured from '../../../assets/home/featured.jpg'
import './featured.css'

const Featured = () => {
    return (
        <div className="h-[500px]  featured" >
            <SectionTitle 
            subHeading={'---Check it out---'}
            heading={'---FROM OUR MENU---'}
            ></SectionTitle>
            <div className="md:flex justify-center bg-slate-500 bg-opacity-50 mt-20 mb-20">
                <div className="flex-grow md:pl-20 w-full ">
                    <img className="w-[400px]" src={featured} alt="" />
                </div>
             <div className="w-full p-4 text-white">
             <p>23 Marck 2025</p>
                <p className="uppercase">where can i get some?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vero magni repudiandae nemo delectus neque architecto animi explicabo culpa excepturi, molestiae maiores perspiciatis qui recusandae, aut nihil. Facere earum assumenda delectus dolorum! Provident accusantium nesciunt maxime, iusto non quia deleniti.</p>
            <button className="btn btn-outline bottom-0 border-b-4">ORDER NOW</button>
            </div>
             </div>

            
        </div>
    );
};

export default Featured;