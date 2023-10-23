import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Footer from '@/app/components/Footer'


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Il tuo Senior Dev',
    description: 'Fai domande tecniche… ti aiuterà',
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
        <Footer />
        </body>
        </html>
    )
}
