import React from "react";
import { Row, Col } from "react-bootstrap";
import RepertoireModel from "../../../../../03-back-end/src/components/repertoire/model";
import useFetchRepertoires from "../../../hooks/useFetchRepertoires";
import CustomAlert from "../../Alert/CustomAlert";
import { withAuth } from "../../Hocs/withAuth";
import BaseLink from "../BaseLink";

interface IRepertoireSearchPageProps {
  title: string;
  item: typeof BaseLink;
  relativePath: string;
}

function RepertoireSearchPage({
  title,
  relativePath,
  item: Item,
}: IRepertoireSearchPageProps) {
  const [data, , isLoading] = useFetchRepertoires();

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString("sr-RS", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <CustomAlert
          message="Loading"
          setIsAlertShown={() => true}
          variant="primary"
          isDismissible={false}
          isVisible={isLoading}
        />
      );
    } else {
      return data.map((x: RepertoireModel) => {
        console.log(x);
        return (
          <Item
            key={x?.repertoireId}
            title={`${formatDate(x?.date)}`}
            path={`${relativePath}/${x?.repertoireId}`}
            styleClass="btn-outline-secondary"
          />
        );
      });
    }
  };

  return (
    <Row className="align-items-center h-100">
      <Col>
        <Row>
          <Col className="text-center">
            <p className="m-0 display-5">{title}</p>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="gy-4 mt-5 justify-content-start">
          {renderBody()}
        </Row>
      </Col>
    </Row>
  );
}

export default withAuth(RepertoireSearchPage);
