"use client";

import { useState } from "react";
import { Form, Input, Button, Textarea } from "@heroui/react";
import { createProduct } from "@/app/actions/createProducts";

export const CreateProductForm = () => {
    const [submitted, setSubmitted] = useState<any | null>(null);

    const onSubmit = async (formData: FormData) => {

        const result = await createProduct(formData);
        setSubmitted(result);

        console.log("Submitted data:", result);
    }


    return (
        <Form
            className="w-full justify-center items-center space-y-4"
            action={onSubmit}
            validationBehavior="native"
        >
            <div className="flex flex-col gap-4">
                <Input
                    name="name"
                    label="Nombre"
                    isRequired
                    placeholder="Ingrese nombre de producto"
                    validate={(value) => {
                        if (!value) {
                            return "El nombre es requerido.";
                        } else if (value.length < 3) {
                            return "El nombre debe tener al menos 3 caracteres.";
                        }
                        return null;
                    }}
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
                    validate={(value) => {
                        if (!value) {
                            return "El precio es requerido.";
                        } else if (isNaN(Number(value))) {
                            return "El precio debe ser un número.";
                        } else if (Number(value) <= 0) {
                            return "El precio debe ser mayor que 0.";
                        }
                        return null;
                    }}
                />
                <Textarea
                    name="description"
                    className="max-w-xs"
                    label="Descripción"
                    placeholder="Ingrese descripción del producto"
                    isRequired
                    validate={(value) => {
                        if (!value) {
                            return "La descripción es requerida.";
                        } else if (value.length < 10) {
                            return "La descripción debe tener al menos 10 caracteres.";
                        }
                        return null;
                    }}
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

        </Form>
    );
};
