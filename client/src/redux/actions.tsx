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

export function selectLayout(layoutValue: string) {
    return {
      type: "SELECT_LAYOUT",
      value: layoutValue
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

export function selectIndicator(indicatorValue: string[]) {
    return {
      type: "SELECT_INDICATOR",
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

export function deleteChart(marketname: string) {
  return {
    type: "DELETE_CHART",
    value: marketname
  }
}