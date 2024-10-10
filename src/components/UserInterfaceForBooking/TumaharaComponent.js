import React, { useState } from 'react';

const TumharaComponent = () => {
  // Assume karein ki aapka array data items mein hai
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', quantity: 0 },
    { id: 2, name: 'Item 2', quantity: 0 },
    { id: 3, name: 'Item 3', quantity: 0 }
  ]);

  const handleAdd = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleMinus = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          {item.quantity === 0 ? (
            <button onClick={() => handleAdd(item.id)}>Add</button>
          ) : (
            <div>
              <button onClick={() => handleMinus(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleAdd(item.id)}>+</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TumharaComponent;
