'use client'

import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@heroui/react'

export default function ErrorPage({ error }: { error: Error }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-6">
                    <AlertTriangle className="w-24 h-24 text-destructive" />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-foreground">
                    Ha sucedido un error
                </h1>
                <p className="text-muted-foreground mb-6">
                    Verifica que la información ingresada sea correcta y vuelve a intentarlo.
                </p>
                <div className="flex justify-center gap-4">
                    <Button>
                        <Link href="/">Volver al Inicio</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}