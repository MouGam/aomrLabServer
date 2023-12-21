const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sanitizeFilename = require('sanitize-filename');

const Notification = require('../models/notification');
const NotificationPhoto = require('../models/notificationphoto');

const router = express.Router();

const photoDir = path.resolve(__dirname, '../photo/notification');

const upload = multer({
    storage:multer.diskStorage({
        destination(req, file, cb){
            cb(null, photoDir);
        },
        filename(req, file, cb){
            const safeFilename = sanitizeFilename(file.originalname);
            const ext = path.extname(safeFilename);
            cb(null, path.basename(safeFilename, ext) + Date.now() + ext);
        }
    }),
    limits:1024*1024*5,
});

try{
    fs.readdirSync(photoDir);
}catch(err){
    console.error(photoDir, '이 없으므로 생성합니다');
    fs.mkdirSync(photoDir);
}

router.get('/get', async (req, res, next)=>{
    try{
        const notifications = await Notification.findAll({});
        return res.json(notifications);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.get('/get/photo/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        const photoInNotifi = await NotificationPhoto.findAll({
            attributes:['fileLink'],
            where:{notificationId:id}
        });

        console.log(photoInNotifi);

        return res.json(photoInNotifi);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/create', upload.array('photo'), async (req, res, next)=>{
    try{
        const createdNotification = await Notification.create({
            title:req.body.title,
            main:req.body.main,
        });

        const elements = await Promise.all(req.files.map((e)=>{
                return NotificationPhoto.create({
                    fileLink:e.filename,
                });
            })
        );

        await createdNotification.addNotificationPhoto(elements);
        
        return res.send('success');
    }catch(err){
        console.error(err);
        next();
    }
});

router.delete('/delete/:id', async (req, res, next)=>{
    try{
        const photoInNotifi = await NotificationPhoto.findAll({
            attributes:['fileLink'],
            where:{notificationId:req.params.id}
        });


        photoInNotifi.forEach((e)=>{
            const deleteLink = path.join(photoDir, e.dataValues.fileLink);
            fs.unlink(deleteLink, (err)=>{
                console.error(err);
            })
        });

        await NotificationPhoto.destroy({
            where:{
                notificationId:req.params.id
            }
        });

        await Notification.destroy({
            where:{
                id:req.params.id
            }
        });

        return res.send('success');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;