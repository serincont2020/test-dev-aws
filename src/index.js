var express = require('express')
var app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = process.env.PORT || 8080

const dataBPrueba = [
    {
        id : 1,
        nombre : " Pepito",
        edad : 23,
        nacionalidad : "Colombia",
        residencia : "Cali",
        profesion : "Ingeniero",
        task : 'Desarrollo'
    },
    {
        id : 2,
        nombre : " Maria",
        edad : 32,
        nacionalidad : "Colombia",
        residencia : "Medellin",
        profesion : "Administrador",
        task : 'Gerenciar'
    },
    {
        id : 3,
        nombre : " Juan",
        edad : 23,
        nacionalidad : "Colombia",
        residencia : "Bogota",
        profesion : "Arquitecto",
        task : "Diseñar"
    },
    {
        id : 4,
        nombre : " Pablo",
        edad : 23,
        nacionalidad : "Colombia",
        residencia : "Cartagena",
        profesion : "Musico",
        task : "Cantar"
    }
]

app.get('/tasks', function(req, res) {
    res.json(dataBPrueba)
})

app.post('/tasks', function(req, res) {

    try{
        const idTasks = req.body.id 

        const taskSelect = dataBPrueba.find(element => {
            if(element.id == idTasks)
            {
                res.json('La tarea con este id ya existe')                
            }
        });

        dataBPrueba.push(req.body)
        return res.json(dataBPrueba)

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
    
})

app.get('/tasks/:id', function(req, res, ) {
    try {
        const id = req.params.id -1

        const found = dataBPrueba.find(element => element.id == id);
        if(!found){
            res.json('La tarea con este id no existe')
        }

        res.json(dataBPrueba[id])
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
})

app.put('/tasks/:id', function(req, res) {
    try {
        const id = req.params.id -1

        const found = dataBPrueba.find(element => element.id == id);
        if(!found){
            res.json('La tarea con este id no existe')
        }
        
        dataBPrueba.find(element => {
            if(element.id == id)
            {
                dataBPrueba[id] = req.body
                return element
            }
        });

        res.json(dataBPrueba[id])
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
})

app.delete('/tasks/:id', function(req, res) {
    try{
        const id = req.params.id -1

        const found = dataBPrueba.find(element => element.id == id);
        if(!found){
            res.json('La tarea con este id no existe')
        }

        dataBPrueba.splice(id, 1)
        
        res.json('Tarea Eliminada con exito')
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
})

app.use(express.json())
app.listen(port)
console.log('Api de prueba', port)