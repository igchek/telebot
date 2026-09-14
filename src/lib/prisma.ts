import {PrismaClient} from "@prisma/client";

declare global {
    interface BigInt {
        toJSON():number
    }
}

BigInt.prototype.toJSON = function () {
    return Number(this);
}

const globalForPrisma = globalThis as unknown as {prisma:PrismaClient|undefined}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log:['query', 'warn', 'error']
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma