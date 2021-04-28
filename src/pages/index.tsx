import { Header } from 'src/components/layouts/Header'
import { Sidebar } from 'src/components/layouts/Sidebar'

export default function Home() {
  return (
    <div className="flex w-full h-full bg-white">
      <Sidebar />
      <main className="w-full">
        <Header />
        <h1>Welcome!</h1>
      </main>
    </div>
  )
}
