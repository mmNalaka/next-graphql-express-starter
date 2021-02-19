import React from 'react'
import Link from 'next/link'

export const Sidebar = () => {
  return (
    <aside className="flex flex-col w-56 bg-indigo-900 h-screen">
      <h3 className="text-green-300 font-bold font-mono text-2xl">EMPRESS</h3>
      <ul className="flex flex-col w-full p-4">
        <li>
          <Link href="/">
            <a className="block px-4 my-4 py-2 rounded-lg text-white font-medium bg-indigo-700">
              Dashboard
            </a>
          </Link>
        </li>
        <li>
          <Link href="/home">
            <a className="block px-4 py-2 my-4 rounded-lg text-white font-medium ">
              Redirections
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  )
}
