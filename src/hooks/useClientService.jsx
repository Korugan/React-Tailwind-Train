import { useState } from "react";

const useClientService = () => {
  const [clients, setClients] = useState({
    isLoading: false,
    isSucces: false,
    data: [],
  });
  const [clientDetail, setClientDetail] = useState({
    isLoading: false,
    isSucces: false,
  });
  const getClients = (url) => {
    setClients({
      isLoading: true,
      isSucces: false,
      data: [],
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setClients({
          isLoading: false,
          isSucces: true,
          data: data,
        });
      })
      .then((error) => console.log(error));
  };

  const getClientDetail = (url) => {
    setClientDetail({
      isLoading: true,
      isSucces: false,
    });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setClientDetail({
          isLoading: false,
          isSucces: true,
          data: data,
        });
      });
  };

  return {
    clients,
    clientDetail,
    getClients,
    getClientDetail,
  };
};
export default useClientService;
