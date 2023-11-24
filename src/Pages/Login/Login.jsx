import { styled } from "@mui/material/styles";
import { Container, Typography, Divider, Paper } from "@mui/material";
// import Logo from "./bboxx.png";
import LoginForm from "./LoginForm.jsx";
import "./style.css";
import Logo from "/bboxx.png"
// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <Paper>
      <StyledRoot>
        <StyledSection>
         
            <div style={{display:'flex', alignContent:'center', justifyContent:"center"}}>
            <Paper elevation={0}>
            <img src={Logo} alt="login" />
            </Paper>
            </div>
          
        </StyledSection>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Login to support team
            </Typography>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </Paper>
  );
}
