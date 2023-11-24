import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { lien } from "../../static/Lien";
import DirectionSnackbar from "../../Control/SnackBar";
import _ from "lodash";
// components
// import Iconify from '../../assets/Bboxx.png';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [initial, setInitial] = useState();
  const [loading, setLoading] = useState(false);

  const send = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(lien + "/login", initial)
      .then((response) => {
        if (!_.isEmpty(response.data.codeAgent)) {
          localStorage.setItem("bboxxSupprtNom", response.data.nom);
          localStorage.setItem("bboxxSupprtCode", response.data.codeAgent);
          localStorage.setItem("bboxxSupprtZone", response.data.zones);

          navigate("/", { replace: true });
        } else {
          setMessage(JSON.stringify(response.data));
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.message) {
          setMessage(err.message);
          setOpen(true);
          setLoading(false);
        }
      });
  };
  return (
    <>
      {open && (
        <DirectionSnackbar open={open} setOpen={setOpen} message={message} />
      )}
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Username"
          onChange={(e) => {
            setInitial({
              ...initial,
              username: e.target.value,
            });
          }}
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => {
            setInitial({
              ...initial,
              password: e.target.value,
              identifiant :"admin"
            });
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {/* <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        disabled={loading}
        onClick={(e) => send(e)}
        fullWidth
        size="large"
        type="submit"
        sx={{ my: 2 }}
        variant="contained"
      >
        Login
      </LoadingButton>
    </>
  );
}
