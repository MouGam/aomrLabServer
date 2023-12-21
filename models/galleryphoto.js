//사진위치
const Sequelize = require('sequelize');

class GalleryPhoto extends Sequelize.Model{
    static initiate(sequelize){
        GalleryPhoto.init({
            fileLink:{
                type:Sequelize.STRING(100),
                allowNull:false
            }
        },{
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored:true,
            modelName:'GalleryPhoto',
            tableName:'galleryphoto',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }
    static associate(db){
        db.GalleryPhoto.belongsTo(db.Gallery, {foreignKey: 'galleryId', targetKey:'id'});
    }
}


module.exports = GalleryPhoto;