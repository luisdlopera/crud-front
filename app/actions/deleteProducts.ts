"use server";

export const deleteProduct = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product");

        return { success: true, message: "Product deleted successfully!" };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, message: "Error deleting product" };
    }
};