/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { UncontrolledAlert } from "reactstrap";
export interface Props {
  status: string
}

class Alerts extends React.Component<Props> {
  render() {
    return (
      this.props.status === "running"
      ? <div className="mt-4 mt-lg-6 col-lg-6" style={{alignContent: "center", display: "inline-block"}}>
        <UncontrolledAlert color="success" fade={true}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            Server: <strong>RUNNING</strong>
          </span>
        </UncontrolledAlert>
      </div>
      :
      <div className="mt-4 mt-lg-6 col-lg-6" style={{alignContent: "center", display: "inline-block"}}>
        <UncontrolledAlert color="danger" fade={false}>
          <span className="alert-inner--icon">
            <i className="ni ni-support-16" />
          </span>
          <span className="alert-inner--text ml-1">
            Server: <strong>STOPPED</strong>
          </span>
        </UncontrolledAlert>
      </div>
    );
  }
}

export default Alerts;
