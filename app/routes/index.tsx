import InputSwitcher from "~/components/InputSwitcher";
import type { LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";
import ReactGA from "react-ga";
import { useEffect } from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  const setGA = () => {
    ReactGA.initialize("UA-220543625-1");
    ReactGA.pageview(window.location.pathname);
  };

  useEffect(() => {
    setGA();
  }, []);

  return (
    <div className="app container">
      <h1>Wordlemoji 😜</h1>
      <InputSwitcher />
    </div>
  );
}
