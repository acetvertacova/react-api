import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as menuApi from '../api/menu/menu';
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../validation/menu.schema";

/**
 * MenuForm component for creating or editing a menu item.
 * Uses react-hook-form for form state management and validation with Yup.
 *
 * @component
 * @returns {JSX.Element} The rendered MenuForm component.
 */
export default function MenuForm() {
  const { id } = useParams(); // ID from URL parameters (used for edit mode)
  const navigate = useNavigate(); // React Router navigation
  const [error, setError] = useState(null); // Error message for submission failure

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Form validation using Yup schema
    mode: "onChange", // Real-time validation
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes", // Handles dynamic list of sizes
  });

  /**
  * Fetches menu item data for editing and populates the form.
  */
  useEffect(() => {
    setError(null);
    if (id) {
      const fetchMenuItem = async () => {
        const data = await menuApi.getMenuItemById(id);
        reset({
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category,
          sizes: data.sizes || []
        });
      };
      fetchMenuItem();
    }
  }, [id, reset]);

  /**
   * Handles form submission: creates or updates a menu item.
   * 
   * @param {Object} data - The form data to submit.
   */
  const onSubmit = async (data) => {
    try {
      if (id) {
        await menuApi.updateMenuItem(id, data);
      } else {
        await menuApi.createMenuItem(data);
      }
      navigate('/');
    } catch (error) {
      console.error('An error loading:', error);
      setError(error.message || 'Failed to load menu. Please try again later.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Name:</label>
        <input className="form-input" type="text" {...register("name")} />
        {errors.name && <div className="form-error">{errors.name.message}</div>}
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input className="form-input" type="text" {...register("description")} />
        {errors.description && <div className="form-error">{errors.description.message}</div>}
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input className="form-input" type="text" {...register("price")} />
        {errors.price && <div className="form-error">{errors.price.message}</div>}
      </div>

      <div className="form-group">
        <label>Image:</label>
        <input className="form-input" type="text" {...register("image")} />
        {errors.image && <div className="form-error">{errors.image.message}</div>}
      </div>

      <div className="form-group">
        <label>Category:</label>
        <input className="form-input" type="text" {...register("category")} />
        {errors.category && <div className="form-error">{errors.category.message}</div>}
      </div>

      <div className="form-group">
        <label>Sizes:</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input className="form-input" {...register(`sizes.${index}`)} defaultValue={field.value} />
            {errors.sizes && errors.sizes[index] && (
              <p className="form-error">{errors.sizes[index].message}</p>
            )}
            <button className="button" type="button" onClick={() => remove(index)}>Delete</button>
          </div>
        ))}
        <button className="button" type="button" onClick={() => append("")}>Add</button>
      </div>

      <button className="button" type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}
