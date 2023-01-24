import { useEffect } from "react";
import useClientService from "../hooks/useClientService";
import { URL_API, URL_CLIENTS } from "../utils/constans";
import ClientDetail from "./ClientDetail";
import "./Clients.css";

const Clients = () => {
  const { clients, clientDetail, getClients, getClientDetail } =
    useClientService();
  const renderClients = () => {
    return clients.data.map((el) => {
      return (
        <tr key={el.id}>
          <td
            className='border text-center cursor-pointer hover:bg-violet-700 transition-all'
            onClick={() => {
              getClientDetail(`${URL_API}${URL_CLIENTS}/${el.id}`);
            }}
          >
            {el.name}
          </td>
          <td className='border text-center'>{el.id}</td>
        </tr>
      );
    });
  };

  const renderClientsLoading = () => {
    let res = "";
    if (clients.isLoading) {
      let tr = [];
      for (let i = 0; i < 50; i++) {
        tr.push(
          <tr key={i}>
            <td className='border text-center  transition-all'>Cargando...</td>
            <td className='border text-center'>Cargando...</td>
          </tr>
        );
      }
      res = <tbody>{tr}</tbody>;
    }
    return res;
  };
  const renderLoading = () => {
    let res = "";
    if (clientDetail.isLoading) {
      let p = [];
      for (let i = 0; i < 9; i++) {
        p.push(
          <p key={i} className='grid gap-4 grid-cols-2 w-full mb-2'>
            <div
              className={`rounded animate-pulse bg-gradient-to-r from-cyan-200 to-cyan-200/25 text-right w-[200px] justify-self-end h-5`}
            ></div>
            <div
              className={`rounded animate-pulse bg-gradient-to-r from-cyan-200 to-cyan-200/25 w-[250px] h-5`}
            ></div>
          </p>
        );
      }
      res = (
        <div className='shadow-lg shadow-violet-700 py-6 px-8 rounded bg-gradient-to-br from-violet-700 to-fuchsia-700'>
          <h2 className='text-shadow font-bold text-center text-3xl pb-8 text-cyan-200'>
            Detalles de cliente
          </h2>
          <div className='w-full'>{p}</div>
        </div>
      );
    }

    return res;
  };

  useEffect(() => {
    getClients(`${URL_API}${URL_CLIENTS}`);
  }, []);

  return (
    <div className='flex px-8 w-full space-x-6'>
      <div className='w-full text-white'>
        <h2 className='text-center text-2xl font-bold text-shadow text-cyan-200 py-8'>
          Listado de clientes
        </h2>
        <table className='border w-full bg-purple-hearth text-shadow text-lg text-cyan-200'>
          <thead>
            <tr>
              <th className='border font-bold text-center'>Nombre</th>
              <th className='border font-bold text-center'>Id</th>
            </tr>
          </thead>
          {clients.isSucces ? (
            <tbody>{renderClients()}</tbody>
          ) : (
            renderClientsLoading()
          )}
        </table>
      </div>

      <div className='w-full pl-6 flex flex-col justify-center max-h-[100vh]'>
        {clientDetail.data ? (
          <div className='shadow-lg shadow-violet-700 py-6 px-8 rounded bg-gradient-to-br from-violet-700 to-fuchsia-700'>
            <h2 className='text-shadow font-bold text-center text-3xl pb-8 text-cyan-200'>
              Detalles de cliente
            </h2>
            <ClientDetail data={clientDetail.data} />
          </div>
        ) : (
          renderLoading()
        )}
      </div>
    </div>
  );
};

export default Clients;
