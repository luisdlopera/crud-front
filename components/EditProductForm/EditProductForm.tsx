"use client";

import React, { useState } from "react";
import { Form, Input, Button, Textarea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/actions/updateProduct";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

export const EditProductForm = ({ initialProduct }: { initialProduct: Product }) => {
    const router = useRouter();
    const [product, setProduct] = useState<Product>(initialProduct);

    const handleValueChange = (field: keyof Product, value: string | number) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const formattedData = {
            ...product,
            price: typeof product.price === "string" ? parseFloat(product.price) : product.price,
        };

        const result = await updateProduct(product.id, formattedData);

        if (result.success) {
            alert(result.message);
            router.push("/products");
        } else {
            console.error(result.message);
        }
    };

    return (
        <Form 
            className="w-full justify-center items-center space-y-4"
            onSubmit={onSubmit}
            validationBehavior="native"
        >
            <div className="flex flex-col gap-4">
                <Input
                    name="name"
                    label="Nombre"
                    isRequired
                    placeholder="Ingrese nombre de producto"
                    value={product.name}
                    onValueChange={(value) => handleValueChange("name", value)}
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
                    label="Price"
                    placeholder="0.00"
                    type="number"
                    isRequired
                    value={product.price.toString()}
                    onValueChange={(value) => handleValueChange("price", Number(value))}
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
                    label="Descripción"
                    placeholder="Ingrese la descripción"
                    isRequired
                    value={product.description}
                    onValueChange={(value) => handleValueChange("description", value)}
                    validate={(value) => {
                        if (!value) {
                            return "La descripción es requerida.";
                        } else if (value.length < 10) {
                            return "La descripción debe tener al menos 10 caracteres.";
                        }
                        return null;
                    }}
                />
                <Button className="w-full" color="primary" type="submit">
                    Actualizar
                </Button>
            </div>
        </Form>
    );
};
