"use client";

import React, { useState } from "react";
import {
  DatePicker,
  Space,
  Breadcrumb,
  Layout,
  Table,
  TableColumnsType,
} from "antd";

import { useRedirecting } from "../lib/useRedirecting";

interface DataType {
  key: React.Key;
  date: string;
  fio: string;
  calls: number;
  missed: number;
  duration: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "ФИО",
    dataIndex: "fio",
  },
  {
    title: "Дата отчета",
    dataIndex: "date",
    sorter: (a, b) => +new Date(b.date) - +new Date(a.date),
  },
  {
    title: "Количество звонков",
    dataIndex: "calls",
    sorter: (a, b) => a.calls - b.calls,
  },
  {
    title: "Количество пропущенных",
    dataIndex: "missed",
    sorter: (a, b) => a.missed - b.missed,
  },
  {
    title: "Средняя продолжительность звонков",
    dataIndex: "duration",
    sorter: (a, b) => a.duration - b.duration,
  },
];

const data = [
  {
    key: "1",
    fio: "Кирилов А.К.",
    date: "2024.10.15",
    calls: 402,
    missed: 34,
    duration: 103,
  },
  {
    key: "2",
    fio: "Жиглов П.К",
    date: "2024.10.15",
    calls: 93,
    missed: 29,
    duration: 83,
  },
  {
    key: "3",
    fio: "Настюк А.С",
    date: "2024.12.04",
    calls: 108,
    missed: 13,
    duration: 93,
  },
  {
    key: "4",
    fio: "Костюк П.М",
    date: "2025.01.01",
    calls: 132,
    missed: 20,
    duration: 120,
  },
  {
    key: "5",
    fio: "Борисова А.А",
    date: "2025.01.10",
    calls: 172,
    missed: 30,
    duration: 92,
  },
  {
    key: "6",
    fio: "Крылец П.М",
    date: "2024.12.01",
    calls: 99,
    missed: 33,
    duration: 105,
  },
  {
    key: "7",
    fio: "Панька В.С",
    date: "2025.01.10",
    calls: 172,
    missed: 30,
    duration: 92,
  },
  {
    key: "8",
    fio: "Сидоров М.Г",
    date: "2025.04.01",
    calls: 300,
    missed: 17,
    duration: 130,
  },
];

export default function TablePage() {
  const [tableData, setTableData] = useState(data);
  const updateDateRange = (dates, dateStrings: [string, string]) => {
    const [startDate, endDate] = dateStrings;

    setTableData((tableData) => {
      return tableData.filter((client) => {
        return (
          new Date(startDate) < new Date(client.date) &&
          new Date(endDate) > new Date(client.date)
        );
      });
    });
  };

  useRedirecting();

  return (
    <Layout
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Layout.Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
      </Layout.Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px", height: "100%" }}>
          <Breadcrumb
            items={[{ title: "Таблица звонков" }]}
            style={{ margin: "16px 0" }}
          />
          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
            }}
          >
            <div>
              <Space style={{ paddingBottom: "24px" }}>
                <DatePicker.RangePicker onChange={updateDateRange} />
              </Space>
              <Table<DataType>
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: "sorter-icon" }}
              />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
