import course from '../models/Course.js';
import path from "path";

export const getcourse = async(req, res) => {
    try {
        const response = await course.findAll({ 
            attributes:['id', 'judul_program', 'type','link', 'priode1', 'priode2', 'rincian_kegiatan', 'modul_pembelajaran', 'persyaratan', 'price', 'image_course','createdAt','updatedAt']
        });
        res.json(response); // respon berupa json
    } catch (error) {
        console.log(error); // jika terjadi error
    }
}

// Berisi fungsi untuk produk sesuai dengan id
export const getcourseById = async(req, res) => {
    const { id } = req.params; // id diambil dari params
    const Course = await course.findOne({ // hanya mencari satu id
        where: { id: id }, // dengan kodisi id = id
    });
    if (!Course){ // kondisi jika tidak ada produk
        return res.status(404).json({
            success: true,
            message: "Tidak ada course",
        });
    }
    res.json(Course); // respon berupa json
}

export const createcourse = async(req, res) => {
    // mengecek role user yang mengakses
    if(req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa nambah tiket dengan role member",
        });
    }
    if(req.files === null) return res.status(400).json({message: "No File Uploaded"}); // jika tidak ada file yang di upload
    const { judul_program, type , link, priode1, priode2, rincian_kegiatan, modul_pembelajaran, persyaratan, price, image_course} = req.body; // atribut pada req body(untuk input data)
    const file = req.files.image_course; // file foto
    const fileSize = file.data.length; // file size
    const ext = path.extname(file.name); // extension/format file jpg/png
    const rand =Math.random()*10+1+"wr"  // random string
    const fileName = file.md5 +rand+ ext; // format filename di database jika di upload
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // format link url image
    const allowedType = ['.png','.jpg','.jpeg']; // format gambar yang di setujui

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({message: "Invalid Images"}); // cek format file
    if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"}); // cek size file
    
    // peletakan gambar pada database
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({message: err.message});
        try {
            await course.create({judul_program: judul_program, type: type, link:link ,priode1: priode1, priode2: priode2, rincian_kegiatan: rincian_kegiatan, modul_pembelajaran: modul_pembelajaran, persyaratan: persyaratan, price: price, image_course: url});
            return res.status(200).json({ // jika berhasil di create
                success: true,
                message: "Course Berhasil ditambahkan",
            });
        } catch (error) {
            console.log(error); // jika ada error
        }
    })
}

export const updatecourse = async(req, res) => {
    if(req.files === null) return res.status(400).json({message: "No File Uploaded"}); // jika tidak ada file yang di upload
    const { id } = req.params;
    const Course = await course.findOne({ // mencari satu tiket sesuai dengan id params
        where: { id: id },
    });
    let fileName = "";
    if (!Course){ // jika tiket yang dicari tidak ada
        return res.status(404).json({
            success: true,
            message: "Tidak ada tiket",
        });
    }
    const { judul_program, type , link, priode1, priode2, rincian_kegiatan, modul_pembelajaran, persyaratan, price, image_course} = req.body; // atribut untuk input
    // cek role
    if(req.user.role !== "admin" ) {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa update data Course dengan role member",
        });
    }

    if(req.files === null){
        fileName = course.image_course;
    }else {
        const file = req.files.image_course;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const rand =Math.random()*10+1+"wr" 
        fileName = file.md5 +rand+ ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({message: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({message: "Image must be less than 5 MB"});

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({message: err.message});
        });
    }
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await course.update({ judul_program: judul_program, type: type, link: link,priode1: priode1, priode2: priode2, rincian_kegiatan: rincian_kegiatan, modul_pembelajaran: modul_pembelajaran, persyaratan: persyaratan, price: price, image_course: url},
        {
            where: { id: id},
        });
        return res.status(200).json({
            success: true,
            message: "Course Berhasil diupdate",
        });
    } catch (error) {
        console.log(error);
    }
}

export const deletecourse = async(req, res) => {
    const { id } = req.params;
    // mencari data tiket
    const dataBeforeDelete = await course.findOne({
    where: { id: id },
    });
    if (!dataBeforeDelete){ 
        return res.status(404).json({
            success: true,
            message: "Tidak ada course",
        });
    }
    if(req.user.role !== "admin" ) { // cek role
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa mengakses ini",
        });
    }
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete)); // parse tiket

    if (!parsedDataProfile) { 
        return res.status(400).json({
            success: false,
            message: " course yg dicari tidak ada",
        });
    }
    try {
        await course.destroy({ //  Menghapus tiket
            where: { id },
        });
        return res.status(200).json({ // Respon jika berhasil
            success: true,
            message: "Delete Data Successfully",
        });
    } catch (error) {
        console.log(error);
    }
}