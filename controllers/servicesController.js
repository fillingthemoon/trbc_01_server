const servicesRouter = require('express').Router()
const Service = require('../models/serviceModel')
const middleware = require('../utils/middleware')

servicesRouter.get('/', async (request, response) => {
  const services = await Service
    .find({})
  response.json(services)
})

// servicesRouter.get('/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   response.json(blog)
// })

// servicesRouter.post('/', middleware.userExtractor, async (request, response) => {
//   const body = request.body
//   const user = request.user

//   const blog = new Blog({
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes ? body.likes : 0,
//     user: user._id
//   })

//   const savedBlog = await blog.save()

//   user.blogs = user.blogs.concat(savedBlog)
//   await user.save()

//   response.status(201).json(savedBlog)
// })

// servicesRouter.put('/:id', async (request, response) => {
//   const blog = request.body

//   const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//   response.json(result)
// })

// // Needs to be in an async function because findByIdAndRemove returns a Promise
// servicesRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
//   const user = request.user

//   const blog = await Blog.findById(request.params.id)
//   if ((blog.user.toString() === user.id.toString())) {
//     await Blog.findByIdAndRemove(request.params.id)
//     response.status(204).send() // Correct user: blog removed
//   } else {
//     response.status(204).send() // Incorrect user: Blog not removed
//   }
// })

module.exports = servicesRouter