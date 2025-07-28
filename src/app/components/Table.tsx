import React from "react";
import styles from "../page.module.css"
import { useState } from 'react';

type Props = {
  children: React.ReactNode
}

const TableHead = ({ children }) => {
  return (
    <thead>
      <tr>
        {React.Children.map(children, (child) => {
          return <td>{child}</td>
        })}
      </tr>
    </thead>
  )
};

const TableBody = ({ children }) => {
  return (
    <tbody>
      {React.Children.map(children, (child, index) => {
        return (
          <tr key={index}>
            {child.props.children.map((child: any, i) => {
              return <td key={i}>{child}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

const  Table = ({children}: Props) => {


  const childArray = React.Children.toArray(children);

  const tableHead = childArray.find(
    (child: any) => child.type === TableHead
  );

  const tableBody = childArray.find(
    (child: any) => child.type === TableBody
  );
    return (
      <table className={styles.page}>
        {tableHead}
        {tableBody}
      </table>
    );
}



module.exports = {
  Table: Table,
  TableHead: TableHead,
  TableBody: TableBody,

}