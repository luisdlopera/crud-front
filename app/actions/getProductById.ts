"use server";

export const getProductById = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        return await response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};
