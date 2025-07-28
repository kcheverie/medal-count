'use client'

import styles from "./page.module.css";
import Table from "./components/Table"
import { useState } from 'react';
import { useSearchParams} from 'next/navigation'

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

function sortMedals(a: object, b:object) {
  return b.total-a.total
}

export default function Home() {
  const [medals, setMedals] = useState(medalss.map((medal) => {
      (medal as medalType).total = medal.gold + medal.silver + medal.bronze;
      return medal;
  }).sort(sortMedals))
  
  return (
    <table>
      <thead>
        <td></td>
        <td>gold</td>
        <td>bronze</td>
        <td>silver</td>
        <td>total</td>
      </thead>
      <tbody>
          {medals.map((medal, index) => {
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
