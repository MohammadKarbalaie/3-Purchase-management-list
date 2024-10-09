import React from 'react';
import { Item } from './Items'; // اطمینان از وارد کردن صحیح Item

interface AddItemFormProps {
  newItem: string;
  setNewItem: (value: string) => void;
  onAdd: () => void;
  editingItem: Item | null;
  onSaveEdit: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ newItem, setNewItem, onAdd, editingItem, onSaveEdit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onSaveEdit();
    } else {
      onAdd();
    }
  };

  return (
    <div className="w-full bg-slate-500 py-4 px-60 rounded-lg">
      <form onSubmit={handleSubmit} className="flex gap-1 justify-center items-center mx-auto">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          name="itemname"
          id="itemnameid"
          className="border py-2 px-6 rounded-md"
          placeholder="Enter Item Name"
        />
        <button type="submit" className="bg-green-500 text-white px-4 rounded-md py-2">
          {editingItem ? 'Save Edit' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddItemForm;
