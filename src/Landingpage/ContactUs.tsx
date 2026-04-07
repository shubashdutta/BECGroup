  "use client";

  import Image from "next/image";
  import React, { useEffect, useState } from "react";

  import ContactUsImage from "@/asstest/Image/ContactUs.png";
  import TextInput from "../Common/TextInput";
  import { useForm } from "react-hook-form";
  import { FORM_TYPE } from "../utils/InputType";
  import SelectField from "../Common/SelectField";
  import { countryOptions } from "../utils/options/CountryOptions";
  import GetStartedBtn from "../Common/GetStartedBtn";
  import { useInView } from "react-intersection-observer";
  import { GetUniversityResult, publicContact } from "../ApiList/PublicApi";
  import {
    errorMessage,
    successMessage,
  } from "../lib/ToastifyMessage/ToastifyMessage";
  import { ErrorMessage } from "../utils/FormErrorMessage";
  const ContactUs = () => {
    const {
      control,
      register,
      formState: { errors, isSubmitting },
      watch,
      reset,
      handleSubmit,
    } = useForm({
      defaultValues: {
        email: "",
        fullName: "",
        mobile: "",
        country: "",
        isReceivable: "",
        content: "",
      },
    });

    const dis = watch("isReceivable");

    const [countryList, setCountry] = useState([]);

    const { ref, inView } = useInView({
      triggerOnce: true, // animation triggers only once
      threshold: 0.2, // trigger when 20% of the div is visible
    });

    const handelGetCountry = async () => {
      const params = {
        statusIn: "ACTIVE",
        country: "country",
      };
      try {
        const res: any = await GetUniversityResult(params);
        const data = res?.data?.map((v: any) => ({
          label: v,
          value: v,
        }));
        setCountry(data);
      } catch (error) {}
    };

    useEffect(() => {
      handelGetCountry();
    }, []);

    const handlePost = async (data: any) => {
      const { country, ...rest } = data;

      const payload = {
        country: country?.label,
        ...rest,
      };
      try {
        const res: any = await publicContact(payload);
        reset();
        successMessage({ message: res?.message });
      } catch (error) {
        errorMessage({ error });
      }
    };
    return (
      <div className=" container mx-auto    py-5 shadow-2xl">
        <div className=" flex justify-center items-center flex-col pt-5">
          <h4 className="text-lg font-bold">Reach Out Today</h4>
          <h5 className=" font-medium text-md capitalize">
            Empowering growth, nurturing success, together
          </h5>
        </div>

        <form
          onSubmit={handleSubmit(handlePost)}
          className="py-6 px-4 mx-auto flex flex-col md:flex-row justify-center items-start md:items-center gap-8 md:gap-12"
        >
          {/* Left Image */}
          <div
            ref={ref}
            className={`w-full md:w-1/2 ${
              inView ? "animate__animated animate__backInLeft" : ""
            }`}
          >
            <Image
              src={ContactUsImage}
              alt="contactus"
              objectFit="cover"
              className="w-full rounded-lg"
            />
          </div>

          <div
            ref={ref}
            className={`w-full md:w-1/2 space-y-4 ${
              inView ? "animate__animated animate__backInRight" : ""
            } pt-4 md:pt-0`}
          >
            <TextInput
              errors={errors}
              name="fullName"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Full Name"
            />
            <TextInput
              errors={errors}
              name="email"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Email"
              required
              validation={{ required: ErrorMessage.email }}
            />
            <TextInput
              errors={errors}
              name="mobile"
              register={register}
              type={FORM_TYPE.TEXT}
              label="Mobile"
              required
              validation={{ required: ErrorMessage.phone }}
            />

            <SelectField
              control={control}
              errors={errors}
              name="country"
              options={countryList}
              isRequired={true}
              label="Country"
            />

            <TextInput
              type={FORM_TYPE.CHECKBOX}
              errors={errors}
              name="isReceivable"
              register={register}
              label="Yes, I would like to receive information on study abroad news and events from Baby Education"
            />

            <div className="w-full mt-4">
              <GetStartedBtn
                disable={!dis && true}
                label="Submit"
                isSubmitting={isSubmitting}
                color="#d61f24"
              />
            </div>
          </div>
        </form>
      </div>
    );
  };

  export default ContactUs;
