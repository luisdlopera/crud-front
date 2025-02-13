
import { CreateProduct } from '@/components/CreateProduct'
import { Button, Link } from "@heroui/react";
import { ChevronLeft } from 'lucide-react';

export default function CreateProductPage() {
    return (
        <div>
            <main className='w-4/5 mx-auto h-screen gap-10 flex flex-col pt-20'>
                <Button
                    as={Link}
                    href="/products"
                    variant="solid"
                    className='w-1/6'
                    startContent={<ChevronLeft />}
                >
                    Regresar
                </Button>
                <h1 className='text-2xl font-semibold text-white mx-auto w-full text-center'>
                    Crear un producto
                </h1>

                <CreateProduct />

            </main>
        </div>
    )
}
