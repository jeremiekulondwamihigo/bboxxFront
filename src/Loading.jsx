/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loading({ title, taille }) {
  return (
    <div
      style={{
        height: `${taille ? taille : 100}vh`,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <p style={{ textAlign: "center" }}>
          <CircularProgress size={30} color="primary" />
        </p>

        <p style={{ textAlign: "center" }}>{title}</p>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Loading);
