import { Table, TableHead, TableBody } from "./Table"
import Button from './Button'
import { useState, useEffect} from 'react';
import getFlagPosition from '../../../helpers/getFlagPosition';
import bg from "../../../public/flags.png"

interface Medal {
  gold: number,
  silver: number,
  bronze: number,
  total?: any
  code: string 
}

interface Props {
  sortType: string;
  handleSortType: (type: string) => void;
}

let medalsData = [{
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
const MedalCount = ({sortType, handleSortType} : Props) => {
 

  const [medals, setMedals] = useState<Medal[]>([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../../medalData.json');
        if (!response.ok) {
          const sortedWithTotals = medalsData.map(medal => ({
            ...medal,
            total: medal.gold + medal.silver + medal.bronze
          })).sort((a, b) => b.total = a.total)
          setMedals(sortedWithTotals)
          throw new Error (`ERROR ${response.status}`)
          
        }
        const jsonData = await response.json();
      
       
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    };
    fetchData()
  }, [])

  const handleClick = (type: string) => {
    let sortedMedals = medals.sort((a, b) => sortMedals(a, b, type))
    setMedals(sortedMedals)
    handleSortType(type)
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
                    backgroundPosition: `28px ${getFlagPosition(medal.code)}px`,
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

export default MedalCount;