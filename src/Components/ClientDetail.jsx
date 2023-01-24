import { DETAIL_DICTIONARY } from "../utils/constans";

const ClientDetail = ({ data }) => {
  const dateFormat = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
  };
  const renderDetails = () => {
    return Object.keys(data).map((el) => {
      return (
        <p
          key={el}
          className='text-shadow grid gap-4 grid-cols-2 w-full text-lg text-cyan-200'
        >
          <label className='font-bold text-right'>
            {DETAIL_DICTIONARY[el]}:
          </label>
          <span>{el === "createdAt" ? dateFormat(data[el]) : data[el]}</span>
        </p>
      );
    });
  };
  return <div className='w-full'>{renderDetails()}</div>;
};

export default ClientDetail;
