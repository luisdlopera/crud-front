"use client";

import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Spinner,
} from "@heroui/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/actions/deleteProducts";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

export const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "PRECIO", uid: "price" },
    { name: "DESCRIPCIÓN", uid: "description" },
    { name: "ACCIÓN", uid: "actions" },
];

export const GetProductsDataTable = ({ initialProducts }: { initialProducts: Product[] }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setLoading(true);
        const result = await deleteProduct(id);
        setLoading(false);

        if (result.success) {
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } else {
            alert(result.message);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/products/edit/${id}`);
    };

    const renderCell = (product: Product, columnKey: string) => {
        const cellValue = product[columnKey as keyof Product];

        if (columnKey === "actions") {
            return (
                <div className="flex gap-2">
                    <Tooltip content="Edit">
                        <button className="text-blue-500" onClick={() => handleEdit(product.id)}>
                            <EditIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <button className="text-red-500" onClick={() => handleDelete(product.id)}>
                            <DeleteIcon />
                        </button>
                    </Tooltip>
                </div>
            );
        }
        return cellValue;
    };

    return loading ? (
        <Spinner />
    ) : (
        <Table aria-label="Product Table">
            <TableHeader>
                {columns.map((col) => (
                    <TableColumn key={col.uid}>{col.name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody emptyContent="No existen productos">
                {products.map((product) => (
                    <TableRow key={product.id}>
                        {columns.map((col) => (
                            <TableCell key={col.uid}>{renderCell(product, col.uid)}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
