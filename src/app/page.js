"use client";
import { showToastMessage } from "@/utils/toast";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const { handleSubmit, register } = useForm({ mode: "onChange" });
  const pathHost = process.env.NEXT_PUBLIC_HOST;

  const handleClick = (data) => {
    const { cliente: username } = data;

    fetch(pathHost + "/api/signup", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("then", res);
        showToastMessage(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* justify-between */}
      <h1 className="mb-10 font-semibold text-center">Crear usuario</h1>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(handleClick)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Ingrese el nombre del usuario
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("cliente")}
              type="text"
              placeholder=""
            />
          </div>

          <div>
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Crear usuario
            </button>
          </div>
        </form>

        <p className="flex mt-10 text-center text-sm gap-x-5 justify-center">
          <Link
            className="font-semibold leading-6 text-indigo-700 hover:text-indigo-500"
            href={"/generartoken"}
          >
            Generar Token
          </Link>
          <Link
            className="font-semibold leading-6 text-amber-700 hover:text-amber-500"
            href={"/validartoken"}
            target="_blank"
          >
            Validar Token
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
