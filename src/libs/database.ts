import mongoose, { ConnectOptions } from "mongoose";

const conectarDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    const url = `${connection.host}:${connection.port}`;
    //console.log(`MongoDB Conectado en: ${url} `);
  } catch (error: unknown) {
    //console.log(`error: ${error}`);
    process.exit(1);
  }
};

export default conectarDB;