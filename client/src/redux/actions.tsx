export function login(id: string, pass: string) {
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

export function selectExchange(exchangeValue: string) {
    return {
      type: "SELECT_EXCHANGE",
      value: exchangeValue
    }
}

export function add(exchangeValue: string) {
  return {
    type: "SELECT_EXCHANGE",
    value: exchangeValue
  }
}

export function changeEditing() {
    return {
      type: "CHANGE_EDITING"
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

export function selectInterval(intervalValue: number) {
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