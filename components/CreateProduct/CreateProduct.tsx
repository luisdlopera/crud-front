"use client";

import { useState } from "react";
import { Form, Input, Button, Textarea } from "@heroui/react";
import { createProduct } from "@/app/actions/createProducts";

export const CreateProduct = () => {
    const [submitted, setSubmitted] = useState<any | null>(null);
    const [errors, setErrors] = useState<{ form?: string }>({});

    const onSubmit = async (formData: FormData) => {
        const result = await createProduct(formData);

        if (result.error) {
            setErrors({ form: result.error });
        } else {
            setSubmitted(result);
            setErrors({});
        }
    };

    return (
        <Form
            className="w-full justify-center items-center space-y-4"
            action={onSubmit}
        >
            <div className="flex flex-col gap-4">
                <Input
                    name="name"
                    label="Nombre"
                    isRequired
                    placeholder="Ingrese nombre de producto"
                />
                <Input
                    name="price"
                    label="Precio"
                    placeholder="0.00"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                    type="number"
                    isRequired
                />
                <Textarea
                    name="description"
                    className="max-w-xs"
                    label="Descripción"
                    placeholder="Ingrese descripción del producto"
                    isRequired
                />

                <div className="flex gap-4">
                    <Button className="w-full" color="primary" type="submit">
                        Guardar
                    </Button>
                </div>
            </div>

            {submitted && (
                <div className="text-small text-default-500 mt-4">
                    Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
            )}

            {errors.form && (
                <div className="text-red-500 mt-2">{errors.form}</div>
            )}
        </Form>
    );
};
