'use client'
import Image from 'next/image';
import { Table, TableHead, TableBody } from "./components/Table"
import Button from './components/Button'
import { useState, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname} from 'next/navigation'
import bg from '../../public/flags.png'

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
  total: any
  code: string 
}
  
function sortMedals(a: object, b:object, sortType: string) {
  let tie = (b as Medal).total === (a as Medal).total
  switch(sortType) {
    case "total":
      if (tie) {
        return (b as Medal).gold - (a as Medal).gold;
      } else {
        return (b as Medal).total - (a as Medal).total;
      }
      break;
    case "gold":
      if (tie) {
        return (b as Medal).silver - (a as Medal).silver
      } else {
        return (b as Medal).gold - (a as Medal).gold;   
      }
      break;
    case "silver":
      if (tie) { 
        return (b as Medal).gold = (a as Medal).gold;
      } else {
        return (b as Medal).silver - (a as Medal).silver;  
      }
      break;
    case "bronze":
      if (tie) {
        return (b as Medal).gold - (a as Medal).gold;
      } else {
        return (b as Medal).bronze- (a as Medal).bronze; 
      }
      break;
  }
}

const getPosition = (code: string) => {
  switch(code) {
    case "AUT":
        return 0;
    case "BLR":
      return -16;
    
    case "CAN":
      return -34;
    
    case "CHN":
      return -51;
    
    case "FRA":
      return -68;
    
    case "GER":
      return -85;
    
    case "ITA":
      return -102;
    
    case "NED":
      return -119;
    
    case "NOR":
      return -136;
    
    case "RUS":
      return -153;
    
    case "SUI":
      return -170;
    
    case "SWE":
      return -187;
    
    case "USA":
      return -204;
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
  
  const handleClick = (type: string) => {
    setMedals([...medals.sort((a, b) => sortMedals(a, b, type))])
    router.push(pathname + '?' + createQueryString('sort', type))
    setSortType(type)
  }

  return (

    <Table>
      <TableHead>
          <></>
          <></>
          <></>
          <Button handleClick={handleClick} sortType={sortType} type="gold"/>
          <Button handleClick={handleClick} sortType={sortType} type="silver"/>          
          <Button handleClick={handleClick} sortType={sortType} type="bronze"/>          
          <Button handleClick={handleClick} sortType={sortType} type="total"/>
      </TableHead>
      <TableBody>
        {medals.map((medal, index) => {
            return (
              <>
                <div>{index + 1}</div>
                <div>
                  <div style={{
                    backgroundPosition: `28px ${getPosition(medal.code)}px`,
                    backgroundImage: `url(${bg.src})`,
                    width: '28px',
                    height: '17px',
                  }}/>
                </div>
                <div>{medal.code}</div>
                <div>{medal.gold}</div>
                <div>{medal.silver}</div>
                <div>{medal.bronze}</div>
                <div><strong>{(medal as Medal).total}</strong></div>
              </>
            )
          })}
      </TableBody>
    </Table>
  );
}
