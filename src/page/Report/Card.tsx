import { ReactNode } from 'react';

interface ICard {
  title: string;
  value: string;
  details?: ReactNode;
}

export const Card = ({ title, value, details }: ICard) => {
  return (
    <div className="p-5 bg-white rounded shadow-sm">
      <div className="text-base text-gray-400 ">{title}</div>

      <div className="flex items-center pt-1">
        <div className="text-2xl font-bold text-gray-900 ">{value}</div>
      </div>
      {details}
    </div>
  );
};

interface IItemDetail {
  title: string;
  value: string;
}

export const ItemDetail = ({ title, value }: IItemDetail) => {};
