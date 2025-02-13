"use server";

export async function createProduct(formData: FormData) {
    try {
        const data = Object.fromEntries(formData);

        const formattedData = {
            ...data,
            price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }

        return await response.json();
    } catch (error) {
        console.error("Error al enviar datos:", error);
        return { error: "Hubo un error al enviar los datos." };
    }
}
