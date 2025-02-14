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
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/actions/deleteProducts";
import { AlertTriangle } from "lucide-react";

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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const router = useRouter();

    const handleDelete = async () => {
        if (!selectedProduct) return;
        setLoading(true);
        const result = await deleteProduct(selectedProduct.id);
        setLoading(false);

        if (result.success) {
            setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id));
        } else {
            alert(result.message);
        }
        onOpenChange();
    };

    const handleEdit = (id: string) => {
        router.push(`/products/edit/${id}`);
    };

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        onOpen();
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
                        <button className="text-red-500" onClick={() => openDeleteModal(product)}>
                            <DeleteIcon />
                        </button>
                    </Tooltip>
                </div>
            );
        }
        return cellValue;
    };

    return (
        <>
            {loading && <Spinner />}
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

            {/* Modal para confirmación de eliminación */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="flex justify-center mb-6">
                                    <AlertTriangle className="w-24 h-24 text-destructive" />
                                </div>
                                <h1 className="text-4xl font-bold mb-4 text-foreground">
                                    Confirmar eliminación
                                </h1>
                                <p className="text-muted-foreground mb-6">
                                    ¿Estás seguro de que quieres eliminar este producto?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="danger" onPress={handleDelete}>
                                    Borrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
