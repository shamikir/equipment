import React from 'react';
import { renderHook } from "@testing-library/react";
import { App } from "../src/App";
import { Home } from "../src/pages/Home";
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import { expect } from '@jest/globals';
import { Logo } from '../src/components/components'
import axios from 'axios'

test("Should render App", async () => {
  const  { result } = renderHook(() => App());
  expect(result.current.props["aria-label"]).toBe("container")
});

test('Should render square logo', () => {
  const tree = renderer.create(<Logo />).toJSON()
  expect(tree).toHaveStyleRule('width', '300px')
  expect(tree).toHaveStyleRule('height', '300px')
})

test("Should fetch data", async () => {
  // Random API as example
  const response = await axios.get(`https://httpbin.org/get`, {
    responseType: "json",
  })
  expect(response.status).toBe(200);
});

test('Should contain 5 table columns', () => {
  const tree = renderer.create((
    <BrowserRouter>
      <Home />
    </BrowserRouter>
    )).toJSON()
    console.log('tree', tree.children[1].children.length)
  expect(tree.children[1].children.length).toBe(5)
})
