'use client'

import React from "react";
import { Form, Input, Button, Textarea } from "@heroui/react";

export const FormProduct = () => {

    const [submitted, setSubmitted] = React.useState<any | null>(null);
    const [errors, setErrors] = React.useState({});

    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const data = Object.fromEntries(new FormData(e.currentTarget));

            const formattedData = {
                ...data,
                price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
            };

            setSubmitted(formattedData);

            console.log('ladata a evniar es', formattedData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            setSubmitted(result);
            setErrors({});
        } catch (error) {
            console.log('There was an error!', error);
            // setErrors({ submit: error.message });
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
                />
                <Textarea
                    name='description'
                    className="max-w-xs"
                    label="Description"
                    placeholder="Enter your description"
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
        </Form>
    );
}
