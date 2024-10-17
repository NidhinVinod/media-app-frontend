import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { TbPhotoVideo } from "react-icons/tb";
import {   deletAVideoApi } from '../Services/allApis';
import { addWatchHistoryApi} from '../Services/allApis';

function VideoCard({ videoDetails }) {

  const handleDelete = async(id) => {
    const result = await deletAVideoApi(id)
    window.location.reload()
  }

  console.log(videoDetails);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {setShow(true);
    const {caption, url} = videoDetails
    let today = new Date()
    let timestamp= new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: '2-digit' }).format(today)
    console.log(timestamp);

    let details = {
      caption,
      url,
      timestamp
    }

    
    const response= await addWatchHistoryApi(details)
    console.log(response)

  }
  const dragStarted = (e, videoId) => {
    console.log("video dragStarted...id:", videoId);
    console.log(e);
    e.dataTransfer.setData("videoId" , videoId);
  }
    

  return (
    <>
      <Card className='p-3' draggable={true} onDragStart={(e)=>dragStarted(e,videoDetails.id)} >
        <img 
          width={225} 
          height={200} 
          src={videoDetails.img} 
          alt="" 
          onClick={handleShow} 
        />
        <Card.Body>
         
          <Card.Title>
         <h5>{videoDetails.caption}</h5>
            <Button style={{ float: 'right' }} variant="danger">
              <MdDelete onClick={() => handleDelete(videoDetails.id)}  />
            </Button> 
          </Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <TbPhotoVideo className='fs-2' /> Upload Videos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe 
            className='pt-5' 
            width="460" 
            height="315" 
            src={videoDetails.url} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </Modal.Body>
        <div style={{ paddingLeft: '300px' }} className='d-flex pb-3 mx-2'>
          <Button className='mx-2' onClick={handleClose} variant="secondary">Cancel</Button>
          <Button onClick={handleClose} variant="warning">Upload</Button>
        </div>
      </Modal>
    </>
  );
}

export default VideoCard;
