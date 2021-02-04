const listApproval: JSONObject = {
  forte: {
    name: "head_one",
    position: "Unreal Head",
    level: "50",
  },
  head_one: {
    name: "manager_one",
    position: "Unreal Manager",
    level: "60",
  },
  manager_one: {
    name: "vice_one",
    position: "Unreal Vice",
    level: "70",
  },
}

export const getUserInformation: (...args: any) => JSONObject = (
  name: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name,
        company: "TEST",
        department: "Dummy Department",
        division: "Fake Division",
        position: "Unreal Staff",
        location: "Jakarta",
        level: "40",
      })
    }, 1000)
  })
}

export const getApproval: (...args: any) => JSONObject = (
  name: string,
  level: string
) => {
  return new Promise((resolve) => {
    const approver = listApproval[name]
    if (approver) {
      if (+approver.level >= +level) {
        resolve(approver)
      } else {
        resolve(getApproval(approver.name, level))
      }
    } else {
      resolve({})
    }
  })
}
