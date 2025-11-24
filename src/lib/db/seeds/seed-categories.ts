import { categories } from "@/data";

import { db } from "@/lib/db";
import { categories as categoriesTable } from "@/lib/db/schemas";

const seedCategories = async () => {
  for (const category of categories) {
    await db.insert(categoriesTable).values({
      name: category.name,
    });
  }
};

export { seedCategories };
