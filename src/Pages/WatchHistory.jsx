import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { deleteWatchHistoryApi, getWatchHistory } from '../Services/allApis';
import { MdDelete } from "react-icons/md";


function WatchHistory() {
const [history, setHistory] = useState()
  const getHistory = async()=>{
    const result = await getWatchHistory()
    console.log(result);
    setHistory(result.data)
  }
  console.log(history);
  const handleDelete=async(id)=>{
    result= await deleteWatchHistoryApi(id)
    window.location.reload()
  }
  
  useEffect(()=>{getHistory();},[])
  return (
    <>
    <Container>
      <Row>
        <Col>
        <h5 className='pt-1'>Watch History</h5>
        </Col>
      
        <Col>
        <Link to={`/`} ><h5 style={{float:`right`}}>   Back Home</h5></Link>
        </Col>
      </Row>
    </Container>


    <Container className='pt-5'>



    <Table  striped="columns">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Caption</th>
          <th>Url</th>
          <th>Timestamp</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          history ? history.map((item,index)=>(
          
          <tr>
            <td>{index+1}</td>
            <td>{item.caption}</td>
            <td>{item.url}</td>
            <td>{item.timestamp}</td>
            <td><MdDelete onClick={()=>handleDelete(item.id)} /></td>
          </tr>)):'no data'
        }
        
      </tbody>
    </Table>
    </Container>
     

    </>
  )
}

export default WatchHistory