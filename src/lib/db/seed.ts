import { seedQuestions } from "./seeds";

const main = async () => {
  await seedQuestions();

  console.log("Running seed...");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding done!");
    process.exit(0);
  });
