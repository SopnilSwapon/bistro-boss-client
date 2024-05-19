import { Link } from "react-router-dom";
import Cover from "../Shared/Cover/Cover";
import MenuItem from "../Shared/MenuItem/MenuItem";

const MenuCategory = ({items, title, img}) => {
    return (
        <div>
            {
                title && <Cover img={img} title={title}></Cover>
            }
            <div className="grid md:grid-cols-2 gap-10 p-4 mt-10 pt-4">
                {
                    items.map(item =><MenuItem 
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div> 
           <Link to={`/order/${title}`}> <button className="btn btn-outline bottom-0 border-b-4 mb-16">ORDER NOW</button></Link>
        </div>
    );
};

export default MenuCategory;