import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // So we can use process.env.MONGODB_URI
import adminModel from './models/adminModel.js';

// --- CONFIGURE YOUR ADMINS HERE ---
const adminsToCreate = [
  {
    userid: 'admin1',
    password: 'password123', // Plain text password
    ward: 'Ward1'
  },
  {
    userid: 'admin2',
    password: 'password234',
    ward: 'Ward2'
  },
  {
    userid: 'admin3',
    password: 'password345',
    ward: 'Ward3'
  }
];
// ---------------------------------

const seedAdmins = async () => {
  try {
    const DB_URI = `${process.env.MONGODB_URI}/grievance`; 
    await mongoose.connect(DB_URI);

    console.log('Database connected...');

    // Clear existing admins
    await adminModel.deleteMany({});
    console.log('Old admins removed.');

    for (const adminData of adminsToCreate) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminData.password, salt);

      // Create new admin
      await new adminModel({
        userid: adminData.userid,
        password: hashedPassword,
        ward: adminData.ward,
        role: 'admin'
      }).save();

      console.log(`Created admin: ${adminData.userid}`);
    }

    console.log('Admin seeding complete!');
  } catch (error) {
    console.error('Error seeding admins:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmins();