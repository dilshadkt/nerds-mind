"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { customeAxios } from "../../api/service/axios";
import SearchableSelect from "../../components/searchSelect";
import SearchableDesignationSelect from "../../components/searchSelect/designation";
import { registerInitialValue } from "../../constants";
import { LoadingContext } from "../../context/loading";
const Login = () => {
  const [colleges, setColleges] = useState([]);
  const [designations, setDesignations] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    // Replace these with your actual API endpoints
    const fetchColleges = async () => {
      try {
        const response = await customeAxios.get("/getPageLoaddata");
        setColleges(response.data.data.college);
        setDesignations(response.data.data.designation);
      } catch (error) {
        console.log(error);
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);
  const registerValidation = Yup.object().shape({
    ParticipantName: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    ContactNo: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
    EmailID: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    CollegeID: Yup.string()
      .required("College name is required")
      .min(2, "College name must be at least 2 characters long")
      .test(
        "is-valid-college",
        "Please enter a valid college name",
        (value) => {
          if (!value) return false;
          // Either it's a valid college from the list or a custom entry with minimum length
          return (
            colleges.some((c) => c.CollegeName === value) || value.length >= 2
          );
        }
      ),
    Designation: Yup.string()
      .required("Designation is required")
      .min(2, "Designation must be at least 2 characters long")
      .test(
        "is-valid-designation",
        "Please enter a valid designation",
        (value) => {
          if (!value) return false;
          // Either it's a valid designation from the list or a custom entry with minimum length
          return (
            designations.some((d) => d.Position === value) || value.length >= 2
          );
        }
      ),
    FoodType: Yup.string().required("Please select your food preference"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const collegeId =
      colleges.filter((college) => college.CollegeName === values.CollegeID)[0]
        ?.CollegeID || null;
    const { CollegeID, ContactNo, ...formData } = values;
    if (collegeId) {
      formData.CollegeID = collegeId;
      formData.ContactNo = values.ContactNo.toString();
    } else {
      formData.CollegeID = -1;
      formData.OtherName = values.CollegeID;
      formData.ContactNo = values.ContactNo.toString();
    }

    try {
      setLoading(true);
      const response = await customeAxios.post("/postRegistration", {
        participant: formData,
      });
      navigate("/confirm");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="bg-gradient-to-r from-[#092068]/70 to-[#1ac4fa]/60 py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 pt-20 pb-32 md:px-8">
            <div className="mb-10 md:mb-16">
              <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
                Register for the Event
              </h2>
              <p className="mx-auto max-w-screen-md text-center text-gray-800 md:text-lg">
                Join us for an exciting and inspiring experience! Fill out the
                form below to secure your spot at our upcoming event. We look
                forward to welcoming you and making this event a memorable one.
              </p>
            </div>

            <Formik
              initialValues={registerInitialValue}
              validationSchema={registerValidation}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, values }) => (
                <>
                  <Form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="ParticipantName"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Name*
                      </label>
                      <Field
                        name="ParticipantName"
                        placeholder="Name"
                        className={`w-full rounded border bg-gray-50 px-3 py-2
                       text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                         errors.name && touched.name ? "border-red-500" : ""
                       }`}
                      />
                      <ErrorMessage
                        name="ParticipantName"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="ContactNo"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Mobile*
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                          +91
                        </span>
                        <Field
                          type="number"
                          placeholder="Mobile Number"
                          name="ContactNo"
                          className={`w-full rounded-r border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                            errors.mobile && touched.mobile
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="ContactNo"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="EmailID"
                        className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                      >
                        Email*
                      </label>
                      <Field
                        name="EmailID"
                        type="email"
                        placeholder="Email"
                        className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring ${
                          errors.EmailID && touched.EmailID
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="EmailID"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <SearchableSelect
                      name="CollegeID"
                      options={colleges}
                      label="College"
                      placeholder="Search or select a college"
                    />
                    <SearchableDesignationSelect
                      name="Designation"
                      options={designations}
                      label="Designation"
                      placeholder="Search or select a designation"
                    />

                    <div className="sm:col-span-2">
                      <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                        Food Preference*
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3">
                          <Field
                            type="radio"
                            name="FoodType"
                            value="veg"
                            className="form-radio text-indigo-600"
                          />
                          <span className="text-gray-700">Vegetarian</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <Field
                            type="radio"
                            name="FoodType"
                            value="non-veg"
                            className="form-radio text-indigo-600"
                          />
                          <span className="text-gray-700">Non-Vegetarian</span>
                        </label>
                      </div>
                      <ErrorMessage
                        name="FoodType"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex items-center justify-between sm:col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base disabled:opacity-50"
                      >
                        {isSubmitting ? "Submiting..." : "Submit"}
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
