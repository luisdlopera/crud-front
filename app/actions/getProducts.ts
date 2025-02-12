'use server';

export async function getProducts() {
    try {
        const response = await fetch("http://localhost:3001/products", { cache: "no-store" });
        if (!response.ok) throw new Error("Error fetching products");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}
