const itemsRouter = require('express').Router()
const Item = require('../models/itemModel')
const middleware = require('../utils/middleware')

// itemsRouter.get('/', async (request, response) => {
//   const items = await Item
//     .find({})
//     .sort({
//       item_id: 'ascending',
//     })
//   response.json(items)
// })

itemsRouter.get('/pages/', async (request, response) => {
  const items = await Item
    .aggregate([
      {
        $group: {
          _id: '$page'
        }
      },
      {
        $lookup: {
          from: 'items',
          let: { page: '$_id' }, // localField

          // pipeline to manage lookup-data ()
          pipeline: [
            {
              $match: {
                $expr: {
                  // $page is foreignField
                  // $$page is localField
                  $eq: ['$page', '$$page']
                }
              }
            },
            {
              // group by sectionName
              $group: {
                _id: '$sectionName',
              }
            },
            {
              $sort: {
                _id: 1,
              }
            },
          ],
          as: 'items',
        },
      },
      {
        $sort: {
          _id: 1,
        }
      }
    ])
  response.json(items)
})

// itemsRouter.get('/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   response.json(blog)
// })

// itemsRouter.post('/', middleware.userExtractor, async (request, response) => {
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

// itemsRouter.put('/:id', async (request, response) => {
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

module.exports = itemsRouter