// src/lib/prisma.js
// Instancia única del cliente de Prisma (patrón Singleton)
// Importar siempre este archivo cuando se necesite usar Prisma

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
