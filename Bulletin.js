import React, { useState, useEffect } from "react";
import { lien_read, isEmpty, lien_create, isEmptyNumber } from "../Static/lien";
import Axios from "axios";
import { useSelector } from "react-redux";
import { People } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import drapeau from "../Static/images/drapeau.png";
import armoirie from "../Static/images/armoirie.png";
import NavBar from "../../Component/NavBar/NavBar";
import Sidebar from "../../Component/Sidebar/SideBar";
import protType from "prop-types";
import Grouped from "../Controls/Grouped";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BulletinSeptieme from "./BulletinSeptieme";
import "./Bulletin.css";

const useStyle = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  images: {
    width: "30px",
    heigth: "20px",
    margin: "10px",
  },
  borderFontsize: {
    border: "1px solid black",
    fontWeight: "bold",
    fontSize: "15px",
  },
  fontSizeFontWeighBg: {
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "black",
    border: "1px solid black",
  },
  borderFontsizeColorFontWeight: {
    border: "1px solid black",
    fontSize: "16px",
    color: "red",
    fontWeight: "bold",
  },
}));

function Bulletin() {
  const classes = useStyle();

  const [brancheFound, setBrancheFound] = useState([]);

  const classe = useSelector((state) => state.classe);

  const [coursBranche, setCoursBranche] = useState();
  console.log(coursBranche)

  const [valeure, setValeure] = useState({ auth_Domaine: false });

  const [rows, setRows] = useState();
  const [coursExamenFalse, setCoursExamenFalse] = useState(0);
  const [maximaGeneraux, setMaximaGeneraux] = useState({
    periode: 0,
    examen: 0,
    tot1: 0,
    totalGen: 0,
  });
  const [reste, setReste] = useState(0);
  const periodeFound = useSelector((state) => state.periode);
  const anneeActive = useSelector((state) => state.AnneeActive);

  useEffect(() => {
    if (!isEmpty(brancheFound)) {
      let donnere = 0;
      let examens = 0;
      let total1 = 0;
      let totalgen = 0;
      for (let i = 0; i < brancheFound.length; i++) {
        donnere = donnere + brancheFound[i].total;
        examens = examens + brancheFound[i].total * 2;
        total1 = total1 + brancheFound[i].total * 4;
        totalgen = totalgen + brancheFound[i].total * 8;
      }
      setMaximaGeneraux({
        ...maximaGeneraux,
        periode: donnere,
        examen: examens,
        tot1: total1,
        totalGen: totalgen,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brancheFound]);
  useEffect(() => {
    if (!isEmpty(coursBranche)) {
      let rep = coursBranche.filter((cour) => !cour.validExamen);
      if (!isEmpty(rep)) {
        let val = rep.reduce((acc, cur) => acc.maxima + cur.maxima);
        if (isNaN(val)) {
          setReste(val.maxima);
        } else {
          setReste(val);
        }
      }
      if (isEmpty(rep)) {
        setReste(0);
      }
    }
  }, [coursBranche]);

  const [state, setState] = useState([]);

  const conduite = (donner) => {
    if (donner < 50 && donner > 0) {
      return "AB";
    }
    if (donner > 49 && donner < 70 && donner > 0) {
      return "B";
    }
    if (donner > 0 && donner >= 69) {
      return "TB";
    }
    return "";
  };
  const [drop, setDrop] = useState(false);

  const fonctionId = async () => {
    let data = [];
    setDrop(true);
    for (let i = 0; i < rows.length; i++) {
      const response = await Axios.get(
        `${lien_read}/cotation/${rows[i].codeEleve}`
      );
      data.push(response.data);
    }
    console.log(data);
    if (isEmpty(data[0])) {
      alert("Aucune cotation deja enregistrée");
      setDrop(false);
    } else {
      data.sort(function (a, b) {
        return parseInt(b.value) - parseInt(a.value);
      });
      setState(data);
      setDrop(false);
    }
  };
  const cloturerPeriode = (etat) => {
    let valeur = [];
    let valeurPremier = [];
    let placeEleve = "";
    setDrop(true);

    for (let y = 0; y < etat.length; y++) {
      if (periodeFound[0].periode === "examenPremiere") {
        placeEleve = "totalOne";
        valeurPremier.push({
          codeEleve: etat[y].branche[0]._id,
          place:
            etat[y].branche[0].premiere +
            etat[y].branche[0].deuxieme +
            etat[y].branche[0].examenOne,
        });
      }
      if (periodeFound[0].periode === "fin") {
        placeEleve = "totalGeneral";
        valeurPremier.push({
          place:
            etat[y].branche[0].premiere +
            etat[y].branche[0].deuxieme +
            etat[y].branche[0].examenOne +
            (etat[y].branche[0].troisieme +
              etat[y].branche[0].quatrieme +
              etat[y].branche[0].examenTwo),
          codeEleve: etat[y].branche[0]._id,
        });
      }

      if (periodeFound[0].periode === "troisieme") {
        placeEleve = "troisiemePeriode";
        valeurPremier.push({
          codeEleve: etat[y].branche[0]._id,
          place: etat[y].branche[0].troisieme,
        });
      }
      if (periodeFound[0].periode === "quatrieme") {
        placeEleve = "quatriemePeriode";
        valeurPremier.push({
          codeEleve: etat[y].branche[0]._id,
          place: etat[y].branche[0].quatrieme,
        });
      }
      if (periodeFound[0].periode === "premiere") {
        placeEleve = "premierePeriode";
        valeurPremier.push({
          codeEleve: etat[y].branche[0]._id,
          place: etat[y].branche[0].premiere,
        });
      }
      if (periodeFound[0].periode === "deuxieme") {
        placeEleve = "deuxiemePeriode";
        valeurPremier.push({
          codeEleve: etat[y].branche[0]._id,
          place: etat[y].branche[0].deuxieme,
        });
      }
    }
    valeurPremier.sort(function (a, b) {
      return parseInt(b.place) - parseInt(a.place);
    });

    for (let z = 0; z < valeurPremier.length; z++) {
      valeur.push({
        codeEleve: valeurPremier[z].codeEleve,
        place: `${z + 1}/${valeurPremier.length}`,
      });
    }

    Axios.post(`${lien_create}/cloturePeriode`, {
      valeur,
      periode: placeEleve,
    }).then((response) => {
      if (response) {
      }
    });
    setTimeout(() => {
      setDrop(false);
      window.location.replace("/bulletin");
    }, 3000);
  };

  const columns = [
    {
      field: "nomComplet",
      headerName: "Nom",
      width: 350,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            <People style={{ marginRight: "5px" }} size="large" />
            {params.row.collectionEleve[0].nomComplet}
          </>
        );
      },
    },
    {
      field: "sexe",
      headerName: "Sexe",
      width: 110,
      editable: true,
      renderCell: (params) => {
        return params.row.collectionEleve[0].sexe;
      },
    },
    { field: "codeEleve", headerName: "Matricule", width: 135, editable: true },
    { field: "classe", headerName: "classe", width: 120, editable: true },
  ];

  const calculTotal = (pourcentage) => {
    return pourcentage.toFixed(1);
  };

  const [data, setData] = useState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(`${lien_read}/readUser`, config);

      if (response.data.authorization === false) {
        localStorage.removeItem("token");
        window.location.replace("/");
      }

      setData(response.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEmpty(valeure)) {
      Axios.get(`${lien_read}/bulletin/${valeure.codeClasse}`).then(
        (response) => {
          if (response) {
            setBrancheFound(response.data.branche);
            setCoursBranche(response.data.donner);
            setCoursExamenFalse(response.data.coursFalseExamen);
          }
        }
      );

      Axios.get(`${lien_read}/eleveId/${valeure.codeClasse}`).then(
        (response) => {
          setRows(response.data);
        }
      );
    }
  }, [valeure]);

  return (
    <>
      {data ? (
        <>
          <NavBar donner={data.fonction} />
          <Sidebar donner={data.fonction} />
          <div
            className="container"
            style={{ marginLeft: "15%", paddingRight: "10%" }}
          >
            <div className="containerBulletin">
              {!isEmpty(classe) && (
                <div style={{ marginTop: "12px" }}>
                  <Grouped
                    style={{ width: "100%", marginTop: "20px" }}
                    optionss={classe}
                    value={valeure}
                    setValue={setValeure}
                    labelProps="Selectionner la classe la classe"
                  />
                </div>
              )}
              {!isEmpty(rows) && (
                <div
                  style={{
                    height: 500,
                    width: "100%",
                    marginTop: "12px",
                    display: "flex",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                    checkboxSelection
                    disableSelectionOnClick
                  />
                  <button
                    className="btn"
                    onClick={window.print}
                    style={{
                      width: "15%",
                      marginTop: "20px",
                      marginLeft: "20px",
                    }}
                  >
                    Print (2)
                  </button>
                  {!isEmpty(state) && (
                    <button
                      className="btn"
                      onClick={() => cloturerPeriode(state)}
                      style={{
                        width: "15%",
                        marginTop: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      Attribution de places
                    </button>
                  )}
                </div>
              )}
              <div>
                {!valeure.auth_Domaine && (
                  <button
                    className="btn btn-success"
                    onClick={() => fonctionId()}
                    style={{
                      width: "30%",
                      marginTop: "20px",
                      marginRight: "20px",
                    }}
                  >
                    Download data (1)
                  </button>
                )}
              </div>
            </div>

            {/*Bulletin*/}

            <div className="containerPrint">
              {drop ? (
                <Backdrop open={drop} className={classes.backdrop}>
                  <CircularProgress />
                </Backdrop>
              ) : !isEmpty(state[0]) && !valeure.auth_Domaine ? (
                state.map((items, cle) => {
                  console.log(typeof items.sessions);
                  return (
                    !isEmpty(items) && (
                      <div className="divtabl" key={cle}>
                        {items.data[0].collectionEleve[0].nomComplet !== "" && (
                          <table className="divtabl">
                            <thead>
                              <tr
                                style={{
                                  border: "1px solid black",
                                  height: "0px",
                                }}
                              >
                                <td colSpan="3" className="armoirieImage">
                                  <img
                                    src={drapeau}
                                    alt="drapeau"
                                    className={classes.images}
                                  />
                                </td>
                                <td colSpan="11" className="armoirieImage">
                                  <h5 style={{ textAlign: "center" }}>
                                    REPUBLIQUE DEMOCRATIQUE DU CONGO
                                  </h5>
                                  <h5 style={{ textAlign: "center" }}>
                                    MINISTERE DE L'ENSEIGNEMENT PRIMAIRE,
                                    SECONDAIRE ET TECHNIQUE
                                  </h5>
                                </td>
                                <td colSpan="3" className="armoirieImage">
                                  <img
                                    src={armoirie}
                                    alt="Armoirie"
                                    className={classes.images}
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    height: "0px",
                                    paddingLeft: "3px",
                                  }}
                                  colSpan="17"
                                >
                                  <h6>PROVINCE : NORD-KIVU</h6>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    height: "0px",
                                    paddingLeft: "5px",
                                  }}
                                  colSpan="9"
                                >
                                  <h6>ECOLE : COMPLEXE SCOLAIRE PINSON </h6>
                                  <h6>VILLE : GOMA </h6>
                                  <h6>COMMUNE : KARISIMBI </h6>
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    height: "0px",
                                    paddingLeft: "5px",
                                  }}
                                  colSpan="8"
                                >
                                  <h6>
                                    ELEVE :{" "}
                                    {
                                      items.data[0].collectionEleve[0]
                                        .nomComplet
                                    }{" "}
                                    <p
                                      style={{
                                        float: "right",
                                        marginRight: "12px",
                                      }}
                                    >
                                      SEXE :{" "}
                                      {items.data[0].collectionEleve[0].sexe ===
                                      "Masculin"
                                        ? "M"
                                        : "F"}
                                    </p>
                                  </h6>
                                  <h6>
                                    NE (E) A :{" "}
                                    {!isEmpty(
                                      items.data[0].collectionEleve[0]
                                        .lieuNaissance
                                    )
                                      ? `${items.data[0].collectionEleve[0].lieuNaissance}`
                                      : "...................................."}
                                    , le{" "}
                                    {!isEmpty(
                                      items.data[0].collectionEleve[0].dateNaiss
                                    )
                                      ? `${new Date(
                                          items.data[0].collectionEleve[0].dateNaiss
                                        ).toLocaleDateString()}`
                                      : "........./........../....................."}
                                  </h6>
                                  {/* <h6>CLASSE : {valeure}</h6> */}
                                  <h6>
                                    CLASSE : {valeure.classe}
                                    <sup>
                                      {valeure.classe > 1 ? "eme" : "ere"}
                                    </sup>
                                  </h6>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    height: "0px",
                                    paddingLeft: "3px",
                                  }}
                                  colSpan="17"
                                >
                                  <span style={{ fontSize: "14px" }}>
                                    BULLETIN DE LA {valeure.classe}
                                    <sup>
                                      {valeure.classe > 1 ? "eme" : "ere"}
                                    </sup>
                                    {` ${valeure.title}`}{" "}
                                    <span style={{ float: "right" }}>
                                      ANNEE SCOLAIRE 2022 - 2023{" "}
                                      {!isEmpty(anneeActive) &&
                                        anneeActive[0].annee}
                                    </span>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    height: "0px",
                                    textAlign: "center",
                                    fontSize: "24px",
                                    fontWeight: "bolder",
                                  }}
                                  colSpan="5"
                                  rowSpan="3"
                                >
                                  BRANCHE
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    width: "12rem",
                                    fontSize: "15px",
                                  }}
                                  colSpan="4"
                                >
                                  PREMIER SEMESTRE
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    width: "12rem",
                                    fontSize: "15px",
                                  }}
                                  colSpan="4"
                                >
                                  SECOND SEMESTRE
                                </td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    width: "4rem",
                                  }}
                                  rowSpan="3"
                                >
                                  T.G
                                </td>
                                <td id="fontBlack" rowSpan="3"></td>
                                <td
                                  style={{
                                    border: "1px solid black",
                                    fontSize: "15px",
                                    width: "20px",
                                  }}
                                  rowSpan="2"
                                  colSpan="2"
                                >
                                  EXAMEN DE <br />
                                  REPECHAGE
                                </td>
                              </tr>
                              <tr>
                                <td
                                  className={`${classes.borderFontsize} travaux`}
                                  colSpan="2"
                                >
                                  TRAVAUX JOURNAL
                                </td>
                                <td
                                  className={`${classes.borderFontsize} font`}
                                  rowSpan="2"
                                >
                                  EXAM
                                </td>
                                <td
                                  className={classes.borderFontsize}
                                  rowSpan="2"
                                >
                                  TOT
                                </td>
                                <td
                                  className={`${classes.borderFontsize} travaux`}
                                  colSpan="2"
                                >
                                  TRAVAUX JOURNAL
                                </td>
                                <td
                                  className={classes.borderFontsize}
                                  rowSpan="2"
                                >
                                  EXAM
                                </td>
                                <td
                                  className={classes.borderFontsize}
                                  rowSpan="2"
                                >
                                  TOT
                                </td>
                              </tr>
                              <tr>
                                <td className={classes.borderFontsize}>
                                  1<sup>e</sup> P
                                </td>
                                <td className={classes.borderFontsize}>
                                  2<sup>e</sup> P
                                </td>
                                <td className={classes.borderFontsize}>
                                  3<sup>e</sup> P
                                </td>
                                <td className={classes.borderFontsize}>
                                  4<sup>e</sup> P
                                </td>
                                <td className={classes.borderFontsize}>%</td>
                                <td className={classes.borderFontsize}>
                                  <p style={{ fontSize: "10px" }}>SIGN. PROF</p>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {brancheFound.map((index, key1) => {
                                return (
                                  <React.Fragment key={key1}>
                                    <tr
                                      className="rowTable"
                                      style={{ backgroundColor: "#dedede" }}
                                    >
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                        colSpan="5"
                                      >
                                        MAXIMA
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {index._id}
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {index._id}
                                      </td>
                                      <td
                                        style={{
                                          border: "1px solid black",
                                          fontSize: "15px",
                                          fontWeight: "bold",
                                          backgroundColor: `${
                                            coursExamenFalse === index._id &&
                                            "black"
                                          }`,
                                        }}
                                        className="donner"
                                      >
                                        {index._id * 2}
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {coursExamenFalse === index._id
                                          ? index._id * 4 - reste * 2
                                          : index._id * 4}
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {index._id}
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {index._id}
                                      </td>
                                      <td
                                        style={{
                                          backgroundColor: `${
                                            coursExamenFalse === index._id &&
                                            "black"
                                          }`,
                                        }}
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {index._id * 2}
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {coursExamenFalse === index._id
                                          ? index._id * 4 - reste * 2
                                          : index._id * 4}
                                      </td>
                                      <td
                                        className={`${classes.borderFontsize} donner`}
                                      >
                                        {coursExamenFalse === index._id
                                          ? index._id * 8 - reste * 4
                                          : index._id * 8}
                                      </td>
                                      <td
                                        className={classes.fontSizeFontWeighBg}
                                        id="fontBlack"
                                      ></td>
                                      <td
                                        className={classes.fontSizeFontWeighBg}
                                        id="fontBlack"
                                      ></td>
                                      <td
                                        className={`${classes.fontSizeFontWeighBg} donner`}
                                      ></td>
                                    </tr>
                                    {coursBranche.map((cours, key2) => {
                                      return (
                                        <React.Fragment key={key2}>
                                          {cours.maxima === index._id && (
                                            <>
                                              <tr className="rowTable">
                                                <td
                                                  className={`${classes.borderFontsize} donner`}
                                                  colSpan="5"
                                                >
                                                  {cours.branche}
                                                </td>

                                                {items.data.map(
                                                  (indexDonner, code) => {
                                                    return (
                                                      <React.Fragment
                                                        key={code}
                                                      >
                                                        {cours.branche ===
                                                          indexDonner
                                                            .collectionCours[0]
                                                            .branche && (
                                                          <>
                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {indexDonner.premierePeriode ===
                                                              0 ? (
                                                                ""
                                                              ) : (
                                                                <>
                                                                  {
                                                                    indexDonner.premierePeriode
                                                                  }
                                                                </>
                                                              )}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {indexDonner.deuxiemePeriode ===
                                                              0 ? (
                                                                ""
                                                              ) : (
                                                                <>
                                                                  {" "}
                                                                  {
                                                                    indexDonner.deuxiemePeriode
                                                                  }
                                                                </>
                                                              )}
                                                            </td>

                                                            <td
                                                              style={{
                                                                backgroundColor: `${
                                                                  !indexDonner
                                                                    .collectionCours[0]
                                                                    .validExamen
                                                                    ? "black"
                                                                    : "white"
                                                                }`,
                                                              }}
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {!indexDonner
                                                                .collectionCours[0]
                                                                .validExamen
                                                                ? ""
                                                                : indexDonner.examenOne ===
                                                                  0
                                                                ? ""
                                                                : indexDonner.examenOne}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {parseInt(
                                                                indexDonner.premierePeriode
                                                              ) === 0 ||
                                                              parseInt(
                                                                indexDonner.deuxiemePeriode
                                                              ) === 0
                                                                ? ""
                                                                : parseInt(
                                                                    indexDonner.premierePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.deuxiemePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.examenOne
                                                                  )}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {indexDonner.troisiemePeriode ===
                                                              0 ? (
                                                                ""
                                                              ) : (
                                                                <>
                                                                  {
                                                                    indexDonner.troisiemePeriode
                                                                  }
                                                                </>
                                                              )}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {indexDonner.quatriemePeriode ===
                                                              0 ? (
                                                                ""
                                                              ) : (
                                                                <>
                                                                  {
                                                                    indexDonner.quatriemePeriode
                                                                  }
                                                                </>
                                                              )}
                                                            </td>

                                                            <td
                                                              style={{
                                                                backgroundColor: `${
                                                                  !indexDonner
                                                                    .collectionCours[0]
                                                                    .validExamen
                                                                    ? "black"
                                                                    : "white"
                                                                }`,
                                                              }}
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {!indexDonner
                                                                .collectionCours[0]
                                                                .validExamen
                                                                ? ""
                                                                : indexDonner.examenTwo ===
                                                                  0
                                                                ? ""
                                                                : indexDonner.examenTwo}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {isEmptyNumber(
                                                                indexDonner.troisiemePeriode
                                                              ) ||
                                                              isEmptyNumber(
                                                                indexDonner.quatriemePeriode
                                                              )
                                                                ? ""
                                                                : parseInt(
                                                                    indexDonner.troisiemePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.quatriemePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.examenTwo
                                                                  )}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {isEmptyNumber(
                                                                indexDonner.premierePeriode
                                                              ) ||
                                                              isEmptyNumber(
                                                                indexDonner.deuxiemePeriode
                                                              ) ||
                                                              isEmptyNumber(
                                                                indexDonner.troisiemePeriode
                                                              ) ||
                                                              isEmptyNumber(
                                                                indexDonner.quatriemePeriode
                                                              )
                                                                ? ""
                                                                : parseInt(
                                                                    indexDonner.premierePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.deuxiemePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.examenOne
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.troisiemePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.quatriemePeriode
                                                                  ) +
                                                                  parseInt(
                                                                    indexDonner.examenTwo
                                                                  )}
                                                            </td>

                                                            <td
                                                              className={
                                                                classes.fontSizeFontWeighBg
                                                              }
                                                              id="fontBlack"
                                                            ></td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            >
                                                              {!isEmpty(
                                                                items.sessions
                                                              ) &&
                                                                (items.sessions.filter(
                                                                  (x) =>
                                                                    x.idCours ===
                                                                    cours.idCours
                                                                )[0]
                                                                  ? items.sessions.filter(
                                                                      (x) =>
                                                                        x.idCours ===
                                                                        cours.idCours
                                                                    )[0]
                                                                      .pourcentage +
                                                                    "%"
                                                                  : "")}
                                                            </td>

                                                            <td
                                                              className={`${classes.borderFontsize} donner`}
                                                            ></td>
                                                          </>
                                                        )}
                                                      </React.Fragment>
                                                    );
                                                  }
                                                )}
                                              </tr>
                                            </>
                                          )}
                                        </React.Fragment>
                                      );
                                    })}

                                    {brancheFound.length - 1 === key1 && (
                                      <>
                                        <tr
                                          style={{ backgroundColor: "#dedede" }}
                                        >
                                          <td
                                            style={{
                                              border: "1px solid  black",
                                              fontSize: "20px",
                                              fontWeight: "bold",
                                            }}
                                            className="donner"
                                            colSpan="5"
                                          >
                                            MAXIMA GENERAUX
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.periode}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.periode}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.examen - reste * 2}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.tot1 - reste * 2}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.periode}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.periode}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.examen - reste * 2}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.tot1 - reste * 2}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsizeColorFontWeight} donner`}
                                          >
                                            {maximaGeneraux.totalGen -
                                              reste * 4}
                                          </td>
                                          <td
                                            style={{
                                              fontSize: "16px",
                                              color: "red",
                                              fontWeight: "bold",
                                              backgroundColor: "black",
                                            }}
                                            className="donner"
                                          ></td>
                                          <td
                                            style={{
                                              border: "1px solid black",
                                              fontSize: "16px",
                                              fontWeight: "bold",
                                              backgroundColor: "white",
                                            }}
                                            className="donner"
                                            rowSpan="7"
                                            colSpan="2"
                                          >
                                            <p>Passe(1)</p>
                                            <p>Double(1)</p>
                                            <p>A échoué(1)</p>
                                            <p>Le...../.../....</p>
                                            <p>Le Chef d'Etablis</p>
                                            <p>Sceau de l'école</p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="5"
                                          >
                                            TOTAUX
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].premiere === 0
                                              ? ""
                                              : items.branche[0].premiere}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].deuxieme === 0
                                              ? ""
                                              : items.branche[0].deuxieme}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].examenOne === 0
                                              ? ""
                                              : items.branche[0].examenOne}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].premiere === 0 ||
                                            items.branche[0].deuxieme === 0 ||
                                            items.branche[0].examenOne === 0
                                              ? ""
                                              : items.branche[0].premiere +
                                                items.branche[0].deuxieme +
                                                items.branche[0].examenOne}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].troisieme === 0
                                              ? ""
                                              : items.branche[0].troisieme}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].quatrieme === 0
                                              ? ""
                                              : items.branche[0].quatrieme}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].examenTwo === 0
                                              ? ""
                                              : items.branche[0].examenTwo}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].troisieme === 0 ||
                                            items.branche[0].quatrieme === 0 ||
                                            items.branche[0].examenTwo === 0
                                              ? ""
                                              : items.branche[0].troisieme +
                                                items.branche[0].quatrieme +
                                                items.branche[0].examenTwo}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].premiere === 0 ||
                                            items.branche[0].deuxieme === 0 ||
                                            items.branche[0].examenOne === 0 ||
                                            items.branche[0].troisieme === 0 ||
                                            items.branche[0].quatrieme === 0 ||
                                            items.branche[0].examenTwo === 0
                                              ? ""
                                              : items.branche[0].premiere +
                                                items.branche[0].deuxieme +
                                                items.branche[0].examenOne +
                                                (items.branche[0].troisieme +
                                                  items.branche[0].quatrieme +
                                                  items.branche[0].examenTwo)}
                                          </td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="5"
                                          >
                                            POURCENTAGE
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].premiere === 0
                                              ? ""
                                              : calculTotal(
                                                  (items.branche[0].premiere *
                                                    100) /
                                                    maximaGeneraux.periode,
                                                  items.data[0]
                                                    .collectionEleve[0]
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].deuxieme === 0
                                              ? ""
                                              : calculTotal(
                                                  (items.branche[0].deuxieme *
                                                    100) /
                                                    maximaGeneraux.periode
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].examenOne === 0
                                              ? ""
                                              : calculTotal(
                                                  (items.branche[0].examenOne *
                                                    100) /
                                                    (maximaGeneraux.examen -
                                                      reste * 2),
                                                  items.data[0]
                                                    .collectionEleve[0]
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].premiere === 0 ||
                                            items.branche[0].deuxieme === 0 ||
                                            items.branche[0].examenOne === 0
                                              ? ""
                                              : calculTotal(
                                                  ((items.branche[0].premiere +
                                                    items.branche[0].deuxieme +
                                                    items.branche[0]
                                                      .examenOne) *
                                                    100) /
                                                    (maximaGeneraux.tot1 -
                                                      reste * 2),
                                                  items.data[0]
                                                    .collectionEleve[0]
                                                    .nomComplet,
                                                  "examenOne"
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].troisieme === 0
                                              ? ""
                                              : calculTotal(
                                                  (items.branche[0].troisieme *
                                                    100) /
                                                    maximaGeneraux.periode
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].quatrieme === 0
                                              ? ""
                                              : calculTotal(
                                                  (items.branche[0].quatrieme *
                                                    100) /
                                                    maximaGeneraux.periode
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].examenTwo === 0
                                              ? ""
                                              : calculTotal(
                                                  (items.branche[0].examenTwo *
                                                    100) /
                                                    (maximaGeneraux.examen -
                                                      reste * 2)
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].troisieme === 0 ||
                                            items.branche[0].quatrieme === 0 ||
                                            items.branche[0].examenTwo === 0
                                              ? ""
                                              : calculTotal(
                                                  ((items.branche[0].troisieme +
                                                    items.branche[0].quatrieme +
                                                    items.branche[0]
                                                      .examenTwo) *
                                                    100) /
                                                    (maximaGeneraux.tot1 -
                                                      reste * 2),
                                                  items.data[0]
                                                    .collectionEleve[0]
                                                ) + "%"}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {items.branche[0].premiere === 0 ||
                                            items.branche[0].deuxieme === 0 ||
                                            items.branche[0].examenOne === 0 ||
                                            items.branche[0].troisieme === 0 ||
                                            items.branche[0].quatrieme === 0 ||
                                            items.branche[0].examenTwo === 0
                                              ? ""
                                              : calculTotal(
                                                  ((items.branche[0].premiere +
                                                    items.branche[0].deuxieme +
                                                    items.branche[0].examenOne +
                                                    (items.branche[0]
                                                      .troisieme +
                                                      items.branche[0]
                                                        .quatrieme +
                                                      items.branche[0]
                                                        .examenTwo)) *
                                                    100) /
                                                    (maximaGeneraux.totalGen -
                                                      reste * 4)
                                                ) + " %"}
                                          </td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="5"
                                          >
                                            PLACE/NBRE ELEVES
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {!isEmpty(items.place) &&
                                              items.place.premierePeriode}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {!isEmpty(items.place) &&
                                              items.place.totalOne}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {!isEmpty(items.place) &&
                                              items.place.troisiemePeriode}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {!isEmpty(items.place) &&
                                              items.place.totalGeneral}
                                          </td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="5"
                                          >
                                            APPLICATION
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {conduite(
                                              (items.branche[0].premiere *
                                                100) /
                                                maximaGeneraux.periode
                                            )}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {conduite(
                                              (items.branche[0].deuxieme *
                                                100) /
                                                maximaGeneraux.periode
                                            )}
                                          </td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {conduite(
                                              (items.branche[0].troisieme *
                                                100) /
                                                maximaGeneraux.periode
                                            )}
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          >
                                            {conduite(
                                              (items.branche[0].quatrieme *
                                                100) /
                                                maximaGeneraux.periode
                                            )}
                                          </td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="5"
                                          >
                                            CONDUITE
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                          <td
                                            className={`${classes.fontSizeFontWeighBg} donner`}
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              border: "1px solid black",
                                              fontSize: "12px",
                                              fontWeight: "bold",
                                            }}
                                            className="donner"
                                            colSpan="5"
                                          >
                                            SIGNATURE DU RESP
                                          </td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="4"
                                          ></td>
                                          <td
                                            className={`${classes.borderFontsize} donner`}
                                            colSpan="6"
                                          ></td>
                                        </tr>
                                        <tr>
                                          <td
                                            style={{
                                              border: "1px solid black",
                                              fontSize: "12px",
                                              fontWeight: "bold",
                                            }}
                                            className="donner"
                                            colSpan="17"
                                          >
                                            -L'élève ne pourra passer dans la
                                            classe supérieure s'il n'a subi avec
                                            succès un examen de repêchage en
                                            {!isEmpty(items.sessions) ? items.sessions.map(sess=>{
                                              
                                              return <span>{' '+coursBranche.filter(cr=>cr.idCours === sess.idCours)[0].branche+", "}</span>
                                            }) : "............................................................................................"}
                                            
                                            <br />
                                            - L'élève passe dans la classe
                                            supérieure(1)
                                            <br />
                                            - L'élève double la classe(1)
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Fait à ........,
                                            le......./...../2022
                                            <br />
                                            - L'élève a échoué et est à
                                            réorienter vers
                                            ............................................(1)
                                            <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signature
                                            de l'élève
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Sceau de l'école
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            Le chef d'établissement <br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          </td>
                                        </tr>
                                      </>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </tbody>
                            <tfoot></tfoot>
                          </table>
                        )}
                      </div>
                    )
                  );
                })
              ) : (
                valeure.auth_Domaine && (
                  <BulletinSeptieme valeur={valeure} eleve={rows} />
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="loader">
          <div></div>
        </div>
      )}
    </>
  );
}

Bulletin.protType = {
  brancheFound: protType.array.isRequired,
  state: protType.array.isRequired,
};
export default Bulletin;
