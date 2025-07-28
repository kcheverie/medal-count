'use client'

import styles from "./page.module.css";
import Table from "./components/Table"
import { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname} from 'next/navigation'

let medalss = [{
  "code": "USA",
  "gold": 9,
  "silver": 7,
  "bronze": 12
},
{
  "code": "NOR",
  "gold": 11,
  "silver": 5,
  "bronze": 10
},
{
  "code": "RUS",
  "gold": 13,
  "silver": 11,
  "bronze": 9
},
{
  "code": "NED",
  "gold": 8,
  "silver": 7,
  "bronze": 9
},
{
  "code": "FRA",
  "gold": 4,
  "silver": 4,
  "bronze": 7
},
{
  "code": "SWE",
  "gold": 2,
  "silver": 7,
  "bronze": 6
},
{
  "code": "ITA",
  "gold": 0,
  "silver": 2,
  "bronze": 6
},
{
  "code": "CAN",
  "gold": 10,
  "silver": 10,
  "bronze": 5
},
{
  "code": "SUI",
  "gold": 6,
  "silver": 3,
  "bronze": 2
},
{
  "code": "BLR",
  "gold": 5,
  "silver": 0,
  "bronze": 1
},
{
  "code": "GER",
  "gold": 8,
  "silver": 6,
  "bronze": 5
},
{
  "code": "AUT",
  "gold": 4,
  "silver": 8,
  "bronze": 5
},
{
  "code": "CHN",
  "gold": 3,
  "silver": 4,
  "bronze": 2
}
]


interface Medal {
  gold: number,
  silver: number,
  bronze: number,
  total?: number
  code: string 
}
  
function sortMedals(a: object, b:object, sortType: string) {
  console.log(sortType)
  let tie = b.total === a.total
  switch(sortType) {
    case "total":
      if (tie) {
        return b.gold - a.gold;
      } else {
        return b.total-a.total;
      }
      break;
    case "gold":
      if (tie) {
        return b.silver - a.silver
      } else {
        return b.gold-a.gold;   
      }
      break;
    case "silver":
      if (tie) { 
        return b.gold = a.gold;
      } else {
        return b.silver-a.silver;  
      }
      break;
    case "bronze":
      if (tie) {
        return b.gold - a.gold;
      } else {
        return b.bronze-a.bronze; 
      }
      break;
  }
}


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

  const [medals, setMedals] = useState(medalss.map((medal) => {
    (medal as medalType).total = medal.gold + medal.silver + medal.bronze;
      return medal;
  }).sort((a, b) => b.total-a.total))
  
  const handleClick = (event: any) => {
    event.preventDefault();
    setSortType(event.target.id)
    setMedals([...medals.sort((a, b) => sortMedals(a, b, event.target.id))])
    router.push(pathname + '?' + createQueryString('sort', event.target.id))
  }

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>
            <button id="gold" onClick={handleClick}>gold</button>
          </td>
          <td>
            <button id="silver" onClick={handleClick}>silver</button>

          </td>
          <td>
            <button id="bronze" onClick={handleClick}>bronze</button>
          </td>
          <td>
            <button id="total" onClick={handleClick}>total</button>
          </td>
        </tr>
      </thead>
      <tbody>
          {medals.map((medal, index) => {
            console.log('rerender')
            return (
              <tr key={medal.code}>
                <td>{index + 1} {medal.code}</td>
                <td>{medal.gold}</td>
                <td>{medal.silver}</td>
                <td>{medal.bronze}</td>
                <td><strong>{medal.total}</strong></td>
              </tr>
            )
          })}
          </tbody>
    </table>
  );
}
