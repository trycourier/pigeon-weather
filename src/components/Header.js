import React from "react";
import { Header as SUIHeader } from "semantic-ui-react";

const Header = () => (
  <SUIHeader as="h1" textAlign="center">
    <SUIHeader.Content>
      <em data-emoji="bird"></em> <span>Pigeon Weather</span>
      <SUIHeader.Subheader>Built using Courier and OpenWeather</SUIHeader.Subheader>
    </SUIHeader.Content>
  </SUIHeader>
);

export default Header;