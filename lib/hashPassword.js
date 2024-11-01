import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
    const saltRounds = 10; // número de rondas de hashing, entre 10 y 12 es seguro y razonablemente rápido
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
