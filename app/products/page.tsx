import { DataTable } from '@/components/DataTable'
import { Button, Link } from "@heroui/react";
import { ChevronLeft, PlusIcon } from 'lucide-react';

export default function ProductPage() {
    return (
        <main className='w-10/12 mx-auto h-full gap-10 flex flex-col pt-20 pb-[1000px]'>
            <div className='w-full flex gap-4 justify-between'>
                <Button
                    as={Link}
                    href="/"
                    variant="solid"
                    className='w-1/6'
                    startContent={<ChevronLeft />}
                >
                    Regresar
                </Button>
                <Button
                    as={Link}
                    color="primary"
                    href="/products/create"
                    variant="solid"
                    className='w-1/6'
                    endContent={<PlusIcon />}
                >
                    Crear Producto
                </Button>
            </div>
            <h1 className='text-2xl font-semibold text-white mx-auto w-full text-center'>
                Productos
            </h1>
            <DataTable />
        </main>
    )
}
