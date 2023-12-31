"use client";
import Image from "next/image";
import * as React from "react";
import icon_hngx from "@/app/icon.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "@/services/firebase";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const schema = Yup.object({
  email: Yup.string().email("Invalid email").min(5, "Must be 5 characters or more").required("Required"),
  password: Yup.string().min(5, "Must be 5 characters or more").required("Required"),
});

export default function Sign() {
  const auth = getAuth(app);
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast("Connected!", { type: "success" });
        router.push("/gallery");
      })
      .catch((error) => {
        console.error(error);
        toast("Wrong credentials!", { type: "error" });
      });
  }

  // console.log("test")

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image className="mx-auto h-10 w-auto" src={icon_hngx} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values.email, values.password).finally(() => setSubmitting(false));
          }}
        >
          {({ isSubmitting, isValid }: { isSubmitting: boolean; isValid: boolean }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="email" render={(errorMessage) => <div className="text-red-500">{errorMessage}</div>} />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="password" render={(errorMessage) => <div className="text-red-500">{errorMessage}</div>} />
              </div>
              <button
                className="flex w-full disabled:opacity-20 justify-center items-center gap-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                disabled={isSubmitting || !isValid}
                type="submit"
              >
                {isSubmitting && <div className="h-4 w-4 border-t-2 border-white rounded-full animate-spin"></div>}
                <span>{isSubmitting ? "loading..." : "Submit"}</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
