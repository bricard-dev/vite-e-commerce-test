import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../features/cart';
import { getProductsList } from '../features/products';

export default function ProductsList() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  if (!products) {
    dispatch(getProductsList());
  }

  return (
    <div className="px-6">
      <h1 className="text-slate-100 text-2xl mb-6">ProductsList</h1>
      <ul className="grid min-[500px]:grid-cols-2 md:grid-cols-3 gap-6">
        {products &&
          products.map((product) => (
            <li key={product.id} className="p-4 bg-slate-200 rounded">
              <img
                className="mb-4"
                src={`/images/${product.img}.png`}
                alt={product.title}
              />
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-700 text-lg">{product.title}</p>
                <p className="text-slate-900 font-bold">{product.price}</p>
              </div>
              <button
                onClick={() => dispatch(addOneToCart(product.id))}
                className={`${
                  product.picked ? 'bg-green-700' : 'bg-slate-600'
                } w-full text-slate-100 px-2 inline-flex items-center justify-center rounded p-2 mr-2`}
              >
                {product.picked ? 'Added' : 'Add to cart'}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
