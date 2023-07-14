"use client";
import { showToastMessage } from "@/utils/toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

const Page = () => {
  const [setshowCode, setSetshowCode] = useState(false);
  const [time, setTime] = useState(60);
  const [tokenGenerated, setTokenGenerated] = useState(null);
  const [dispatchFetch, setDispatchFetch] = useState(true);
  const [clientSelected, setClientSelected] = useState("");
  const { handleSubmit, register } = useForm({ mode: "onChange" });
  const pathHost = process.env.NEXT_PUBLIC_HOST;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setDispatchFetch((d) => !d);
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (clientSelected.length > 0) {
      fetch(pathHost + "/api/generarToken?cliente=" + clientSelected)
        .then((res) => res.json())
        .then((res) => {
          console.log("then", res);
          setSetshowCode(res.success);
          if (!res.success) {
            showToastMessage(res);
          } else {
            setTokenGenerated(res.data.token);
            const fecha1 = new Date();
            const fecha2 = new Date(res.data.expiredAt);

            const diferenciaEnSegundos = Math.floor((fecha2 - fecha1) / 1000);
            setTime(diferenciaEnSegundos + 2);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [pathHost, clientSelected, dispatchFetch]);

  const handleClick = (data) => {
    setClientSelected(data.cliente);
  };

  return (
    <div>
      <h1 className="mb-10 font-semibold text-center">Generacion de Token</h1>

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
              disabled={setshowCode}
            />
          </div>

          <button
            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              setshowCode ? "bg-slate-400" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
            disabled={setshowCode}
          >
            Generar Token
          </button>
        </form>

        <p className="flex mt-10 text-center text-sm gap-x-5 justify-center">
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            href={"/"}
          >
            Crear usuario
          </Link>
          <Link
            className="font-semibold leading-6 text-amber-700 hover:text-amber-500"
            href={"/validartoken"}
            target="_blank"
          >
            Validar Token
          </Link>
        </p>

        {setshowCode && (
          <div className="m-5 bg-white rounded-md p-10 space-y-6">
            <h3 className="mb-2 font-semibold text-center">
              Codigo de contraseña
            </h3>
            <div className="text-center">
              <p>{tokenGenerated}</p>
            </div>
            <div className="text-center">
              <p>{time}</p>
            </div>
            <button
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 bg-red-700 hover:bg-red-500`}
              onClick={() => {
                setSetshowCode(false);
                setClientSelected("");
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Page;
