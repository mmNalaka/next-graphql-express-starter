import { Header } from 'src/components/layouts/Header'

export default function Home() {
  return (
    <div className="flex w-full h-full bg-white">
      <main className="w-full">
        <Header />
        <h1>Welcome!</h1>
      </main>
    </div>
  )
}
