export function login(id: string, pass: string) {
    return {
      type: "LOGIN"
    }
}

export function logout() {
    return {
      type: "LOGOUT"
    }
}

export function addChart(text) {
    return {
      type: "ADD_LIST"
    }
}
export function deleteChart(text) {
    return {
      type: "DELETE_LIST"
    }
}
export function changeListName(text) {
    return {
      type: "CHANGE_LISTNAME"
    }
}
export function addItem(text) {
    return {
      type: "ADD_ITEM"
    }
}
export function deleteItem(text) {
    return {
      type: "DELETE_ITEM"
    }
}