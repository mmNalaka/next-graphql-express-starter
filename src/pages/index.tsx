import Link from 'next/link'
import { Sidebar } from 'src/components/layouts/Sidebar'

export default function Home() {
  return (
    <div className="flex w-full h-full bg-white">
      <Sidebar />
      <main className="">
        <h1>Welcome!</h1>
      </main>
    </div>
  )
}
