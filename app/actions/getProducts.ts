'use server';

// export async function getProducts() {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: "no-store" });
//         if (!response.ok) throw new Error("Error fetching products");
//         return await response.json();
//     } catch (error) {
//         console.error("Failed to fetch products:", error);
//         return [];
//     }
// }

export const getProducts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        return await response.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};
