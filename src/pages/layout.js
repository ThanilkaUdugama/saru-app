import { ThemeProvider, useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { jwtDecode } from "jwt-decode";
import * as React from "react";
import { Logo } from "../components/logo";
import { requestWrapper, signOut } from "../fns";
import { getRoute } from "../routes";
import { dashboard_redirect } from "./login";

const darkTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  palette: {
    primary: {
      main: "#90caf9",
    },

    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#000",
      container: "#0d0d0d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },

    border: {
      color: "#333333",
    },

    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 1000,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

const lightTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  palette: {
    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fcfafd",
      paper: "#fff",
      container: "#fff",
    },
    text: {
      primary: "#000000",
      secondary: "#4f4f4f",
    },

    border: {
      color: "#e0e0e0",
    },

    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 1000,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Content({
  pathname,
  paths = {},
  width,
  user,
  setPathName,
  setSession,
}) {
  const theme = useTheme();

  const chosenTheme = theme.palette.mode == "light" ? lightTheme : darkTheme;

  const token = localStorage.getItem("accessToken");
  const view = token ? jwtDecode(token)["type"] : -1;

  return (
    <ThemeProvider theme={chosenTheme}>
      <div className="w-[99.9vw] overflow-y-scroll overflow-x-hidden">
        <Box
          sx={{
            px: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "99vw",
            background: chosenTheme.palette.background.default,
            paddingTop: "2rem",
          }}
        >
          {Object.keys(paths).includes(pathname) ? (
            paths[pathname].element(setPathName, view, setSession)
          ) : (
            <div></div>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
}

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },

  palette: {
    container: {
      main: "#1976d2", // Custom primary color
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#1976d2", // Blue (Light mode primary)
        },
        logo: {
          p: "#ff0000",
        },
        secondary: {
          main: "#f50057", // Pink (Light mode secondary)
        },
        background: {
          default: "#ffffff",
          paper: "#f5f5f5",
        },
        text: {
          primary: "#000000",
          secondary: "#4f4f4f",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#90caf9", // Light blue (Dark mode primary)
        },
        logo: {
          p: "#ff0000",
        },
        secondary: {
          main: "#f48fb1", // Light pink (Dark mode secondary)
        },
        background: {
          default: "#121212",
          paper: "#000000",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b0bec5",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 10000,
      md: 10000,
      lg: 12000,
      xl: 15360,
    },
  },
});

function Layout() {
  const [pathname, setPathName] = React.useState("/");
  const token = localStorage.getItem("accessToken");
  const user = token ? jwtDecode(token)["type"] : -1;
  const [width, setWidth] = React.useState(
    window.innerWidth < 1000 ? "100vw" : "75vw"
  );
  const [session, setSession] = React.useState({});

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setPathName("/login/");
      },
      signOut: () => {
        signOut(setPathName);
      },
    };
  }, []);

  React.useEffect(() => {
    setState(getRoute());
  }, [session]);

  React.useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile)
      setSession({
        user: {
          ...profile,
          image: `${process.env.REACT_APP_API}/media/${profile.imageUrl}`,
        },
      });
    else setSession({});
  }, [pathname]);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        if (path != "/")
          path.includes("/signout")
            ? signOut(setPathName)
            : requestWrapper(() => setPathName(String(path), setPathName));
      },
    };
  }, []);

  React.useEffect(() => setPathName(dashboard_redirect(user)), []);

  const changeWidth = (button) => {
    setWidth(button.ariaLabel == "Expand navigation menu" ? "75vw" : "90vw");
  };

  const [state, setState] = React.useState(getRoute());
  React.useEffect(() => {
    const button = document.querySelector(".css-7lxqh button");
    console.log(button);
    if (button && window.innerWidth >= 1000) {
      button.addEventListener("click", () => changeWidth(button));
      setWidth(button.ariaLabel == "Expand navigation menu" ? "90vw" : "75vw");
    } else {
      setWidth("100vw");
    }
  }, [pathname]);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      router={router}
      theme={demoTheme}
      navigation={state[0]}
      branding={{
        logo: (
          <div className="h-[100%] flex items-center">
            <Logo size={"1.2rem"} />
          </div>
        ),
        title: "",
      }}
    >
      <DashboardLayout
        slotProps={{
          signInButton: {
            variant: "contained",
            color: "primary",
            style: {
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "10px 20px",
            },

            onClick: () => {
              console.log("Sign In Button Clicked");
            },
          },
        }}
        hideNavigation={pathname ? pathname.includes("login") : false}
        defaultSidebarCollapsed={true}
      >
        <Content
          pathname={pathname}
          setSession={setSession}
          user={user}
          width={"100vw"}
          paths={state[1]}
          setPathName={setPathName}
        />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;
