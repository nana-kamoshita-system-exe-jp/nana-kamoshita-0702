import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jewelry EC</title>
        <meta name="description" content="Jewelry EC powered by Next.js + TypeScript + Tailwind CSS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Jewelry EC
        </h1>
        <p className="text-lg text-gray-700">
          Next.js + TypeScript + Tailwind CSS スターター
        </p>
      </main>
    </>
  )
}