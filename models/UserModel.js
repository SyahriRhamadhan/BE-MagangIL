import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image_user:{
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/duwoisvla/image/upload/v1669719046/photo1669719020_jtqxri.jpg"
    },
    password: DataTypes.STRING,
    role:  DataTypes.STRING,
    refresh_token: DataTypes.TEXT,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    kampus: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.STRING,
    agama: DataTypes.STRING,
    program_studi: DataTypes.STRING,
    jenjang: DataTypes.STRING,
},{
    freezeTableName:true
});

export default Users;