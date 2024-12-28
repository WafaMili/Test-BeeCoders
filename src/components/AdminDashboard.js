import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';

// Composant AdminDashboard
const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseData, setCourseData] = useState({ title: '', price: '', image: null });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // Charger les cours depuis l'API
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error loading courses:', error);
        setError('Failed to load courses. Please try again later.');
      });
  }, []);

  // Fonction pour ouvrir le modal de création ou d'édition
  const openModal = (course = null) => {
    if (course) {
      setIsEdit(true);
      setEditId(course._id);
      setCourseData({
        title: course.title,
        price: course.price,
        image: course.image,
      });
    } else {
      setIsEdit(false);
      setCourseData({ title: '', price: '', image: null });
    }
    setShowModal(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setShowModal(false);
    setError(null); // Réinitialiser les erreurs lorsque le modal est fermé
  };

  // Gérer la modification des données du formulaire
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setCourseData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setCourseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Soumettre le formulaire pour créer ou mettre à jour un cours
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valider le formulaire avant envoi
    if (!courseData.title || !courseData.price) {
      setError('Title and price are required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', courseData.title);
    formData.append('price', courseData.price);
    if (courseData.image) {
      formData.append('image', courseData.image);
    }

    const url = isEdit
      ? `http://localhost:5000/api/v1/courses/${editId}`
      : 'http://localhost:5000/api/v1/create-courses';

    const request = isEdit ? axios.put(url, formData) : axios.post(url, formData);

    request
      .then(response => {
        // Mise à jour de la liste des cours
        if (isEdit) {
          setCourses(prevCourses => 
            prevCourses.map(course => 
              course._id === editId ? response.data.data : course
            )
          );
        } else {
          setCourses(prevCourses => [...prevCourses, response.data.data]);
        }
        closeModal();
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.response?.data?.message || 'There was an error processing your request. Please try again.');
      });
  };

  // Supprimer un cours
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      axios.delete(`http://localhost:5000/api/v1/courses/${id}`)
        .then(() => {
          setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
        })
        .catch(error => {
          console.error('Error deleting course:', error);
          setError('Failed to delete course. Please try again later.');
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Bouton pour ouvrir le modal de création */}
      <Button variant="primary" onClick={() => openModal()}>Add New Course</Button>

      {/* Affichage des erreurs si elles existent */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tableau des cours */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.price}</td>
              <td>
                {course.image && (
                  <img
                    src={`http://localhost:5000/uploads/${course.image.split('storage/images/')[1]}`}
                    alt={course.title}
                    width="100"
                  />
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => openModal(course)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(course._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal pour créer ou éditer un cours */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Course' : 'Add Course'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCourseTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCoursePrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCourseImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isEdit ? 'Update Course' : 'Create Course'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
