import { db } from "@/lib/db";
import { Categories } from "./_components/categories";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="p-6 text-[#b98ee4] w-full">
      <Categories items={categories} />
    </div>
  );
};

export default SearchPage;
