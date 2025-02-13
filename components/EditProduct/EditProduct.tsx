'use client'

import React from "react";
import { Form, Input, Button, Textarea } from "@heroui/react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}


export const EditProduct = () => {

    const [submitted, setSubmitted] = React.useState<any | null>(null);
    const [errors, setErrors] = React.useState({});

    
    const { id } = useParams(); // Obtener el ID desde la URL
    console.log('el id es', id);
    const router = useRouter();
    const [product, setProduct] = useState<Product>({
        id: "",
        name: "",
        price: 0,
        description: "",
    });

    useEffect(() => {
        // Obtener los datos del producto
        fetch(`http://localhost:3001/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching product:", error));

        // console.log('el data es', data);
    }, []);

    const handleValueChange = (field: keyof Product, value: string | number) => {
        setProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const onSubmit = async (e:any) => {
        e.preventDefault();
        try {

            // const data = Object.fromEntries(new FormData(e.currentTarget));

            const formattedData = {
                ...product,
                price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            };

            console.log('la data a actualizar es', formattedData);

            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });
 
            if (!response.ok) throw new Error("Failed to update product");

            alert("Product updated successfully!");
            router.push("/products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    
    return (
        <Form
            className="w-full justify-center items-center space-y-4"
            validationBehavior="native"
            validationErrors={errors}
            onSubmit={onSubmit}
        >
            <div className="flex flex-col gap-4 ">
                <Input
                    name="name"
                    label="Nombre"
                    isRequired
                    placeholder="Ingrese nombre de producto"
                    value={product.name}
                     onValueChange={(value) => handleValueChange('name', value)}
                />
                <Input
                    name="price"
                    label="Price"
                    placeholder="0.00"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                    type="number"
                    isRequired
                    value={product.price.toString()}
                     onValueChange={(value) => handleValueChange('price', Number(value))}
                />
                <Textarea
                    name='description'
                    className="max-w-xs"
                    label="Description"
                    placeholder="Enter your description"
                    isRequired
                    value={product.description}
                     onValueChange={(value) => handleValueChange('description', value)}
                />

                <div className="flex gap-4">
                    <Button className="w-full" color="primary" type="submit">
                        Actualizar
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
}
