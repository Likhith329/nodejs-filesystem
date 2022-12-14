const express=require('express')

const dotenv=require('dotenv')
dotenv.config()

const app=express()

const fs=require('fs')
const path = require('path')

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
        console.log("Folder is creted")
    })
    const pathname=path.join(process.cwd(),'MyNewFolder/current-date-time.txt')
    fs.writeFile(pathname,content,async()=>{
        console.log("file is created")
        res.status(200).send("Folder and file inside it are created!")
    })
})

app.use('/readfile',async(req,res)=>{
    const pathname=path.join(process.cwd(),'MyNewFolder/current-date-time.txt')
    fs.readFile(pathname,(error,content)=>{
        if(content){
            res.send(content.toString())
            console.log("File is read")
        }
        else{
            res.send("It seems like file isn't created or deleted!")
        }
    })
})

app.use('/deletefile',async(req,res)=>{
    const pathname=path.join(process.cwd(),'MyNewFolder/current-date-time.txt')
    fs.unlink(pathname,(error)=>{
        res.send("File is deleted")
        console.log("File is deleted")
    })
})

app.use('/readfolder',async(req,res)=>{
    fs.readdir(`${process.cwd()}/MyNewFolder`,(error,file)=>{
        if(file!=''){
            res.send(file.toString())
            console.log("Folder is read",)
        }
        else{
            res.send('Folder is empty')
        }
    })
})

app.listen(process.env.PORT)



