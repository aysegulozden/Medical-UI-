import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface Column<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  emptyMessage?: ReactNode;
  className?: string;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Table<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  emptyMessage = "Kayıt bulunamadı.",
  className,
}: TableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "px-4 py-3 mu-eyebrow text-ink-faint",
                  alignClass[col.align ?? "left"]
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-ink-soft"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={rowKey(row, i)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "border-b border-line/70 transition-colors last:border-0",
                  onRowClick &&
                    "cursor-pointer hover:bg-primary-soft/40"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3.5 text-ink",
                      alignClass[col.align ?? "left"],
                      col.className
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
