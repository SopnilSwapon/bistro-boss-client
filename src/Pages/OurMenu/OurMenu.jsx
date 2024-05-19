import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import img from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../components/SectionTiltle/SectionTitle";
import MenuCategory from "./MenuCategory";

const OurMenu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item =>item.category == 'dessert')
    const soup = menu.filter(item =>item.category == 'soup')
    const salad = menu.filter(item =>item.category == 'salad')
    const pizza = menu.filter(item =>item.category == 'pizza')
    const offered = menu.filter(item =>item.category == 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss || menu</title>
            </Helmet>
            <Cover img={img} title='our menu'></Cover>
            {/* main cover */}
            <SectionTitle subHeading="---Don't miss---" heading="TODAY'S OFFER"></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
          {/* desserts menu items */}
            <SectionTitle subHeading="---Don't miss---" heading="TODAY'S OFFER"></SectionTitle>
            <MenuCategory items={desserts} title='dessert' img={dessertImg}></MenuCategory>
            {/* pizza items */}
            <MenuCategory items={pizza} title='pizza' img={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title='salad' img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title='soup' img={soupImg}></MenuCategory>
          
        </div>
    );
};

export default OurMenu;