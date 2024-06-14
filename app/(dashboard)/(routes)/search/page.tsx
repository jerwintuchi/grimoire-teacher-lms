import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="w-full">
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <div className="p-6 text-[#b98ee4]">
          <Categories items={categories} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
