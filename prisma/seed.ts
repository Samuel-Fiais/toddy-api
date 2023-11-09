import { Permission, PrismaClient } from "@prisma/client";
const { v4: uuidv4 } = require("uuid");

interface ITable {
  table_name: string;
}

const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRaw<ITable[]>`
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema='public' 
  AND table_type='BASE TABLE' 
  AND table_name NOT IN ('_prisma_migrations', 'user_histories', 'employee_histories', 'product_histories', 'supplier_histories', 'order_histories', 'sale_histories', '_PermissionToUser');
  `;

  const typePermissions = ["CREATE", "READ", "UPDATE", "DELETE"];

  const lastPermission = await prisma.permission.findFirst({
    orderBy: { alternateId: "desc" },
  });
  let lastAlternateId = lastPermission ? lastPermission.alternateId : 0;

  for (let table of tables) {
    try {
      const tableName = table.table_name;
      const permissionName = tableName.toUpperCase();

      for (let typePermission of typePermissions) {
        lastAlternateId++;
        const permission: Permission = {
          alternateId: lastAlternateId,
          description: `${permissionName}_${typePermission}`,
          createdAt: new Date(),
          id: uuidv4(),
        };

        await prisma.permission.create({
          data: permission,
        });

        console.log(
          `Created permission for table: ${tableName} with type: ${typePermission}`,
        );
      }

      console.log(`Created permission for table: ${tableName}`);
    } catch (e) {
      continue;
    }
  }

  const user = await prisma.user.findUnique({
    where: { id: "20c56374-9a17-4782-8eb0-c09c69c9ba8b" },
  });

  if (user) {
    const permissions = await prisma.permission.findMany();

    await prisma.user.update({
      where: { id: "20c56374-9a17-4782-8eb0-c09c69c9ba8b" },
      data: {
        permissions: {
          connect: permissions,
        },
      },
    });
  }

  await prisma.$disconnect();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
