/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback, useEffect, useMemo, FC } from "react";
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaDollarSign,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaClipboardList,
  FaUniversity,
  FaMedal,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getCountryCode } from "../utils/getCountry";

interface UniversitiesProps {
  Data?: Record<string, any[]>;
  searchTerm?: string;
  course?: string;
  setSelectedCourse?: (course: string) => void;
}

const UniversityPage: FC<UniversitiesProps> = ({
  Data,
  course: courseProp,
  setSelectedCourse: setSelectedCourseProp,
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourseLocal, setSelectedCourseLocal] = useState("");

  // Use prop value if provided, otherwise use local state
  const selectedCourse = courseProp ?? selectedCourseLocal;

  const handleSetSelectedCourse = (course: string) => {
    setSelectedCourseLocal(course);
    if (setSelectedCourseProp) {
      setSelectedCourseProp(course);
    }
  };
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Flatten universities and apply filters
  const filteredUniversities = useMemo(() => {
    const allUniversities = Object.entries(Data || {}).flatMap(
      ([country, universities]) =>
        universities.map((uni) => ({ ...uni, country })),
    );

    let filtered = allUniversities.filter(
      (uni) =>
        uni.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.country?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedCountry !== "All") {
      filtered = filtered.filter((uni) => uni.country === selectedCountry);
    }

    // Sort universities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.universityName || "").localeCompare(b.universityName || "");
        case "country":
          return (a.country || "").localeCompare(b.country || "");
        case "placement":
          return (
            (b.overviewStats?.placementRate || 0) -
            (a.overviewStats?.placementRate || 0)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [Data, searchTerm, selectedCountry, sortBy]);

  const countries = useMemo(() => {
    const uniqueCountries = new Set<string>();
    Object.keys(Data || {}).forEach((country) => uniqueCountries.add(country));
    return ["All", ...Array.from(uniqueCountries)];
  }, [Data]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const paginatedUniversities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredUniversities.slice(start, end);
  }, [filteredUniversities, currentPage, itemsPerPage]);

  const handleUniversityClick = (university: any) => {
    if (university.universityUrl) {
      window.open(`https://${university.universityUrl}`, "_blank");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const StatCard = ({
    icon,
    label,
    value,
    color = "blue",
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color?: string;
  }) => (
    <div
      className={`bg-${color}-50 p-3 rounded-lg border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div className="text-${color}-600">{icon}</div>
        <div>
          <div className="text-lg font-bold text-gray-800">{value}</div>
          <div className="text-xs text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );

  const renderUniversityCard = (uni: any, index: number) => {
    const code = getCountryCode(uni.country);

    return (
      <div
        key={index}
        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer group overflow-hidden"
        onClick={() => handleUniversityClick(uni)}
      >
        {/* University Banner Image */}
        {uni.universityBannerImage && (
          <div className="h-32 bg-gray-200 overflow-hidden">
            <img
              src={uni.universityBannerImage}
              alt={uni.universityName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Header with Country and Location */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <img
                  src={`https://flagsapi.com/${code}/flat/64.png`}
                  alt={uni.country}
                  className="w-6 h-6 rounded-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {uni.universityName}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <FaMapMarkerAlt size={12} />
                  {uni.location} • {uni.country}
                </p>
              </div>
            </div>
            <FaChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {uni.overviewStats?.placementRate && (
            <StatCard
              icon={<FaChartLine className="text-green-600" />}
              label="Placement Rate"
              value={uni.overviewStats.placementRate}
              color="green"
            />
          )}
          {uni.overviewStats?.totalInternationalStudents && (
            <StatCard
              icon={<FaUsers className="text-blue-600" />}
              label="Intl Students"
              value={uni.overviewStats.totalInternationalStudents}
              color="blue"
            />
          )}
        </div>

        {/* Popular Courses */}
        {uni.topCourses?.length > 0 &&
          uni.topCourses[0]?.cardDetail?.length > 0 && (
            <div className="px-4 pb-2">
              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Popular Courses
              </div>
              <div className="space-y-1">
                {uni.topCourses[0].cardDetail
                  .slice(0, 3)
                  .map((course: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <FaGraduationCap
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                        size={12}
                      />
                      <span className="truncate">{course.courseName}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {/* Footer with Actions */}
        <div className="p-4 border-t border-gray-50 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {uni.topCourses?.[0]?.cardDetail?.length ||
                uni.topCourses?.length ||
                0}{" "}
              Programs Available
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Details →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderUniversityModal = () => {
    if (!selectedUniversity || !isModalOpen) return null;

    const uni = selectedUniversity;
    const code = getCountryCode(uni.country);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto w-full shadow-2xl">
          {/* Modal Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {uni.universityName}
                </h2>
                <div className="flex items-center gap-4 text-lg opacity-90">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagsapi.com/${code}/flat/64.png`}
                      alt={uni.country}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{uni.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt size={20} />
                    <span>{uni.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all shadow-lg"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Key Stats */}
            {uni.overviewStats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {uni.overviewStats.placementRate && (
                  <StatCard
                    icon={<FaChartLine className="text-green-600" />}
                    label="Placement Rate"
                    value={uni.overviewStats.placementRate}
                    color="green"
                  />
                )}
                {uni.overviewStats.acceptanceRate && (
                  <StatCard
                    icon={<FaMedal className="text-blue-600" />}
                    label="Acceptance Rate"
                    value={uni.overviewStats.acceptanceRate}
                    color="blue"
                  />
                )}
                {uni.overviewStats.totalInternationalStudents && (
                  <StatCard
                    icon={<FaUsers className="text-purple-600" />}
                    label="Intl Students"
                    value={uni.overviewStats.totalInternationalStudents}
                    color="purple"
                  />
                )}
                {uni.overviewStats.studentFacultyRatio && (
                  <StatCard
                    icon={<FaGraduationCap className="text-orange-600" />}
                    label="Student-Faculty Ratio"
                    value={uni.overviewStats.studentFacultyRatio}
                    color="orange"
                  />
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Tuition Fees */}
                {uni.costToStudy?.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FaDollarSign className="text-green-600" />
                      Tuition Fees
                    </h3>
                    <div className="space-y-2">
                      {uni.costToStudy.map((cost: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-white p-3 rounded"
                        >
                          <span className="text-gray-700">{cost.degree}</span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(cost.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Programs */}
                {uni.topCourses?.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FaGraduationCap className="text-blue-600" />
                      Popular Programs
                    </h3>
                    <div className="space-y-2">
                      {uni.topCourses.map((course: any, idx: number) => (
                        <div key={idx} className="bg-white p-3 rounded">
                          <h4 className="font-medium text-gray-800">
                            {course.courseName}
                          </h4>
                          {course.courseDuration && (
                            <p className="text-sm text-gray-600 mt-1">
                              {course.courseDuration}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Admission Intakes */}
                {uni.intakes?.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600" />
                      Admission Intakes
                    </h3>
                    <div className="space-y-2">
                      {uni.intakes.map((intake: any, idx: number) => (
                        <div key={idx} className="bg-white p-3 rounded">
                          <h4 className="font-medium text-gray-800">
                            {intake.intakeName}
                          </h4>
                          <div className="text-sm text-gray-600 mt-1">
                            <div>Start: {intake.startDate}</div>
                            <div>End: {intake.endDate}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admission Requirements */}
                {uni.admissionRequirements?.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FaFilter className="text-orange-600" />
                      Admission Requirements
                    </h3>
                    <div className="space-y-2">
                      {uni.admissionRequirements.map(
                        (req: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded">
                            <h4 className="font-medium text-gray-800">
                              {req.requirementName}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {req.requirementDescription}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Placement Information */}
            {uni.placement?.description && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FaChartLine className="text-green-600" />
                  Career Placement
                </h3>
                <div
                  className="text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: uni.placement.description,
                  }}
                />
                {uni.placement.averageSalary?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {uni.placement.averageSalary.map(
                      (salary: any, idx: number) => (
                        <div key={idx} className="bg-white p-3 rounded-lg">
                          <h4 className="font-medium text-gray-800 mb-1">
                            {salary.degree}
                          </h4>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(salary.amount)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {salary.currency}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            {/* External Links */}
            <div className="flex gap-4 mt-6">
              {uni.universityUrl && (
                <a
                  href={`https://${uni.universityUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaMapMarkerAlt />
                  Visit University Website
                </a>
              )}
              <button
                onClick={closeModal}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              University Directory
            </h1>
            <p className="text-lg text-gray-600">
              Explore top universities and detailed program information
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities, locations, or countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities, by Course"
                  value={selectedCourse}
                  onChange={(e) => handleSetSelectedCourse(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="country">Sort by Country</option>
                <option value="placement">Sort by Placement</option>
              </select>

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}

      {/* University Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredUniversities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUniversities.map((uni, index) =>
              (uni.universityBannerImage || uni.image?.imageUrl) &&
              uni.universityName
                ? renderUniversityCard(uni, index)
                : null,
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No universities found</div>
            <p className="text-gray-400 mt-2">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredUniversities.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`dot-${index}`}
                    className="px-2 py-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      currentPage === page
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* University Modal */}
      {renderUniversityModal()}
    </div>
  );
};

export default UniversityPage;
