import React from 'react';
import { Component } from 'react';

export default function Navbar(props) {
  // console.log(props);

  return (
    <navbar>
      {props.children}
    </navbar>
  );
}
