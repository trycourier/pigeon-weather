import React from "react";
import { Card, Image, Statistic, Table, Grid } from "semantic-ui-react";

const WeatherWidget = ({ weather }) => {
  const { city, temp, conditions = {} } = weather;
  return (
    <Card>
      <Card.Content textAlign="center">
        <Card.Header>
          <Image
            src={conditions.image}
            wrapped
            ui={false}
            size="mini"
          />
          {city}
        </Card.Header>
        <Card.Meta>
          {conditions.description
            .split(" ")
            .map(i => {
              return i.charAt(0).toUpperCase() + i.slice(1);
            })
            .join(" ")}
        </Card.Meta>
        <Card.Description>
          <Statistic size="small">
            <Statistic.Value>
              {Math.round(temp.current)}° {temp.scale}
            </Statistic.Value>
            <Statistic.Label>
              Feels {Math.round(temp.feels_like)}° {temp.scale}
            </Statistic.Label>
            <Statistic.Label>
              Hi {Math.round(temp.high)}° {temp.scale} / Lo{" "}
              {Math.round(temp.low)}° {temp.scale}
            </Statistic.Label>
          </Statistic>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default WeatherWidget;
