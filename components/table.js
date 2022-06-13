/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import styles from "./table.module.css";

function Table({ headers, rows, onRefresh, id }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [autoScroll, setAutoScroll] = useState(true);
  const [intervalID, setIntervalID] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const autoScrollFunc = () => {
    if (autoScroll === false) {
      return;
    }
    let interval = setInterval(() => {
      let noOfPages = Math.ceil(rows.length / 10);
      setPageNumber((page) => {
        if (page + 1 > noOfPages) {
          setRefresh(true);
          return 1;
        }
        return page + 1;
      });
    }, 4000);
    setIntervalID(interval);
  };
  useEffect(autoScrollFunc, [autoScroll]);

  function setScroll() {
    setAutoScroll(!autoScroll);
    clearInterval(intervalID);
    setIntervalID(null);
  }

  if (refresh === true && onRefresh) {
    return onRefresh();
  }
  return (
    <div className={styles.pagination}>
      <table className={styles.table} id={id}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody align="center">
          {rows.slice((pageNumber - 1) * 10, pageNumber * 10).map((row) => (
            <tr className={styles.latestTable}>
              {row.map((cell) => (
                <td>{cell} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        listLength={rows.length}
        onClick={setPageNumber}
        pageNumber={pageNumber}
      />
      <div className="parent inline-flex-parent">
        <input
          className="child"
          type="checkbox"
          checked={autoScroll}
          onChange={setScroll}
        />
        <label className="child" style={{ color: "black", fontSize: "20px" }}>
          {" "}
          Auto scroll
        </label>
      </div>
    </div>
  );
}

export const Pagination = ({ pageNumber, listLength, onClick }) => {
  let noOfPages = Math.ceil(listLength / 10);
  let pageNumbers = [];
  if (noOfPages < 10) {
    for (let i = 1; i <= noOfPages; i++) {
      if (i === pageNumber) {
        pageNumbers.push(
          <span
            style={{ backgroundColor: "grey", fontSize: "15px" }}
            onClick={() => onClick(i)}
          >
            {i}
          </span>
        );
      } else {
        pageNumbers.push(<span onClick={() => onClick(i)}>{i}</span>);
      }
    }
  } else {
    // Always print first page button
    if (pageNumber === 1) {
      pageNumbers.push(
        <span style={{ backgroundColor: "grey" }} onClick={() => onClick(1)}>
          1
        </span>
      );
    } else {
      pageNumbers.push(<span onClick={() => onClick(1)}>1</span>);
    }
    // Print "..." if pageNumber is > 3
    if (pageNumber > 3) {
      pageNumbers.push(<span>...</span>);
    }
    // special case where last page is selected...
    if (pageNumber === noOfPages) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber - 2)}>{pageNumber - 2}</span>
      );
    }
    // Print previous number button if pageNumber > 3
    if (pageNumber > 2) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber - 1)}>{pageNumber - 1}</span>
      );
    }
    //Print current page number button as long as it not the first or last page
    if (pageNumber !== 1 && pageNumber !== noOfPages) {
      pageNumbers.push(
        <span
          style={{ backgroundColor: "grey" }}
          onClick={() => onClick(pageNumber)}
        >
          {pageNumber}
        </span>
      );
    }
    //print next number button if pageNumber < lastPage - 3
    if (pageNumber < noOfPages - 1) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber + 1)}>{pageNumber + 1}</span>
      );
    }
    // special case where first page is selected...
    if (pageNumber === 1) {
      pageNumbers.push(
        <span onClick={() => onClick(pageNumber + 2)}>{pageNumber + 2}</span>
      );
    }
    //print "..." if pageNumber is < lastPage -2
    if (pageNumber < noOfPages - 2) {
      pageNumbers.push(<span>...</span>);
    }
    //Always print last page button if there is more than 1 page
    if (noOfPages > 1) {
      if (pageNumber === noOfPages) {
        pageNumbers.push(
          <span
            style={{ backgroundColor: "grey" }}
            onClick={() => onClick(noOfPages)}
          >
            {noOfPages}
          </span>
        );
      } else {
        pageNumbers.push(
          <span onClick={() => onClick(noOfPages)}>{noOfPages}</span>
        );
      }
    }
  }
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {pageNumbers}
    </div>
  );
};

let myVar;
export function ScrollingClicked() {
  console.log("scroll called");
  if (document.getElementById("autoScroll").checked) {
    clearInterval(myVar);
    console.log("is checked");
    clearInterval(myVar);
    myVar = setInterval(scrollFunc, 5000);
  } else {
    clearInterval(myVar);
  }
}

function scrollFunc() {
  var t;
  var timer;
  let ctr = 0;
  console.log("scrolly");
  var info = t.pageNumber.info();
  if (ctr < info.pages - 1) {
    t.page("next").draw("page");
    ctr = ctr + 1;
  } else {
    t.page("first").draw("page");
    StatusPage();
    ctr = 0;
  }
  timer = 5000;
}

export default Table;
