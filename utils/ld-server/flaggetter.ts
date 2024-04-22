
const serverflag =  async (ldclient: any, key: string, defaultvalue: any, context: any) => {
 const flag = await ldclient.variation(key, context, defaultvalue)
 return flag
}

export default serverflag