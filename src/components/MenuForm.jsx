import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as menuApi from '../api/menu/menu';
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../validation/menu.schema";

export default function MenuForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  useEffect(() => {
    setError(false);

    if (id) {
      const fetchMenuItem = async () => {
        const data = await menuApi.getMenuItemById(id);
        reset({
          name: data[0].name,
          description: data[0].description,
          price: data[0].price,
          image: data[0].image,
          category: data[0].category,
          sizes: data[0].sizes || []
        });
      };
      fetchMenuItem();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" {...register("name")} />
        {errors.name && <div>{errors.name.message}</div>}
      </div>

      <div>
        <label>Description:</label>
        <input type="text" {...register("description")} />
        {errors.description && <div>{errors.description.message}</div>}
      </div>

      <div>
        <label>Price:</label>
        <input type="text" {...register("price")} />
        {errors.price && <div>{errors.price.message}</div>}
      </div>

      <div>
        <label>Image:</label>
        <input type="text" {...register("image")} />
        {errors.image && <div>{errors.image.message}</div>}
      </div>

      <div>
        <label>Category:</label>
        <input type="text" {...register("category")} />
        {errors.category && <div>{errors.category.message}</div>}
      </div>

      <label>Sizes:</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`sizes.${index}`)} defaultValue={field.value} />
          {errors.sizes && errors.sizes[index] && (
            <p>{errors.sizes[index].message}</p>
          )}
          <button type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append("")}>
        Add
      </button>

      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
}
