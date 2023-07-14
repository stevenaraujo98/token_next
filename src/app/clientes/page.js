import Image from "next/image";
const pathHost = process.env.NEXT_PUBLIC_HOST;

async function getData() {
  const res = await fetch(pathHost + "/api/clientes");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const { data } = await getData();

  return (
    <div>
      <h1 className="font-bold">Lista de clientes</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {data &&
          data.map((item, index) => (
            <li className="flex justify-between gap-x-6 py-5" key={index}>
              <div className="flex gap-x-4">
                <Image
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src="https://via.placeholder.com/256"
                  alt="Perfil"
                  width={100}
                  height={100}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {item.username}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {item.id}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
