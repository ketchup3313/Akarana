import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import Dropdown from "../components/Dropdown";
import styles from "../samerow.module.css";



let startsWithNum = (str) => {
  return /^\d/.test(str);
};
let isBlankOrNull = (str) => {
  return str == null || str.trim() === "";
};
const Table = ({ columns, data, numArticles }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    page, //instead of using rows, we'll use page,
    //which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      sortTypes: {
        alphanumeric: (row1, row2, columnName) => {
          console.log("sorting");

          let rowOneColumn = row1.values[columnName];
          let rowTwoColumn = row2.values[columnName];
          if (isBlankOrNull(rowOneColumn)) {
            if (isBlankOrNull(rowTwoColumn)) {
              return 0;
            } else {
              return 1;
            }
          } else if (isBlankOrNull(rowTwoColumn)) {
            return -1;
          }
          rowOneColumn = rowOneColumn.trim();
          rowTwoColumn = rowTwoColumn.trim();
          if (startsWithNum(rowOneColumn) && startsWithNum(rowTwoColumn)) {
            let startingNum1 = Number(rowOneColumn.match(/\d+/)[0]);
            let startingNum2 = Number(rowTwoColumn.match(/\d+/)[0]);
            let remainder1 = rowOneColumn.replace(String(startingNum1), "");
            let remainder2 = rowTwoColumn.replace(String(startingNum2), "");
            if (startingNum1 === startingNum2)
              return remainder1 > remainder2 ? 1 : -1;
            else return startingNum1 > startingNum2 ? 1 : -1;
          }
          if (startsWithNum(rowOneColumn) && !startsWithNum(rowTwoColumn)) {
            return 1;
          } else if (
            !startsWithNum(rowOneColumn) &&
            startsWithNum(rowTwoColumn)
          ) {
            return -1;
          } else {
            //must be a string
            return rowOneColumn.toLowerCase() > rowTwoColumn.toLowerCase()
              ? 1
              : -1;
          }
        },
      },
      columns,
      data,

      //initially the first page is displayed, displaying 3 rows
      initialState: { pageIndex: 0, pageSize: 3 },
    },
    useSortBy,
    usePagination
  );

  let pageRange = [...Array(pageCount + 1).keys()]
    .slice(1)
    .map((num) => <option key={num}>{num}</option>);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        " 🔽"
                      ) : (
                        " 🔼"
                      )
                    ) : (
                      <span style={{ opacity: 0.3 }}> ⇅ </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <span className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>

        <div className={styles.page_selection}>
          Go to page:
          <Dropdown
            title="Choose a page number"
            optionItems={pageRange}
            handleChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[3, 7, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        </div>
      </span>
      
      <h3>Column Hiding Options</h3>

      <div
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "1700",
        }}
      >
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
    </>
  );
};

export default Table;
