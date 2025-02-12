
import { FormProduct } from '@/components/FormProduct'
import React from 'react'
import { Button, Link } from "@heroui/react";

export default function CreateProductPage() {
    return (
        <div>
            <main className='w-4/5 mx-auto h-screen gap-10 flex flex-col pt-20'>
                <Button
                    as={Link}
                    color="primary"
                    href="/products"
                    variant="solid"
                    className='w-1/6'
                >
                    Regresar
                </Button>
                <h1 className='text-lg text-white mx-auto w-full text-center'>
                    Crear un producto
                </h1>

                <FormProduct />
            </main>
        </div>
    )
}
