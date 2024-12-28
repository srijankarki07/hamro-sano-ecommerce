"use client";

import { Suspense } from "react";
import SearchContent from "./SearchContent";

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
