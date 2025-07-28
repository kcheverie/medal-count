import React from "react";

export default function Table({head, body}) {

  return (
    <table>
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </table>
  );
}
