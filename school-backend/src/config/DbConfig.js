import mongoose from "mongoose";
import 'dotenv/config';

export async function configureDb()
{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Db Connected...");
    } catch(error){
        console.log(error);
    }
}



















// // testing
// import mongoose from "mongoose";
// import 'dotenv/config';

// export async function configureDb() {
//     try {
//         await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Db Connected...");
//     } catch (error) {
//         console.log(error);
//     }
// }
