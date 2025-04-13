import * as yup from "yup";

const schema = yup
    .object({
        name: yup
            .string()
            .required("The name is required")
            .trim(),
        description: yup
            .string()
            .required("The description is required")
            .trim()
            .min(10, "The description should consist of at least 10 symbols")
            .max(100, "The description should consist maximum of 100 symbols"),
        price: yup
            .number()
            .transform((value, originalValue) =>
                String(originalValue).trim() === "" ? undefined : value
            )
            .required("The price is required")
            .positive("Price must be a positive number"),
        image: yup
            .string()
            .required("The image is required")
            .trim()
            .url(),
        category: yup
            .string()
            .trim()
            .required("The category is required"),
        sizes: yup
            .array()
            .of(yup.string()
                .required("Size is required")
                .matches("^([0-9]{2,4})(ml|g)$", "Size must be in the format like '250ml' or '500g'"))
            .min(1, "At least one size is required"),
    })
    .required();

export default schema;