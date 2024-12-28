const express = require('express');
const fileUpload = require('../utils/fileUpload');
const CourseController = require('../controller/courseController');

const router = express.Router();

router.post('/create-courses', fileUpload("./storage/images"), CourseController.createCourse);
router.get('/courses', CourseController.getCourses);
router.get('/courses/:id', CourseController.getCourseById);
router.put('/courses/:id', fileUpload("./storage/images"), CourseController.updateCourse);
router.delete('/courses/:id', CourseController.deleteCourse);

module.exports = router;
