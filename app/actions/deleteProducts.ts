export const deleteProduct = async (id: string) => {
    "use server";
    try {
        const response = await fetch(`http://localhost:3001/products/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product");

        return { success: true, message: "Product deleted successfully!" };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, message: "Error deleting product" };
    }
};