import React from 'react';

type DataItem = { id: string; [key: string]: any };

interface EditorSectionProps<T extends DataItem> {
  title: string;
  items: T[];
  setItems: (items: T[]) => void;
  newItem: Omit<T, 'id'>;
  children: (item: T, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, index: number) => React.ReactNode;
}

const EditorSection = <T extends DataItem>({ title, items, setItems, newItem, children }: EditorSectionProps<T>) => {
  const handleAddItem = () => {
    const newId = `${title.toLowerCase()}-${Date.now()}`;
    setItems([...items, { ...newItem, id: newId } as T]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={item.id} className="mb-8 p-6 border border-border-color rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary-text">{title} {index + 1}</h3>
            {items.length > 0 && (
              <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 text-sm hover:underline">
                Remove
              </button>
            )}
          </div>
          {children(item, (e) => handleChange(e, index), index)}
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <button onClick={handleAddItem} className="px-6 py-3 bg-accent text-white rounded-md hover:opacity-90 font-semibold">
          Add to {title}
        </button>
      </div>
    </div>
  );
};

export default EditorSection;
