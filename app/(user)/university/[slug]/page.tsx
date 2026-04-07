"use client";

import { useEffect, useState } from "react";
import UniversityCard from "./UniversityCard";
import { usePathname } from "next/navigation";

const Page = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const pathname = usePathname();
  const slug = pathname?.replace("/university/", "");

  const fetchUniversities = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        country: slug || "",
        page: String(page),
        limit: "12",
      });

      const res = await fetch(
        `https://babyeducation.com.np/api/universities?${params}`,
      );

      const json = await res.json();

      setData(json?.data || []);
      setPagination(json?.pagination || null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchUniversities();
    }
  }, [slug, page]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="p-6 space-y-6">
      {/* 🧾 Content */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No universities found</p>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <UniversityCard key={item._id} item={item} />
            ))}
          </div>

          {/* 🔽 Pagination */}
          {pagination && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* First Page */}
              {pagination.page > 1 && (
                <button
                  onClick={() => setPage(1)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                  aria-label="First page"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Prev */}
              <button
                disabled={!pagination.hasPrev}
                onClick={() => setPage((prev) => prev - 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
                  !pagination.hasPrev
                    ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                    : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                }`}
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {(() => {
                  const pages = [];
                  const totalPages = pagination.totalPages;
                  const currentPage = pagination.page;
                  
                  // Show first page
                  if (currentPage > 3) {
                    pages.push(1);
                    if (currentPage > 4) pages.push('...');
                  }
                  
                  // Show pages around current
                  const start = Math.max(2, currentPage - 1);
                  const end = Math.min(totalPages - 1, currentPage + 1);
                  
                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }
                  
                  // Show last page
                  if (currentPage < totalPages - 2) {
                    if (currentPage < totalPages - 3) pages.push('...');
                    pages.push(totalPages);
                  }
                  
                  return pages.map((pageNum, index) => (
                    <button
                      key={index}
                      onClick={() => typeof pageNum === 'number' && setPage(pageNum)}
                      disabled={pageNum === '...' || pageNum === currentPage}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pageNum === '...'
                          ? "text-gray-400 cursor-default"
                          : pageNum === currentPage
                          ? "bg-blue-500 text-white shadow-md"
                          : "border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ));
                })()}
              </div>

              {/* Next */}
              <button
                disabled={!pagination.hasNext}
                onClick={() => setPage((prev) => prev + 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
                  !pagination.hasNext
                    ? "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400"
                    : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 shadow-sm hover:shadow-md"
                }`}
                aria-label="Next page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Last Page */}
              {pagination.page < pagination.totalPages && (
                <button
                  onClick={() => setPage(pagination.totalPages)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
                  aria-label="Last page"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
