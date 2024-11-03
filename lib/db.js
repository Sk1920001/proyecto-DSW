import { sql } from "@vercel/postgres";
import { hashPassword } from "./hashPassword";
import { unstable_noStore as noStore } from "next/cache";


async function fetchProducts({ category }) {
  noStore();
  try {
    const result = await sql`
      SELECT * FROM products AS p
      INNER JOIN category AS c ON c.id_category = p.id_category
      WHERE c.name_category = ${category};
    `
    return result.rows;
  } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch product data.");
  }
}



async function registerUser({username, password, email}) {
    const hashedPassword = await hashPassword(password);
    // Aquí guardas `hashedPassword` en lugar de la contraseña en texto plano en la base de datos
    await sql`INSERT INTO users (username, password, email) VALUES (${username}, ${hashedPassword}, ${email})`;
}

async function insertItem({name, name_en, description, id_category, image_path, quantity, price}) {
    await sql`INSERT INTO products (name, name_en, description, id_category, image_path, quantity, price)
              VALUES (${name}, ${name_en}, ${description}, ${id_category}::int, ${image_path}, ${quantity}::int, ${price}::int)`;
}

async function loginUser({ email, password }) {
  const bcrypt = require("bcrypt");
  try {
    const { rows, fields } = await sql`SELECT password, username, is_admin FROM users u WHERE u.email = ${email}`;
    
    // Check if the user exists
    if (rows.length === 0) {
      console.log("User not found");
      return; // Or handle the error in another way
    }

    const hashedPassword = rows[0].password;

    // Check if the password matches
    const equalPasswords = await bcrypt.compare(password, hashedPassword);
    if (equalPasswords) {
      console.log("User logged in");
      return{
        user: rows[0].username,
        admin: rows[0].is_admin,
      };
    } else {
      console.log("Incorrect password");
    }
  } catch (error) {
    console.error("Error logging in the user:", error);
    throw new Error("Internal server error"); // You can throw the error or handle it differently
  }
}

module.exports={fetchProducts,registerUser,loginUser,insertItem};
