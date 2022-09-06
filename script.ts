import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  await prisma.user.createMany({
    data: names.map((name) => ({
      name,
      email: name.toLowerCase() + "@prisma.io",
    })),
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany();
  const usersNext = users
    .map((user) => ({
      id: user.id,
      name: user.name + "_new",
    }))
    .concat([
      {
        id: users[0].id,
        name: users[0].name + "_next",
      },
      {
        id: users[10].id,
        name: users[10].name + "_next",
      },
    ]);

  await prisma.$transaction(
    usersNext.map((user) => {
      return prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
        },
      });
    })
  );

  console.log(await prisma.user.findMany());
}

const names = [
  "Alice",
  "Bob",
  "Carlos",
  "Carol",
  "Chad",
  "Charlie",
  "Chuck",
  "Craig",
  "Dan",
  "Darth",
  "Dave",
  "David",
  "Erin",
  "Eve",
  "Faythe",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Mallet",
  "Mallory",
  "Michael",
  "Mike",
  "Niaj",
  "Olivia",
  "Oscar",
  "Pat",
  "Peggy",
  "Rupert",
  "Sybil",
  "Ted",
  "Trent",
  "Trudy",
  "Vanna",
  "Victor",
  "Walter",
  "Wendy",
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
