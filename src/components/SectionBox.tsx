import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SectionBox({ title, children }: Props) {
  return (
    <div className="bg-white border rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
