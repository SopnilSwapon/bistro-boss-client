import Cover from "../../Shared/Cover/Cover";
import orderImg from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../Hooks/useMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'desserts', 'drinks']
    const {category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const {menu} = useMenu();
    const desserts = menu.filter(item =>item.category == 'dessert');
    console.log("dessert came", desserts);
    const soup = menu.filter(item =>item.category == 'soup')
    const salad = menu.filter(item =>item.category == 'salad')
    const pizza = menu.filter(item =>item.category == 'pizza')
    const drinks = menu.filter(item =>item.category == 'drinks')
    return (
        
        <div>
            <Helmet>
                <title>Bistro Boss || Order food</title>
            </Helmet>
            <Cover img={orderImg} title={'Our order'}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index)=>setTabIndex(index)} className='mt-10'>
                <TabList className='mb-4 md:w-1/2 mx-auto'>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUP</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <TabPanel>
                <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;