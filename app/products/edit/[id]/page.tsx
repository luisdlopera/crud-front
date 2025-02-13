
import { Button, Link } from "@heroui/react";
import { getProductById } from "@/app/actions/getProductById";
import { EditProductForm } from "@/components/EditProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    if (!product) return <p>Producto no encontrado</p>;

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

                <EditProductForm initialProduct={product} />
            </main>
        </div>
    )
}
