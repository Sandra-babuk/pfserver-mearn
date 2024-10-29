const express =  require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require ('../middlewares/multerMiddleware')

const router = new express.Router()

// register path
router.post(`/register`,userController.registerController )
// login path
router.post(`/login`,userController.loginController )
// add project
router.post('/addproject',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.addProjectController)
// homeprojects : get requset to http://localhost:3000/home-projects
router.get('/home-projects',projectController.gethomeProjectController)
// allproject : get requset to http://localhost:3000/all-projects 
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectController)
// userproject : get request
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectController)
// remove project : delete request
router.delete('/:pid/remove-projects',jwtMiddleware,projectController.removeProjectController)
// edit project
router.put('/:pid/edit-projects',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.editProjectController)
//edit profile
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)


// export router
module.exports = router