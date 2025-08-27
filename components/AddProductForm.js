"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image must be a valid URL"),
});

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
  });

  const onSubmit = (values) => {
    console.log("submit:", values);
    reset();
    alert("Product submitted !");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 max-w-2xl bg-white p-4 sm:p-5 rounded-2xl border border-gray-200"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            placeholder="e.g., Stylish T-Shirt"
            className="mt-1 border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>
          <input
            id="price"
            {...register("price")}
            placeholder="e.g., 49.99"
            className="mt-1 border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Tell customers about the product..."
          className="mt-1 border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            {...register("category")}
            placeholder="e.g., men's clothing"
            className="mt-1 border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50"
          />
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="image" className="text-sm font-medium">
            Image URL
          </label>
          <input
            id="image"
            {...register("image")}
            placeholder="https://..."
            className="mt-1 border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black/50"
          />
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="pt-1">
        <button
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
