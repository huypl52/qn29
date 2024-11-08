import { PropsWithChildren, ReactNode } from 'react';

interface ICard extends PropsWithChildren {
  title: string;
  value?: string | number;
}

export const Card = ({ title, value, children }: ICard) => {
  return (
    <div className="p-5 bg-white rounded shadow-lg min-w-96">
      <div className="text-3xl text-gray-900 ">{title}</div>

      <div className="flex items-center pt-1">
        <div className="text-2xl font-bold text-gray-900 ">{value}</div>
      </div>
      {children}
    </div>
  );
};

interface ICardItem {
  title: string;
  value?: string | number;
}

export const CardItem = ({ title, value }: ICardItem) => {
  return (
    <div>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};
