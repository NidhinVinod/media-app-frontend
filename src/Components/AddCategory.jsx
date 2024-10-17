import React, { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { TbPhotoVideo } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2'
import { addCategoryApi, deleteCategoryApi, dragAndDropApi, getCategoryApi, updateCategoryApi } from '../Services/allApis';
import VideoCard from './VideoCard';


function AddCategory() {
  const [AddCategory, setAddCategory] = useState("")
  const [categoryDetails, setCategoryDetails] = useState([]);

  console.log(AddCategory);

  const handleCategory = async () => {
    if (AddCategory) {
      const body = {
        AddCategory,
        allVideos: []
      }
      try {
        const result = await addCategoryApi(body)
        console.log(result);
        Swal.fire({
          title: 'success',
          text: 'category added successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        })
        window.location.reload()
        handleClose()

      }
      catch (error) {
        console.log(error);
      }
    }
  }
  const getCategory = async () => {
    const result = await getCategoryApi()
    console.log(result.data);
    setCategoryDetails(result.data)
  }
  console.log(categoryDetails);

  useEffect(() => {
    getCategory()
  }, [])

  const handleDelete = async (id) => {
    const result = await deleteCategoryApi(id)
    window.location.reload()
  }
  const dragOver = (e) => {
    e.preventDefault();
    console.log("dragOver");
    console.log(e);
  }

  const videoDrop = async (e, itemId) => {
    const videoId = e.dataTransfer.getData("videoId")
    console.log("video drop" + itemId, "videoId add successfully" + videoId);
    console.log(e);

    //fetch data from all videos to show in drag and drop
    const { data } = await dragAndDropApi(videoId)
    console.log(data);

    ////add these detailes to category =>all videos
    const seletedCategory = categoryDetails.find((item) => item.id === itemId)
    seletedCategory.allVideos.push(data)
    console.log(seletedCategory);

    const updateCategory = await updateCategoryApi(itemId, seletedCategory)
    console.log(updateCategory);
    getCategory()

  }

  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className=' ' style={{ paddingRight: `95px`, paddingLeft: `95px` }} variant="warning" onClick={handleShow}>
        Add Category
      </Button>
      {
        categoryDetails.length > 0 ? categoryDetails.map((item) => (<Container dropplable={true} onDragOver={e => dragOver(e)} onDrop={(e) => videoDrop(e, item.id)} className='px-3 py-3 border rounded my-4'>
          <h6 className='py-2'>{item.AddCategory}  <Button style={{ float: `right` }} variant="danger"><MdDelete onClick={() => handleDelete(item.id)} /></Button> </h6>
          <input type="text" className='my-4 px-4 rounded  ' style={{ backgroundColor: `` }} />
        <div className='row'>
          {
            item.allVideos.length>0?item.allVideos.map(videos=>(
              <div>
                <VideoCard videoDetails={videos}/>
              </div>
            )):null
          }
          
        </div>

        </Container>

        )) : 'No Category Added'
      }



      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title> Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className='border rounded border-radius p-3 mt-3' >
            <input onChange={(e) => setAddCategory(e.target.value)} style={{ width: `430px` }} className='my-2 rounded px-3' placeholder='Video Caption' type="text" />

          </Container>
        </Modal.Body>

        <div style={{ paddingLeft: `300px` }} className='d-flex pb-3 mx-2  '>
          <Button className='mx-2 ' onClick={handleClose} variant="secondary">Cancel</Button>{' '}
          <Button onClick={handleCategory} variant="warning">Add</Button>{' '}
        </div>

      </Modal>


    </>
  )
}

export default AddCategory