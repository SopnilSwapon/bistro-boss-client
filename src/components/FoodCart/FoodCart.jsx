
const FoodCart = ({item}) => {
    const {name,image, price, recipe} = item;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="bg-black text-white absolute right-2 mt-3 p-1 rounded-sm font-bold">${price}</p>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-outline bottom-0 border-b-4 border-orange-600 bg-slate-300">ADD CART</button>
    </div>
  </div>
</div>
    );
};

export default FoodCart;