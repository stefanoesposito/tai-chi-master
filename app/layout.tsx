import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Maestro del Soffio Celeste',
    description: 'Puoi farmi domande su Taijiquan, Qigong, Taoismo e meditazione',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="it">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
