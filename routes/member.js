const express = require('express');
const multer = require('multer');
const Member = require('../models/member');

const fs = require('fs');
const path = require('path');

const router = express.Router();

const photo_dir = path.resolve(__dirname, '../photo/members');

const upload = multer({
    storage:multer.diskStorage({
        destination(req, file, cb){
            cb(null, photo_dir);
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits:5*1024*1024,
});

try{
    fs.readdirSync(photo_dir);
}catch(err){
    console.log(photo_dir, '폴더 생성');
    fs.mkdirSync(photo_dir);
}


//create
router.post('/create', upload.single('file'), async (req, res, next)=>{
    try{
        await Member.create({
            name: req.body.name,
            position : req.body.position,
            img : req.file.filename,
            field : req.body.field,
            email : req.body.email,
            phone : req.body.phone,
            link : req.body.link
        });

        console.log(req.file);
        return res.send('success');
    }catch(err){
        console.error(err);
        next(err);
    }
})

//update
//저쪽에서 id넣어서 보낼 수 있도록 한다.
router.put('/update', upload.single('file'), async (req, res, next)=>{
    try {
        let forUpdate = {};
        
        if(req.file){
            forUpdate.img = req.file.path;
        }
        Object.keys(req.body).forEach((e)=>{
            forUpdate[e] = req.body[e];
        });
        await Member.update(forUpdate, {where:{id:req.body.id}});

        return res.send('success');
    }catch(err){
        console.error(err);
        next(err);
    }
})
//delete
//body에는 id만 담아서 보낸다.
router.delete('/delete/:id', async (req, res, next)=>{
    try {
        const id = req.params.id;
        const forDelete = await Member.findOne({where:{id:id}});
        const deletePath = path.join(photo_dir, forDelete.dataValues.img);

        fs.unlink(deletePath, (err)=>{
            if (err) {
                console.error('파일 삭제 중 오류 발생:', err);
            } else {
                console.log('파일이 성공적으로 삭제되었습니다.');
            }
        })

        await Member.destroy({where:{id:id}});
        return res.send('success');
    }catch(err){
        console.error(err);
        next(err);
    }
})

//get
router.get('/get', async (req, res, next)=>{
    try{
        const allMember = await Member.findAll();
        console.log(allMember);
        return res.json(allMember);
    }catch(err){
        console.error(err);
        next(err);
    }
})

module.exports = router;
