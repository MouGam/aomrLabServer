const express = require('express');
const multer = require('multer');

const fs = require('fs');
const path = require('path');

//갤러리의 게시물에 대한 정보는 Gallery모델에서 찾고
//각 사진들이 어디 속하는지에 대한 정보는 GalleryPhoto모델에서 찾는다.
const Gallery = require('../models/gallery');
const GalleryPhoto = require('../models/galleryphoto');

const router = express.Router();

const photoDir = path.resolve(__dirname, '../photo/gallery');

const upload = multer({
    storage:multer.diskStorage({
        destination(req, file, cb){
            cb(null, photoDir);
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits:1024*1024*5
})

try{
    fs.readdirSync(photoDir);
}catch(err){
    console.error(photoDir, '이 없으므로 생성합니다');
    fs.mkdirSync(photoDir);
}


//upload
router.post('/create', upload.array('photo'), async (req, res, next)=>{
    
    try{
        const galleryElement = await Gallery.create({
            title:req.body.title,
            description:req.body.description,
        });

        const elements = await Promise.all(req.files.map((e)=>{
                return GalleryPhoto.create({
                    fileLink:e.filename,
                });
            })
        );

        await galleryElement.addGalleryPhoto(elements);
        
        return res.send('success');
    }catch(err){
        console.error(err);
        next();
    }
})

//get - Gallery모델에서 반환
router.get('/get', async (req, res, next)=>{
    try{
        const allGallery = await Gallery.findAll();

        return res.json(allGallery);
    }catch(err){
        console.error(err);
        next(err);
    }

});

//get - 사진 데이터 담긴 GalleryPhoto 모델에서 반환
router.get('/get/photo/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        const photoInGallery = await GalleryPhoto.findAll({
            attributes:['fileLink'],
            where:{galleryId:id}
        });

        return res.json(photoInGallery);
    }catch(err){
        console.error(err);
        next(err);
    }
})

//update

//delete
router.delete('/delete/:id', async (req, res, next)=>{
    try{
        // await Gallery.delete({
        //     where:{
        //         id:req.params.id
        //     }
        // });

        const photoInGallery = await GalleryPhoto.findAll({
            attributes:['fileLink'],
            where:{galleryId:req.params.id}
        });

        // console.log(photoInGallery[0].dataValues.fileLink);

        photoInGallery.forEach((e)=>{
            const deleteLink = path.join(photoDir, e.dataValues.fileLink);
            fs.unlink(deleteLink, (err)=>{
                console.error(err);
            })
        });

        await GalleryPhoto.destroy({
            where:{
                galleryId:req.params.id
            }
        });

        await Gallery.destroy({
            where:{
                id:req.params.id
            }
        });

        return res.send('success');
    }catch(err){
        console.error(err);
        next(err);
    }
})


module.exports = router;