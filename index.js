const express=require('express')
const app=express()

const fs=require('fs')
const path = require('path')

app.use(express.json())

const timestamp = Date.now();
const dateObject = new Date(timestamp);
const date = dateObject.getDate();
const month = dateObject.getMonth() + 1;
const year = dateObject.getFullYear();
const hour=dateObject.getHours();
const min=dateObject.getMinutes();
const sec=dateObject.getSeconds();
const content=`Date: ${date}-${month}-${year} Time: ${hour}:${min}:${sec}`

app.use('/createfile',async(req,res)=>{
    fs.mkdir(`${process.cwd()}/MyNewFolder`,{recursive:true},()=>{
        console.log("folder is creted")
    })
    const pathname=path.join(process.cwd(),'MyNewFolder/current-date-time.txt')
    fs.writeFile(pathname,content,async()=>{
        console.log("file is created")
        res.status(200).send("folder and file inside it are created!")
    })
})

app.use('/readfile',async(req,res)=>{
    const pathname=path.join(process.cwd(),'MyNewFolder/current-date-time.txt')
    fs.readFile(pathname,(error,content)=>{
        res.send(content.toString())
        console.log("file is read")
    })
})

app.use('/readfolder',async(req,res)=>{
    fs.readdir(`${process.cwd()}/MyNewFolder`,(error,file)=>{
        res.send(file.toString())
        console.log("folder is read")
    })
})

app.listen(8080)



