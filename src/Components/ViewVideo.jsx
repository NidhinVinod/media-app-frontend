import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import { MdDelete } from "react-icons/md";
import VideoCard from './VideoCard';
import { getAllVideoApi } from '../Services/allApis';




function ViewVideo(uploadVideoResponse) {
  //tohold all videos in an array
const [videos,setVideos]=useState([])

  const getVideo=async()=>{
    const response=await getAllVideoApi()//array of data
    console.log(response.data)
    setVideos(response.data)
  }
  console.log(videos);//array of videos
  
  useEffect(()=>{getVideo()},[uploadVideoResponse])

  return (
    <>
     <Container> 
     

    <Row>
      {
        videos.length!=0?videos.map(item=>(<Col>
          <VideoCard videoDetails={item}/>
         
          </Col>)):"not found"
      }
        
   
      </Row>
    </Container>
      
    </>
  )
}

export default ViewVideo