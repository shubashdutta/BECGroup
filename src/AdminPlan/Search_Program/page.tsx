"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Pagination } from "antd";

import SelectField from "@/src/Common/SelectField";
import AntdAutoInput from "@/src/Common/AntdAutoInput";
import {
  GetUniversityFilter,
  GetUnivetrsityList,
} from "@/src/ApiList/AdminApi";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { CourseName } from "@/src/utils/CouserList";
import { countrys } from "@/src/utils/CountryList";
import { useDebounce } from "@/src/utils/useDebounce";
import ProgramCard from "./ProgramCard";
import { apiRequest } from "@/src/lib/axiosSetup";
import Loader from "@/app/loading";
import useDynamicPagination from "@/src/Common/Pagination/usePagination";
import Dynamicpagination from "@/src/Common/Pagination/Pagination";

const Page = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { country: "", intake: "", cousre: "", programLevel: null },
  });

  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    itemsPerPage,
    currentPage,
    handleItemsPerPageChange,
    handleNextPage,
    handlePageChange,
    handlePrevPage,
    setCurrentPage,
    setTotalPage,
    totalPage,
  } = useDynamicPagination();

  const course = watch("cousre");
  const country = watch("country");
  const programLevel: any = watch("programLevel");
  const intakeList: any = watch("intake");
  const CouserDebouncedQuery = useDebounce(course);
  const countryDebounced = useDebounce(country);

  const [countryList, setCountryList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [studyLevel, setStudyLevel] = useState([]);
  const [intake, setIntake] = useState([]);

  const handleGetCountry = async () => {
    const params = {
      type: "COUNTRY",
    };
    try {
      const res: any = await GetUniversityFilter(params);
      const country = res?.data?.map((v: any) => ({
        value: v,
      }));
      setCountryList(country);
    } catch (error) {
      errorMessage({ error });
    }
  };

  const handleGetCourse = async () => {
    const params = {
      type: "PROGRAM_NAME",
    };
    try {
      const res: any = await GetUniversityFilter(params);

      const course = res?.data?.map((v: any) => ({
        value: v,
      }));
      setCourseList(course);
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleGetStudyLevel = async () => {
    const params = {
      type: "STUDY_LEVEL",
    };
    try {
      const res: any = await GetUniversityFilter(params);

      const study = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setStudyLevel(study);
    } catch (error) {
      errorMessage({ error });
    }
  };
  const handleGetIntake = async () => {
    const params = {
      type: "INTAKE_YEAR",
    };
    try {
      const res: any = await GetUniversityFilter(params);

      const study = res?.data?.map((v: any) => ({
        label: v,
        value: v,
      }));
      setIntake(study);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetCountry();
    handleGetCourse();
    handleGetStudyLevel();
    handleGetIntake();
  }, []);

  const fetchPrograms = async () => {
    setLoading(true);

    const params: any = {
      statusIn: "ACTIVE",
      ...(itemsPerPage !== "all" && {
        page: currentPage - 1,
        size: Number(itemsPerPage),
      }),

      ...(countryDebounced && { country: countryDebounced }),
      ...(CouserDebouncedQuery && { programName: CouserDebouncedQuery }),
      ...(programLevel?.value && { studyLevel: programLevel.value }),
      ...(intakeList?.value && { intakeYear: intakeList?.value }),
    };

    try {
      const res: any = await GetUnivetrsityList(params);

      setPrograms(res?.data);

      setTotalPage(res?.pageSize);
    } catch (error: any) {
      errorMessage({ error });
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [
    CouserDebouncedQuery,
    countryDebounced,
    programLevel?.value,
    intakeList?.value,
    itemsPerPage,
    currentPage,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className=" my-1 p-3 grid grid-cols-4 gap-2 ">
        <div className=" col-span-1">
          <SelectField
            control={control}
            name="intake"
            options={intake}
            label="Intake year"
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <SelectField
            control={control}
            name="programLevel"
            options={studyLevel}
            label="Program Level"
            errors={errors}
          />
        </div>
        <div className=" col-span-1">
          <AntdAutoInput
            control={control}
            label="Course Name"
            name="cousre"
            option={courseList}
          />
        </div>

        <div className=" col-span-1">
          <AntdAutoInput
            control={control}
            label="Country"
            name="country"
            option={countryList}
          />
        </div>
      </div>

      <div className="mb-2 bg-white rounded-xl p-5 shadow flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {programs.length} Programs Found
        </h2>{" "}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <Loader />
        ) : programs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Select a country, course, program level, or intake to see matching
            results.
          </div>
        ) : (
          programs?.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))
        )}
      </div>

      <Dynamicpagination
        currentPage={currentPage}
        onNextPage={handleNextPage}
        onPageChange={handlePageChange}
        onPrevPage={handlePrevPage}
        onSizeChange={handleItemsPerPageChange}
        totalPage={totalPage}
        itemsPerPage={itemsPerPage}
      />

      {/* {programs.length > pageSize && (
        <div className="flex justify-center mt-10">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={programs.length}
            showSizeChanger
            pageSizeOptions={[5, 10, 20, 50]}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onShowSizeChange={(_, size) => {
              setPageSize(size);
              setCurrentPage(1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )} */}
    </div>
  );
};

export default Page;
