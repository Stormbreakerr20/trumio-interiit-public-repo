FROM node:18

WORKDIR /app
COPY prisma/schema.prisma /app/
COPY .env /app/
CMD ["npx", "prisma", "studio"]