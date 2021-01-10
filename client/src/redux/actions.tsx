export function login() {
    return {
      type: "LOGIN",
      value: true
    }
}

export function logout() {
    return {
      type: "LOGOUT",
      value: false
    }
}

export function selectLayout(layoutWidthValue: string, layoutHeightValue: string) {
    return {
      type: "SELECT_LAYOUT",
      width: layoutWidthValue,
      height: layoutHeightValue
    }
}

export function selectTheme(themeValue: string) {
    return {
      type: "SELECT_THEME",
      value: themeValue
    }
}

export function selectInterval(intervalValue: string) {
    return {
      type: "SELECT_INTERVAL",
      value: intervalValue
    }
}

export function addIndicator(indicatorValue: any) {
    return {
      type: "ADD_INDICATOR",
      value: indicatorValue
    }
}

export function addChart(exchange: string, coinpair: string) {
  return {
    type: "ADD_CHART",
    value: exchange,
    value2: coinpair
  }
}

export function deleteChart(marketnameValue: string) {
  return {
    type: "DELETE_CHART",
    value: marketnameValue
  }
}

export function deleteIndicator(indicatorValue: any) {
  return {
    type: "DELETE_INDICATOR",
    value: indicatorValue
  }
}
