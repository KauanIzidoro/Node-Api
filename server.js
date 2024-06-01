import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

/*
    Create a router for http methods:

    HTTP methods:

    GET - list, or consult a data.
    POST - create, or add new data.
    PUT - edit, or edit data already exist.
    PATCH - edit, but just one data.
    DELETE - delete data.
    ----------------- 
    HTTP status:

    200,201,2nn = sucess code
    404,400,4nn = front-end error code
    500,5nn = back-end error code

*/
/*
    How to create a HTTP route:
    1) Type of route(e.g. GET,POST,...);
    2) address of server;

    app.'type_of_route'('address',(resquest/response),(resquest/response) => {
        
        ...
        'your code here'
        ...
    })

*/

/*
    for run your server
    use this comand in terminal:

    -> node 'file_name.js'

    always what you make a modifications in code 
    your should stop your server with 'ctrl+c'
    and run again

    for run your server without interruptions
    use this comand in terminal:

    -> node --watch 'file_name.js'

*/

/*
    Request:
    
    Query params(GET)

    servername.com/users?variable1=value1&variable2=value2

    notice that, params are in url, this not recommend for 
    security infos like a passwords, finance infos,...
    Here it is possible to include as much 
    information as necessary for query

    --------------------------
    Route params(GET,PUT,DELETE)

    used when we have specific infos

    (GET,PUT,DELETE) servername.com/users/specificinfo1

    ---------------------------
    Body params(POST,PUT)

    use JSON file for send info,
    here can handling a lot of infos and
    security infos.

    {
        "name": "Username",
        "id": "userid"
        "credit_card": "yyyy-yyyy-zzzz-zzzz"
    }
     
*/

app.post('/users', async (req,res) => {
    //promise or async function is a action what dont have time for happing
    //always wait another factors
   await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})

app.get('/users', async (req,res) => {
    //req.query -> here use query params for a filter
    let userstemp = []
    if(req.query){
        userstemp = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        userstemp = await prisma.user.findMany()
    }
    res.status(200).json(showUsers)
}) 
/*
    enter a port for run server
    app.listen('server_port')
    can be access with 'http://localhost:3000/users'
*/
//notice that: ':id' this is a varible
app.put('/users/:id', async (req,res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
})

app.delete('/user/:id', async (req,res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
})
app.listen(3000)




 