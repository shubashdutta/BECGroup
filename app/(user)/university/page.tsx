import React from "react";
import UniversityPage from "@/src/Landingpage/UniversityPage";
import axios from "axios";
import { baseUrl } from "@/config";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";

interface SearchParams {
  searchParams: {
    course?: string;
    searchTerm?: string;
  };
}

interface University {
  id: number;
  name: string;
  country: string;
  [key: string]: any;
}

interface UniversityPageProps {
  Data: Record<string, University[]>;
}

async function fetchUniversityData(params?: {
  course?: string;
  searchTerm?: string;
}): Promise<Record<string, University[]>> {
  try {
    // Build query params
    const queryParams = new URLSearchParams();
    queryParams.append("page", "1");
    queryParams.append("limit", "12");
    if (params?.course) queryParams.append("course", params.course);
    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);

    // First, get the total count to know how many pages to fetch
    const firstResponse = await axios.get(
      `${baseUrl}api/universities?${queryParams.toString()}`,
    );
    const totalUniversities = firstResponse?.data?.pagination?.total || 0;
    const totalPages = firstResponse?.data?.pagination?.totalPages || 1;

    // Fetch all pages
    const allUniversities: University[] = [];

    // Add the first page data
    if (firstResponse?.data?.data) {
      allUniversities.push(...firstResponse.data.data);
    }

    // Fetch remaining pages
    for (let page = 2; page <= totalPages; page++) {
      const pageParams = new URLSearchParams();
      pageParams.append("page", page.toString());
      pageParams.append("limit", "12");
      if (params?.course) pageParams.append("course", params.course);
      if (params?.searchTerm) pageParams.append("searchTerm", params.searchTerm);

      const response = await axios.get(
        `${baseUrl}api/universities?${pageParams.toString()}`,
      );
      if (response?.data?.data) {
        allUniversities.push(...response.data.data);
      }
    }

    // Group universities by country
    const groupedByCountry = allUniversities.reduce(
      (acc: Record<string, University[]>, uni: University) => {
        const country = uni.country || "Unknown";
        if (!acc[country]) acc[country] = [];
        acc[country].push(uni);
        return acc;
      },
      {},
    );

    return groupedByCountry;
  } catch (error) {
    console.error("Error fetching universities:", error);
    return {};
  }
}

// Server Component - no "use client" directive
export default async function UsaCountryPage({ searchParams }: SearchParams) {
  // Fetch data on the server side with course and searchTerm filters
  const groupedByCountry = await fetchUniversityData({
    course: searchParams?.course,
    searchTerm: searchParams?.searchTerm,
  });

  return (
    <UniversityPage
      Data={groupedByCountry}
      course={searchParams?.course}
      searchTerm={searchParams?.searchTerm}
    />
  );
}
