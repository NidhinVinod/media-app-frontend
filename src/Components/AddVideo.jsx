import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCloudUploadAlt } from "react-icons/fa";
import { TbPhotoVideo } from "react-icons/tb";
import { Container } from 'react-bootstrap';
import { addVideoApi } from '../Services/allApis';
import Swal from 'sweetalert2';


function AddVideo({ setUploadVideoResponse  }) {
  const [addVideoDetails, setAddVideoDetails] = useState({
    caption: "",
    img: '',
    url: ""
  });

  console.log(addVideoDetails);

  const getEmbbedLink = (e) => {
    const { value } = e.target;
    const yCode = value.slice(-31); // Adjusted to get the correct video code
    const yLink = `https://www.youtube.com/embed/${yCode}`;
    setAddVideoDetails({ ...addVideoDetails, url: yLink });
  };

  const addHandleShow = async () => {
    const { caption, url, img } = addVideoDetails;
    if (!caption || !url || !img) {
      alert("Please fill in all the details.");
    } else {
      const response = await addVideoApi(addVideoDetails);
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          title: 'Success!',
          text: 'Video added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
       
        setAddVideoDetails({
          caption: "",
          img: '',
          url: ""
        });
        handleClose()
        setUploadVideoResponse(response.data);
    
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
        setAddVideoDetails({
          caption: "",
          img: '',
          url: ""
        });
        handleClose();
      }
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='mb-5' variant="none" onClick={handleShow}>
        <FaCloudUploadAlt className='fs-2 pb-4' />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><TbPhotoVideo className='fs-2' /> Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill the following details
          <Container className='border rounded border-radius p-3 mt-3'>
            <input 
              style={{ width: '430px' }} 
              onChange={e => setAddVideoDetails({ ...addVideoDetails, caption: e.target.value })}  
              className='my-2 rounded px-3' 
              placeholder='Video Caption' 
              type="text" 
            />
            <input 
              style={{ width: '430px' }}  
              onChange={e => setAddVideoDetails({ ...addVideoDetails, img: e.target.value })} 
              className='my-2 rounded px-3' 
              placeholder='Video Image' 
              type="text" 
            />
            <input 
              style={{ width: '430px' }}  
              onChange={getEmbbedLink} 
              className='my-2 rounded px-3' 
              placeholder='Video URL' 
              type="text" 
            />
          </Container>
        </Modal.Body>

        <div style={{ paddingLeft: '300px' }} className='d-flex pb-3 mx-2'>
          <Button className='mx-2' onClick={handleClose} variant="secondary">Cancel</Button>
          <Button onClick={addHandleShow} variant="warning">Upload</Button>
        </div>
      </Modal>
    </>
  );
}

export default AddVideo;
