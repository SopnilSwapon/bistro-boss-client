
const MenuItem = ({item}) => {
    const {name,image, price, recipe} = item
    return (
        <div className="flex space-x-4">
        <img style={{borderRadius: '0 200px 200px 200px'}} className="h-[104px] w-[118px]" src={image} alt="" />
        <div>
            <h2 className="text-xl font-bold">{name}____________</h2>
            <p>{recipe}</p>
        </div>
        <p className="text-yellow-600">${price}</p>
        </div>
    );
};

export default MenuItem;