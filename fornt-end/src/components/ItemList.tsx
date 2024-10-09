import React from 'react';
import { Item } from './Items';

interface ItemListProps {
  items: Item[];
  handleDelete: (id: number) => void;
  handleEdit: (item: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, handleDelete, handleEdit }) => {
  return (
    <div className="flex flex-col  bg-slate-200 mt-10 py-12 rounded-lg ">
      {items.map(item => (
        <div key={item.id} className="w-[804px] flex gap-1 pr-56 justify-center items-center mx-auto bg-white rounded-2xl mt-4">
          <p className="w-full px-6 py-2 ">{item.name}</p>
          <div className="mx-auto grid grid-cols-2 gap-1 justify-center items-center py-2">
            <div className="w-full flex flex-col justify-center items-center mx-auto mr-4 px-7">
              <button onClick={() => handleEdit(item)} className="bg-sky-400 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-sky-700">
                Edit
              </button>
            </div>
            <div className="w-full flex flex-col justify-center items-center mx-auto ml-4">
              <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
