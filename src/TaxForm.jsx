import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';

const itemsApiResponse = [
  {
    id: 14864,
    name: 'Recurring Item',
    category: null,
    checked: false
  },
  {
    id: 14865,
    name: 'Jasinthe Bracelet',
    category: { id: 14866, name: 'Bracelets' },
    checked: false
  },
  {
    id: 14867,
    name: 'Jasinthe Bracelet',
    category: { id: 14866, name: 'Bracelets' },
    checked: false
  },
  {
    id: 14868,
    name: 'Recurring Item with questions',
    category: null,
    checked: false
  },
  {
    id: 14869,
    name: 'Zero amount item with questions',
    category: null,
    checked: false
  },
  {
    id: 14870,
    name: 'Inspire Bracelet',
    category: { id: 14866, name: 'Bracelets' },
    checked: false
  },
  {
    id: 14872,
    name: 'Normal item with questions',
    category: null,
    checked: false
  },
  {
    id: 14873,
    name: 'Normal item',
    category: null,
    checked: false
  }
];

const TaxForm = () => {
  const [items, setItems] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(itemsApiResponse);
  }, []);

  const handleCategoryChange = (categoryId) => {
    const updatedItems = items.map(item => {
      if (item.category && item.category.id === categoryId) {
        return { ...item, checked: !allSelected };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleApplyTax = (values) => {
    const applicableItems = items.filter(item => item.checked).map(item => item.id);
    console.log({ applied_to: values.applied_to, applicable_items: applicableItems });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <Formik
      initialValues={{
        taxName: '',
        taxPercentage: 0,
        applied_to: 'some',
      }}
      onSubmit={handleApplyTax}
    >
      {({ values, handleChange }) => (
        <Form className="p-4">
          <div className="flex items-center space-x-2">
            <Field
              name="taxName"
              className="border border-gray-300 rounded-md p-2 w-full"
              placeholder="Tax Name"
            />
            <div className="relative">
              <Field
                name="taxPercentage"
                type="number"
                className="border border-gray-300 rounded-md p-2 w-20 text-center"
                placeholder="4"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <Field
                type="radio"
                name="applied_to"
                value="all"
                onChange={(e) => {
                  handleChange(e);
                  setAllSelected(true);
                  setItems(items.map(item => ({ ...item, checked: true })));
                }}
                className="form-radio"
              />
              <span>Apply to all items in collection</span>
            </label>

            <label className="flex items-center space-x-2 mt-2">
              <Field
                type="radio"
                name="applied_to"
                value="some"
                onChange={(e) => {
                  handleChange(e);
                  setAllSelected(false);
                  setItems(items.map(item => ({ ...item, checked: false })));
                }}
                className="form-radio"
              />
              <span>Apply to specific items</span>
            </label>
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search Items"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mt-4 max-h-48 overflow-y-auto">
            {filteredItems.map((item) => (
              <div key={item.id}>
                {item.category ? (
                  <div className="bg-gray-200 p-2 rounded-md mt-2">
                    <label className="flex items-center space-x-2">
                      <Field
                        type="checkbox"
                        checked={allSelected || item.checked}
                        onChange={() => handleCategoryChange(item.category.id)}
                        className="form-checkbox"
                      />
                      <span>{item.category.name}</span>
                    </label>
                  </div>
                ) : (
                  <label className="flex items-center space-x-2 mt-2">
                    <Field
                      type="checkbox"
                      name="items"
                      value={item.id}
                      checked={allSelected || item.checked}
                      onChange={(e) => {
                        const updatedItems = items.map(i =>
                          i.id === item.id ? { ...i, checked: e.target.checked } : i
                        );
                        setItems(updatedItems);
                      }}
                      className="form-checkbox"
                    />
                    <span>{item.name}</span>
                  </label>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-orange-500 text-white rounded-md py-2 text-center"
          >
            Apply tax to {filteredItems.filter(item => item.checked || allSelected).length} item(s)
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TaxForm;
