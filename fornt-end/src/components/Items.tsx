import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import axios from 'axios';

export interface Item {
  id: number;
  name: string;
}

const Itemsrender: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:2000/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:2000/items', { name: newItem });
      setItems([...items, response.data]);
      setNewItem('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:2000/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (item: Item) => {
    setEditingItem(item);
    setNewItem(item.name);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      const response = await axios.put(`http://localhost:2000/items/${editingItem.id}`, { name: newItem });
      setItems(items.map(item => (item.id === response.data.id ? response.data : item)));
      setEditingItem(null);
      setNewItem('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=''>
      <AddItemForm
        newItem={newItem}
        setNewItem={setNewItem}
        onAdd={handleAdd}
        editingItem={editingItem}
        onSaveEdit={handleSaveEdit}
      />

      <ItemList
        items={items}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Itemsrender;
