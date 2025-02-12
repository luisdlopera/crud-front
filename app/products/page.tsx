import { DataTable } from '@/components/DataTable'
import { Button, Link } from "@heroui/react";

export default function ProductPage() {
    return (
        <div>
            <main className='w-10/12 mx-auto h-full gap-10 flex flex-col pt-20 pb-[1000px]'>
                <Button
                    as={Link}
                    color="primary"
                    href="/products/create"
                    variant="solid"
                    className='w-1/6'
                >
                    Crear Producto
                </Button>
                <h1 className='text-lg text-white mx-auto w-full text-center'>
                    Product Page
                </h1>
                <DataTable />
            </main>
        </div>
    )
}
