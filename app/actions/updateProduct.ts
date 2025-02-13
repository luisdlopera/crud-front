"use server";

export const updateProduct = async (id: string, product: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) throw new Error("Failed to update product");

        return { success: true, message: "Producto actualizado correctamente" };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, message: "Error updating product" };
    }
};
