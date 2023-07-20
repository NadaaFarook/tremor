"use client";
import Image from "next/image";
import { Card, Title, AreaChart, Button } from "@tremor/react";
import { data } from "./data";
import { useState } from "react";
import { DateRangePicker } from "@tremor/react";

export default function Home() {
  const [range, setRange] = useState({});

  const dataFormatter = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };
  const filterr = (dataCopy) => {
    if (!range.from || !range.to) {
      return data;
    }
    return dataCopy.filter(
      (item) =>
        new Date(item.date) >= new Date(range.from) &&
        new Date(item.date) <= new Date(range.to)
    );
  };

  const date = new Date();
  const filteredData = filterr(data);
  console.log(filteredData, data, range);
  return (
    <Card>
      <Button
        onClick={() =>
          setRange({
            from: new Date(date.setDate(date.getDate() - 7)),
            to: new Date(),
          })
        }
      >
        1 week
      </Button>
      <Button
        onClick={() => {
          setRange({
            from: new Date(date.setDate(date.getDate() - 30)),
            to: new Date(),
          });
        }}
      >
        1 month
      </Button>
      <Button
        onClick={() =>
          setRange({
            from: new Date(date.setDate(date.getDate() - 90)),
            to: new Date(),
          })
        }
      >
        6 month
      </Button>
      <Button
        onClick={() =>
          setRange({
            from: new Date(date.setDate(date.getDate() - 365)),
            to: new Date(),
          })
        }
      >
        1 year
      </Button>
      <DateRangePicker
        value={range}
        onValueChange={(e) => setRange(e)}
        className="max-w-sm mx-auto"
        enableSelect={false}
      />
      <Title>Newsletter revenue over time (USD)</Title>

      <AreaChart
        className="h-72 mt-4"
        data={filteredData}
        index="date"
        categories={["Youtube", "Instagram"]}
        //categories={["SemiAnalysis", "The Pragmatic Engineer"]}
        colors={["indigo", "cyan"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}
