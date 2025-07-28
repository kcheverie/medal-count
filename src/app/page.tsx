'use client'

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname} from 'next/navigation'
import MedalCount from './components/MedalCount'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )
  const [sortType, setSortType] = useState('total')
  
  const handleSortType = function (type) {
    router.push(pathname + '?' + createQueryString('sort', type))
    setSortType(type)
  }

  return <MedalCount sortType={sortType} handleSortType={handleSortType}/>
}
