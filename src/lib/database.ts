import mongoose from "mongoose";


const connectionDB = async () => {
    try {
        const DBConenection = process.env.MONGO_URI;
        await mongoose.connect(`${DBConenection}`);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error(error);
    }
}
export default connectionDB;
