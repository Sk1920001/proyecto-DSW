import { sql } from "@vercel/postgres";
import { hashPassword } from "./hashPassword";
import { unstable_noStore as noStore } from "next/cache";


async function fetchProducts() {
  noStore();
  try {
    const result = await sql`
      SELECT * FROM products AS p
      INNER JOIN category AS c ON c.id_category = p.id_category
    `
    return result.rows;
  } catch (error) {
    console.error("Database Error", error);
    throw new Error("Failed to fetch product data.");
  }
}

async function fetchGraphData({table,order,quantity,field,values}) {
  noStore();
  try {
    if(values === 'quantity'){
      if(order === 'DESC'){
        if(field === 'name'){
          const result = await sql`
            SELECT quantity AS quantity , name , name_en 
            FROM  products AS t
            INNER JOIN category AS c ON c.id_category = t.id_category
            ORDER BY quantity DESC 
          `
          return result.rows;
        }
        else if(field === 'name_category'){
          const result = await sql`
            SELECT SUM(quantity) AS quantity , name_category, name_category_en 
            FROM  products AS t
            INNER JOIN category AS c ON c.id_category = t.id_category
            GROUP BY name_category, name_category_en 
            ORDER BY quantity DESC 
          `
          return result.rows;
        }
      }
      else if (order === 'ASC'){
        if(field === 'name'){
          const result = await sql`
            SELECT quantity, name, name_en 
            FROM  products AS t
            INNER JOIN category AS c ON c.id_category = t.id_category
            ORDER BY quantity ASC 
          `
          return result.rows;
        }
        else if(field === 'name_category'){
          const result = await sql`
            SELECT SUM(quantity) AS quantity , name_category , name_category_en 
            FROM  products AS t
            INNER JOIN category AS c ON c.id_category = t.id_category
            GROUP BY name_category, name_category_en 
            ORDER BY quantity ASC 
          `
          return result.rows;
        }
      }else{
        throw new Error("Invalid query parameters");
      }
    }else if(values === 'price'){
      if(order === 'DESC'){
        if(field === 'name'){
          const result = await sql`
            SELECT price , name, name_en 
            FROM  products AS t
            INNER JOIN category AS c ON c.id_category = t.id_category
            ORDER BY price DESC 
          `
          return result.rows;
        }
      }
      else if (order === 'ASC'){
        if(field === 'name'){
          const result = await sql`
            SELECT price , name, name_en 
            FROM  products AS t
            INNER JOIN category AS c ON c.id_category = t.id_category
            ORDER BY price ASC 
          `
          return result.rows;
        }
      }else{
        throw new Error("Invalid query parameters");
      }
    }else{
      throw new Error("Invalid query parameters");
    }

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

async function insertItem({name, name_en, description,description_en, id_category, image_path, quantity, price}) {
    await sql`INSERT INTO products (name, name_en, description,description_en, id_category, image_path, quantity, price)
              VALUES (${name}, ${name_en}, ${description},${description_en}, ${id_category}::int, ${image_path}, ${quantity}::int, ${price}::int)`;
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

module.exports={fetchProducts,fetchGraphData,registerUser,loginUser,insertItem};
