const express=require('express');
const debug = require('debug')('app:main');
const{Config}=require('./src/config/index');
const{geografiaAPI}=require('./src/modules/info/index')

const app=express();
app.use(express.json())

geografiaAPI(app)

app.listen(Config.port,()=>{
    console.log(`Servidor accesible desde http://localhost:${Config.port}`)
})