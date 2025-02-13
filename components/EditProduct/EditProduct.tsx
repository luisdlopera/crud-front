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

export const EditProduct = ({ initialProduct }: { initialProduct: Product }) => {
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
        <Form className="w-full space-y-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <Input
                    name="name"
                    label="Nombre"
                    isRequired
                    placeholder="Ingrese nombre de producto"
                    value={product.name}
                    onValueChange={(value) => handleValueChange("name", value)}
                />
                <Input
                    name="price"
                    label="Price"
                    placeholder="0.00"
                    type="number"
                    isRequired
                    value={product.price.toString()}
                    onValueChange={(value) => handleValueChange("price", Number(value))}
                />
                <Textarea
                    name="description"
                    label="Descripción"
                    placeholder="Ingrese la descripción"
                    isRequired
                    value={product.description}
                    onValueChange={(value) => handleValueChange("description", value)}
                />
                <Button className="w-full" color="primary" type="submit">
                    Actualizar
                </Button>
            </div>
        </Form>
    );
};
