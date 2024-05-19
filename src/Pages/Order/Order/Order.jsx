import Cover from "../../Shared/Cover/Cover";
import orderImg from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../Hooks/useMenu";
import FoodCart from "../../../components/FoodCart/FoodCart";

const Order = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item =>item.category == 'dessert')
    const soup = menu.filter(item =>item.category == 'soup')
    const salad = menu.filter(item =>item.category == 'salad')
    const pizza = menu.filter(item =>item.category == 'pizza')
    const offered = menu.filter(item =>item.category == 'offered')
    return (
        <div>
            <Cover img={orderImg} title={'Our order'}></Cover>
            <Tabs>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUP</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <div className="grid md:grid-cols-3 gap-10">
                {
                    desserts.map(item => <FoodCart key={item._ids} item={item}></FoodCart>)
                 }
                </div>
                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 3</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 4</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 5</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;