import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { LuLoader, LuSearch, LuRefreshCw, LuCirclePlus } from "react-icons/lu";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import Button from "./Button";

const DataTable = ({
  tableTitle,
  Icon,
  loading,
  columns,
  data,
  tableRows,
  searchFields,
  onRefresh,
  addButtonModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    );
    setFilteredData(filtered);
  }, [data, searchTerm, searchFields]);

  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const SortableHeader = ({ column, label }) => (
    <th
      className="px-6 py-3 border-b-2 cursor-pointer select-none hover:bg-gray-600"
      onClick={() => requestSort(column)}
    >
      <div className="flex items-center">
        {label}
        {sortConfig.key === column && (
          <span className="ml-1">
            {sortConfig.direction === "ascending" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <div className="flex flex-col">
      <section className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <div className="flex items-center relative">
          <LuSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder={"Search for " + tableTitle + "..."}
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            text="Refresh"
            icon={LuRefreshCw}
            className="bg-gray-600 hover:bg-gray-700"
            onClick={onRefresh}
            loading={loading}
          />
          <Modal>
            <ModalTrigger>
              <Button
                type="button"
                text="Add New"
                icon={LuCirclePlus}
                className="min-w-max"
              />
            </ModalTrigger>
            <ModalContent>{addButtonModal}</ModalContent>
          </Modal>
        </div>
      </section>
      <section className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-800">
          <thead className="bg-gray-700 text-gray-300 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
            <tr>
              {columns.map((column) => (
                <SortableHeader
                  key={column.key}
                  column={column.key}
                  label={column.label}
                />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm divide-y divide-gray-700">
            {loading && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex justify-center items-center gap-2">
                    <LuLoader className="animate-spin w-5 h-5" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && filteredData.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="flex justify-center items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span>No {tableTitle} found</span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && filteredData.map((data) => tableRows(data))}
          </tbody>
        </table>
      </section>
      {filteredData.length > 0 && (
        <section className="mt-4 text-sm text-gray-400">
          Showing {filteredData.length} of {data.length} {tableTitle}
        </section>
      )}
    </div>
  );
};

export default DataTable;
