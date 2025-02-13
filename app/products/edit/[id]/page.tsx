import { EditProduct } from '@/components/EditProduct';
import { Button, Link } from "@heroui/react";


export default function EditProductPage() {


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
                    Editar un producto
                </h1>

                <EditProduct />
            </main>
        </div>
    )
}
