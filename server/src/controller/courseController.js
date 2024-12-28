const Course = require("../models/Course");

module.exports = class CourseController {
    static createCourse = async (req, res) => {
        let payload = req.body;
        

        var imgUrl = "";
        if (req.file) imgUrl = `storage/images/${req.file.filename}`;
        payload.image = imgUrl;

        try {
            const createCourse = await new Course(payload).save();
            return res.status(200).json({
                code: 200,
                message: "Course created successfully",
                data: createCourse,
            });
        } catch (error) {
            res.status(501).json({
                code: 501,
                message: error.message,
                error: true,
            });
        }
    };

    static getCourses = async (req, res) => {
        try {
            const courses = await Course.find();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: error.message,
                error: true,
            });
        }
    };

    static getCourseById = async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            res.status(200).json(course);
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: error.message,
                error: true,
            });
        }
    };

    static updateCourse = async (req, res) => {
        let payload = req.body;

        if (req.file) payload.image = `storage/images/${req.file.filename}`;

        try {
            const updatedCourse = await Course.findByIdAndUpdate(req.params.id, payload, { new: true });
            res.status(200).json({
                code: 200,
                message: "Course updated successfully",
                data: updatedCourse,
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: error.message,
                error: true,
            });
        }
    };

    static deleteCourse = async (req, res) => {
        try {
            await Course.findByIdAndDelete(req.params.id);
            res.status(200).json({
                code: 200,
                message: "Course deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                code: 500,
                message: error.message,
                error: true,
            });
        }
    };
};
