import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as menuApi from '../api/menu/menu';

export default function MenuItemForm() {
        const {id} = useParams();
        const navigate = useNavigate();
        const [menuItem, setMenuItem] = useState({
            name: '',
            description: '',
            price: '',
            image: '',
            category: '',
            sizes: [],
        });

        useEffect(() => {
            if (id) {
              const fetchMenuItem = async () => {
                const data = await menuApi.getMenuItemById(id);
                setMenuItem(data);
              };
              fetchMenuItem();
            }
          }, [id]);

          const handleChange = (e) => {
            const { name, value } = e.target;
            setMenuItem({ ...menuItem, [name]: value });
          };

          const handleSubmit = async (e) => {
            e.preventDefault();
            if (id) {
              await menuApi.updateMenuItem(id, menuItem); 
            } else {
              await menuApi.createMenuItem(menuItem); 
            }
            navigate('/menu'); 
          };

    return(
       <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={menuItem.name}
        onChange={handleChange}
        placeholder="Product name"
      />
      <textarea
        name="description"
        value={menuItem.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="price"
        value={menuItem.price}
        onChange={handleChange}
        placeholder="Price"
      />
        <input
        type="text"
        name="image"
        value={menuItem.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
        <input
        type="text"
        name="category"
        value={menuItem.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <input
        type="text"
        name="sizes"
        value={menuItem.sizes.join(', ')}
        onChange={(e) => setMenuItem({ ...menuItem, sizes: e.target.value.split(', ') })}
        placeholder="Size, through, comma"
      />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}
