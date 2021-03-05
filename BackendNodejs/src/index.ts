import express from "express";
import mariadb from "mariadb";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
const app = express();
const port = 8080;
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario

const conexion = dotenv.config().parsed // default port to listen
const pool = mariadb.createPool({ host: conexion.DB_HOST, user: conexion.DB_USER, password: conexion.DB_PASSWORD, database: conexion.DB_DATABASE })
// define a route handler for the default home page
app.get("/usuarios", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuario');

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }



});
app.post("/usuario", async (req, res) => {
    console.log('entro');
    try {
        const body = req.body;
        console.log(body);
        const result = await pool.query(`INSERT INTO usuario  (nombres, apellidos, cedula, correo, telefono)  VALUES ('${body.nombres}','${body.apellidos}','${body.cedula}','${body.correo}','${body.telefono}')`);
        res.status(200).json(result);
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') {
            res.status(400).json({ 'error': 'Cedula o telefono duplicado' });
        } else {
            res.status(500).json(error);
        }
    }
});
app.post("/usuarioUpdate", async (req, res) => {
    console.log('entro');
    try {
        
        const params = req.query;
        console.log(params)
        const body = req.body;
        var string = '';
        Object.keys(body).forEach((element,index) => {
           
            if (index==Object.keys(body).length-1) {
                string += `${element}='${body[element.toString()]}'`
            }else{
                string += `${element}='${body[element.toString()]}',`
            }
           
        });
        console.log(string);
        const result = await pool.query(`UPDATE usuario SET ${string} WHERE (id = ${params.id})`);
        console.log(result)
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        if (error.code == 'ER_DUP_ENTRY') {
            res.status(400).json({ 'error': 'Cedula o telefono duplicado' });
        } else {
            res.status(500).json(error);
        }
    }
});

// start the Express server
app.listen(port, () => {

});