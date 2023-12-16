import React from "react";
import * as xlsx from "xlsx";
import { Alert, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { lien } from "../static/Lien";
import { useSelector } from "react-redux";
// import DirectionSnackbar from "../static/SnackBar";

function Parametre() {
  const [excelData, setExcelData] = React.useState();
  const [excelFile, setExcelFile] = React.useState(null);
  const [excelFileError, setExcelFileError] = React.useState(null);
  // const [openSnack, setOpenSnack] = React.useState(false);
  // const [messageSnack, setmessageSnack] = React.useState("");

  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        (selectedFile && fileType[0].includes(selectedFile.type)) ||
        (selectedFile && fileType[1].includes(selectedFile.type))
      ) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Veuillez selectionner uniquement le fichier Excel");
        setExcelFile(null);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = xlsx.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  };
 
  const columns = [
    {
      field: "customer",
      headerName: "Customer",
      width: 180,
      editable: false,
    },
    {
      field: "customer_cu",
      headerName: "CUSTOMER CU",
      width: 200,
      editable: false,
    },
    {
      field: "region",
      headerName: "Region",
      width: 200,
      editable: false,
    },
    {
      field: "shop",
      headerName: "SHOP",
      width: 200,
      editable: false,
    },
  ];

  const dataParams = useSelector((state) => state.parametre);

  const sendData = () => {
   
    axios
      .post(lien + "/paramatre", { data: excelData })
      .then((response) => {
        setExcelFileError(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  

 

  return (
    <div>
      {/* {openSnack && (
        <DirectionSnackbar
          message={messageSnack}
          open={openSnack}
          setOpen={setOpenSnack}
        />
      )} */}

      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
        {excelFileError && (
          <div className="mb-4">
            <Alert severity="warning" variant="standard">
              {excelFileError && excelFileError}
            </Alert>
          </div>
        )}
        <div className="row mb-3">
          <div className="col-lg-7">
            <input
              type="file"
              className="form-control"
              required
              accept=".xls, .xlsx"
              onChange={handleFile}
            />
          </div>
          <div className="col-lg-5">
            <button type="submit" className="btn btn-success mr-2">
              Submit
            </button>

            <Button
              color="primary"
              variant="contained"
              onClick={() => sendData()}
            >
              <span style={{ marginLeft: "10px" }}>Envoyer</span>
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {dataParams.parametre && (
              <DataGrid
                rows={dataParams.parametre}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 7,
                    },
                  },
                }}
                pageSizeOptions={[7]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            )}
          </div>
          
        </div>
      </form>
     
    </div>
  );
}

export default Parametre;
