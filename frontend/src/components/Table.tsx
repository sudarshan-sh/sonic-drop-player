import React from "react";

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto w-full rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
      <table className="w-full border-collapse text-left text-sm text-zinc-300">
        <thead className="bg-zinc-900 text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-8 text-center text-zinc-500"
              >
                No items found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-zinc-800/40 transition-colors duration-150 group"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 align-middle">
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
