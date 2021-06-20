import React,{useContext} from 'react'
import Table from './ReactDataTable'
import {
    GlobalContext,
  } from "./../../../../GlobalStore/GlobalProvider";



export default function Index() {
    const state = useContext(GlobalContext);
    const data = state["commitment-forms"];
    // console.log(data)
    return (
        <div>
        <Table forms={data}/>
        </div>
    )
}
