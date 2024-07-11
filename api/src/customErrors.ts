import { Prisma } from "@prisma/client";

export const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
) => {
  console.log(err.meta);
  switch (err.code) {
    case "P2002": {
      // handling duplicate key errors
      const target = err.meta?.target as string;

      return {
        status: 400,
        message: `Already exists: ${target.split("_key")[0]}`,
      };
    }
    case "P2014":
      // handling invalid id errors

      return { status: 400, message: `Invalid ID: ${err.meta?.target}` };
    case "P2003":
      // handling invalid data errors

      return {
        status: 400,
        message: `Invalid input data: ${err.meta?.target}`,
      };
    default:
      // handling all other errors

      return { status: 500, message: `Something went wrong: ${err.message}` };
  }
};
