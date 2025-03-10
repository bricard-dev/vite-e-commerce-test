import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, updateItemFromSelect } from '../features/cart';

export default function Cart({ onClose }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div
      onClick={onClose}
      className="fixed z-10 inset-0 bg-slate-700/75 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-20 relative bg-slate-300 text-slate-900 min-w-[400px] md:min-w-[700px] px-10 pt-10 pb-6 rounded border border-slate-600 mb-[10vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
        >
          X
        </button>
        <ul>
          {cart.cartItems.length > 0 ? (
            cart.cartItems.map((item) => (
              <li key={item.id} className="flex items-center mb-4">
                <img
                  className="w-16 h-16 rounded"
                  src={`/images/${item.img}.png`}
                  alt={item.title}
                />
                <p className="mr-auto ml-2 text-lg font-semibold">
                  {item.title}
                </p>
                <select
                  name="quantity"
                  onChange={(e) =>
                    dispatch(
                      updateItemFromSelect({
                        id: item.id,
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-20 p-2 rounded mr-4"
                  value={item.quantity}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <button
                  onClick={() => dispatch(deleteFromCart(item.id))}
                  className="bg-slate-900 text-slate-200 px-2 inline-flex justify-center items-center p-2 rounded"
                >
                  Remove from cart
                </button>
              </li>
            ))
          ) : (
            <li className="mb-4">No items in the cart</li>
          )}
        </ul>
        <p className="text-xl">
          Your total :{' '}
          <span className="font-semibold">
            {cart.cartItems
              .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
              .toFixed(2)}
            $
          </span>
        </p>
        <button className="block mx-auto bg-slate-800 text-slate-200 px-4 py-2 mt-7 rounded">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
