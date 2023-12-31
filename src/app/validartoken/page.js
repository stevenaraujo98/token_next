"use client";
import { showToastMessage } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const pathHost = process.env.NEXT_PUBLIC_HOST;
  const { handleSubmit, register } = useForm({ mode: "onChange" });

  const handleClick = (data) => {
    const { cliente, token } = data;

    fetch(pathHost + "/api/usarToken?cliente=" + cliente + "&token=" + token)
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
      <h1 className="mb-10 font-semibold text-center">Validar de Token</h1>

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
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Ingrese el token
            </label>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("token")}
              type="text"
            />
          </div>

          <button
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-indigo-600 hover:bg-indigo-500`}
          >
            Validar
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Page;
