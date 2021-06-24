import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import RepertoireModel from "../../../../../03-back-end/src/components/repertoire/model";
import RepertoireService from "../../../services/RepertoireService";
import BaseLink from "../BaseLink";

interface IRepertoireSearchPageProps {
  title: string;
  item: typeof BaseLink;
  relativePath: string;
}

export default function RepertoireSearchPage({
  title,
  relativePath,
  item: Item,
}: IRepertoireSearchPageProps) {
  const [data, setData] = useState<RepertoireModel[]>([]);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await RepertoireService.getAll();

        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString("sr-RS", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col className="text-center">
            <p className="m-0 display-5">{title}</p>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-start">
          {data.map((x: RepertoireModel) => {
            console.log(x);
            return (
              <Item
                key={x?.repertoireId}
                title={`${formatDate(x?.date)}`}
                path={`${relativePath}/${x?.repertoireId}`}
                styleClass="btn-outline-secondary"
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}
