import React from "react";
import IBaseLinkProps from "./IBaseLinkProps";

export default class BaseLink<
  Properties extends IBaseLinkProps
> extends React.Component<Properties> {}
