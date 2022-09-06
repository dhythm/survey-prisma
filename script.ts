import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
});

async function main() {
  const createMany = await prisma.user.createMany({
    data: names.map((name) => ({
      name,
      email: name.toLowerCase() + "@prisma.io",
    })),
    skipDuplicates: true,
  });

  console.log({ createMany });
  //   await prisma.$transaction(
  //     createMany.map((user) =>
  //       prisma.user.update({
  //         where: { id: user.id },
  //         data: {
  //           name: user.name + "_new",
  //         },
  //       })
  //     )
  //   );
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
