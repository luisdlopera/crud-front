"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    CircularProgress,
    Spinner,
} from "@heroui/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { useRouter } from "next/navigation";

export const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "PRECIO", uid: "price" },
    { name: "DESCRIPCIÓN", uid: "description" },
    { name: "ACCIÓN", uid: "actions" },
];

export const DataTable = () => {

    interface Product {
        id: string;
        name: string;
        price: number;
        description: string;
    }

    const [loading, setLoading] = useState(true); 
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false); 
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false); 
            });
    }, []);

    
    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete product");

            // Filtrar productos después de eliminar uno
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/products/edit/${id}`);
    };

    const renderCell = (product: Product, columnKey: string) => {
        const cellValue = product[columnKey as keyof Product];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex gap-2">
                        <Tooltip content="Edit">
                            <button
                                className="text-blue-500"
                                onClick={() => handleEdit(product.id)}
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                        <Tooltip content="Delete">
                            <button
                                className="text-red-500"
                                onClick={() => handleDelete(product.id)}
                            >
                                <DeleteIcon />
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <>
        {loading ? (
            <Spinner />
        ) : (
            <Table aria-label="Product Table">
                <TableHeader>
                    {columns.map((col) => (
                        <TableColumn key={col.uid}>{col.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={"No exiten productos"}>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            {columns.map((col) => (
                                <TableCell key={col.uid}>
                                    {renderCell(product, col.uid)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )}
    </>
    );
};
