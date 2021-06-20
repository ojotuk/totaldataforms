import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExportCSV from "../../../ExcelDownloader";
//

const ReactTable = ({ forms }) => {
  const [data, setData] = useState(forms);

  function downloadCSV(array) {
    const csvdata = [];
    array.forEach((item) => {
      let user = {
        Fullname: item.Fullname,
        Position: item["Position"],
        "Date of Employment": item["Date of Employment"],
        "Phone Number": item["Phone Number"],
        Address: item["Address"],
        Signature:item["Signature"] ? "Yes" : "No"
      };
      csvdata.push(user);
    });
    return csvdata;
  }
  const today = new Date();
  const filename = `${today.toLocaleDateString()} commitment form`;

  const actionsMemo = React.useMemo(
    () => <ExportCSV csvData={downloadCSV(data)} fileName={filename} />,
    [data,filename]
  );

  //

  useEffect(() => {
    // console.log(forms);
    setData(forms);
  }, [forms]);

  
  const columns = React.useMemo(
    () => [
      {
        name: "Name",
        // selector: 'productName',
        sortable: true,
        cell: (row) => (
          <div className="d-flex align-items-center">{row.Fullname}</div>
        ),
      },
      {
        name: "Designation",
        selector: "Position",
        sortable: true,
      },
      {
        name: "Phone Number",
        selector: "Phone Number",
        sortable: true,
      },
      {
        name: "Date Joined",
        selector: `Date of Employment`,
        sortable: true,
      },
      {
        name: "",
        button: true,
        cell: (row) => (
          <Link to={`/application/commitment/user/${row._id}`}>view</Link>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="mt-4">
        <div>
          <DataTable
            title="Commitment Form"
            columns={columns}
            data={data}
            //   defaultSortField="title"
            sortable
            sortIcon={<i className="fa fa-arrow-down"></i>}
            responsive
            // onRowClicked={(row)=>handleRowClick(row)}
            highlightOnHover
            striped
            pagination
            actions={actionsMemo}
          />
        </div>
      </div>
    </>
  );
};

export default ReactTable;
