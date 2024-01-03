import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Users from "./UserModel.js";
// import product from "./ProductModel.js";
const { DataTypes } = Sequelize;

const course = db.define('course',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    judul_program: DataTypes.STRING,
    priode1 : DataTypes.STRING,
    priode2 : DataTypes.STRING,
    rincian_kegiatan: DataTypes.TEXT,
    modul_pembelajaran: DataTypes.TEXT,
    persyaratan: DataTypes.TEXT,
    price: DataTypes.STRING,
    type: DataTypes.STRING,
    link: DataTypes.STRING,
    image_course:{
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/duwoisvla/image/upload/v1669719046/photo1669719020_jtqxri.jpg"
    },
},{
    freezeTableName:true
});


export default course;