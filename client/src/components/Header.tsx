import React from "react";
import "../App.css";
import Tabs from "./Tabs";
import Alerts from "./Alerts";
import Axios from "axios";
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal } from "reactstrap";
import TradingViewWidget from "react-tradingview-widget";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddBox from "@material-ui/icons/AddBox";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import { indicator_list } from "../info_list"
import Login from "./Login"
import * as actions from "../redux/actions"
import "../chart.css";
class Header extends React.Component<HeaderProps> {
  state = {
    modalopened: false
  }

  render() {
    return(
    <div>
      {this.renderLogoandLoginBtn()}
      <div className="nav_outerdiv">
          <div className='nav_radioBtn'>
              {this.renderRadioBtn()}
          </div>
          <div className = "nav_list">
              <div className='nav_marketlist'>
              {this.renderMarketList()}
              </div>
              <div style={{width: "inherit", height: "20px", borderBottom: "1px solid #BDBDBD"}}/>
              <div className='nav_indicatorlist'>
              {this.renderDropdown()}
              {this.renderIndicatorList()}
              </div>
          </div>
      </div>
    </div>
    )
  }

  renderLogoandLoginBtn() {
    return (
    <div style={{display: "flex", height: "180px", marginBottom: "40px", alignItems: "center", backgroundColor: "#fbfbfb8c", boxShadow: "6px 1px 3px 0px #dedede"}}>
      <div className="donation" style={{marginLeft: "100px"}}>
      <text style={{fontFamily:"NanumSquare-extrabold", fontSize:"12pt"}}>- 후원 -</text>
        <div>
          <img src={require("../res/btc.png")} width="18px" style={{marginRight: "10px"}}/>
          <text style={{fontFamily:"NanumSquare", fontSize:"11pt"}}>비트코인: 3Duwi ...</text>
          <i className="ni ni-ungroup copyicon" onClick={()=>{
            navigator.clipboard.writeText("3DuwiqqZXW9d7fyU7A7nLecEmxdkvjFp3C")}}
          />
        </div>
        <div>
          <img src={require("../res/eth.png")} width="18px" style={{marginRight: "10px"}}/>
          <text style={{fontFamily:"NanumSquare", fontSize:"11pt"}}>이더리움: 0x2dc ...</text>
          <i className="ni ni-ungroup copyicon" onClick={()=>{
            navigator.clipboard.writeText("0x2dc4cbed916b37b72539e80ac628befe9eb6ebdc")}}
          />
        </div>
        <div>
          <img src={require("../res/ltc.png")} width="18px" style={{marginRight: "10px"}}/>
          <text style={{fontFamily:"NanumSquare", fontSize:"11pt"}}>라이트코인: 33sHo ...</text>
          <i className="ni ni-ungroup copyicon" onClick={()=>{
            navigator.clipboard.writeText("33sHoDqECGck5xmHDf8toeDGrQgJ5rPWPn")}}
          />
        </div>

        <div>
          <img src={require("../res/ada.png")} width="18px" style={{marginRight: "10px"}}/>
          <text style={{fontFamily:"NanumSquare", fontSize:"11pt"}}>에이다: DdzFF ...</text>
          <i className="ni ni-ungroup copyicon" onClick={()=>{
            navigator.clipboard.writeText("DdzFFzCqrhspsqdEpxzpc6GVDY9VojbTx3devHPKg8HaPPS6wu84htN3chd6Atop6AHTN7v7dpogYZN5AsqSMG28FDD46EL7LjmR8RRy")}}
          />
        </div>
      </div>
      <div style={{display: "inline-block", margin:"0px auto 0px auto"}}>
        <img src={require("../res/logo.svg")} width="60px" style={{verticalAlign: "bottom", paddingBottom: "10px"}}/>
        <text style={{color:"black", fontFamily: "NanumSquare-Bold", fontSize:"42pt", marginLeft: "10px"}}>전문.가</text>
      </div>
      {this.renderLoginmodal()}
        <Button 
          className="btn-icon btn-3" 
          color="secondary" 
          type="button" 
          style={{display: "inline-block", margin: "0px 100px 0px 0px", width: "120px", height: "50px"}}
          onClick={() => this.setState({modalopened: !this.state.modalopened})}
        >
          <span className="btn-inner--icon">
            <i className="ni ni-single-02" />
          </span>
          <span className="btn-inner--text">로그인</span>
        </Button>
      </div>
      )
  }

renderLoginmodal() {
  return (
    <>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.modalopened}
              toggle={() => this.setState({modalopened: !this.state.modalopened})}
            >
              <div className="modal-header">
                <h6 className="modal-title nanumbold" id="modal-title-default">
                  로그인
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.setState({modalopened: !this.state.modalopened})}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>

              <div className="text-muted text-center mb-3">
                        {/* <small>Sign in with</small> */}
                        <p className="nanum"><br/><br/>차트 설정을 저장할 수 있는 로그인 서비스를 준비 중입니다.<br/></p>
                      </div>
                      {/* <div className="btn-wrapper text-center">
                        <Button
                          className="btn-neutral btn-icon"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("../assets/img/icons/common/github.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">Github</span>
                        </Button>
                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("../assets/img/icons/common/google.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div> */}


              
              <div className="modal-footer">
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.setState({modalopened: !this.state.modalopened})}
                >
                  Close
                </Button>
              </div>
            </Modal>
            </>
  )
}

  renderRadioBtn() {
    return (
      <>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="layout23"
            name="layout"
            type="radio"
            onClick={() => {
              this.props.selectLayout("3", "2")
            }}
          />
          <label className="custom-control-label" htmlFor="layout23">
            2 X 3
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            defaultChecked
            id="layout22"
            name="layout"
            type="radio"
            onClick={() => {
              this.props.selectLayout("2", "2")
            }}
          />
          <label className="custom-control-label" htmlFor="layout22">
            2 X 2
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            className="custom-control-input"
            id="layout12"
            name="layout"
            type="radio"
            onClick={() => {
              this.props.selectLayout("2", "1")
            }}
          />
          <label className="custom-control-label" htmlFor="layout12">
            1 X 2
          </label>
        </div>
      </>
    )
  }
  renderMarketList() {
    return this.props.chartlist.map((marketname) => {
      return (
        <Button
          key={marketname}
          className="btn-icon btn-3" 
          size="sm" 
          color="secondary" 
          type="button" 
          onClick={()=> {
            this.props.deleteChart(marketname)
          }}
        >
          <span className="btn-inner--icon">
            <i className="fa fa-times" />
          </span>
          <span className="btn-inner--text">{marketname}</span>
        </Button>
      )
    })
  }

    renderDropdown() {
    return (
        <div className="dropdown">
        <UncontrolledDropdown size="md" group>
            <DropdownToggle caret color="primary">
            지표 추가
            </DropdownToggle>
            <DropdownMenu style={{maxHeight: "500px", overflowY: "scroll"}}>
            {indicator_list.map((indicator) => {
                return (
                    <DropdownItem
                        key={indicator.name}
                        style={{ outline: "none" }}
                        onClick={(e) => this.props.addIndicator(indicator)}
                        >
                        {indicator.name}
                    </DropdownItem>
                )
            })}
            </DropdownMenu>
        </UncontrolledDropdown>
        </div>
    )
    }

    renderIndicatorList() {
        return this.props.indicatorlist.map((indicator) => {
            return (
              <Button
                key={indicator.name}
                className="btn-icon btn-3" 
                size="sm" 
                color="secondary" 
                type="button" 
                onClick={()=> {
                  this.props.deleteIndicator(indicator)
                }}
              >
                <span className="btn-inner--icon">
                  <i className="fa fa-times" />
                </span>
                <span className="btn-inner--text">{indicator.name}</span>
              </Button>
            )
          })
    }



}

const mapStateToProps = (state) => ({
    auth: state.login.auth,
    chartlist: state.charts.chartlist,
    layout: state.charts.layout,
    theme: state.charts.theme,
    interval: state.charts.interval,
    indicatorlist: state.charts.indicatorlist
})

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(actions.login()),
    logout: () => dispatch(actions.logout()),
    selectLayout: (layoutWidth, layoutHeight) => dispatch(actions.selectLayout(layoutWidth, layoutHeight)),
    selectTheme: (theme) => dispatch(actions.selectTheme(theme)),
    selectInterval: (interval) => dispatch(actions.selectInterval(interval)),
    addIndicator: (indicator) => dispatch(actions.addIndicator(indicator)),
    deleteChart: (chart) => dispatch(actions.deleteChart(chart)),
    deleteIndicator: (indicator) => dispatch(actions.deleteIndicator(indicator))
})

type HeaderProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)