export type ITab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export type TabsProps = {
  tabs: ITab[];
  defaultTabId?: string;
  onTabChange: () => void;
};
