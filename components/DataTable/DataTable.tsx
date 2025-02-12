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
} from "@heroui/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";

export const columns = [
    { name: "NAME", uid: "name" },
    { name: "PRICE", uid: "price" },
    { name: "DESCRIPTION", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
];

export const DataTable = () => {
    interface Product {
        id: number;
        name: string;
        price: number;
        description: string;
    }

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/products") // Reemplaza con tu endpoint real
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const renderCell = (product: any, columnKey: string) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex gap-2">
                        <Tooltip content="Edit">
                            <button className="text-blue-500"><EditIcon/></button>
                        </Tooltip>
                        <Tooltip content="Delete">
                            <button className="text-red-500"><DeleteIcon/></button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    return (
        <Table aria-label="Product Table">
            <TableHeader>
                {columns.map((col) => (
                    <TableColumn key={col.uid}>{col.name}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
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
    );
};
